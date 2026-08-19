/**
 * Documentation drift report — non-blocking.
 *
 * The catalog guard (scripts/catalog.ts) keeps the README inventory honest, but the
 * canonical docs under docs/design-system are prose: what they claim cannot be derived
 * from source, so it cannot be regenerated. What *can* be checked mechanically is
 * whether they still point at things that exist, and whether new components arrived
 * without any documentation at all.
 *
 * This report never fails the build. Every finding here needs a human decision — a
 * component may be deliberately undocumented, a doc may cover several components — and
 * a gate that fires on judgement calls gets muted rather than obeyed. The blocking
 * gates are check:typography, check:tokens, and check:catalog.
 *
 * Run with:  pnpm check:docs
 *
 * Reports:
 *   1. broken links   — relative links in docs/design-system that resolve to nothing
 *   2. orphan specs   — spec files no index README links to
 *   3. story coverage — catalog components without a Storybook story
 */
import { execSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_DIR = join(ROOT, "docs/design-system");
const STORIES_DIR = join(ROOT, "stories");
const CATALOG_PATH = join(DOCS_DIR, "ds-catalog.json");

interface CatalogEntry {
  name: string;
  layer: string;
  exports: string[];
}

function collectMarkdown(dir: string, found: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      collectMarkdown(path, found);
    } else if (entry.endsWith(".md")) {
      found.push(path);
    }
  }
  return found;
}

/** Relative markdown links, ignoring URLs and pure anchors. */
function linksIn(file: string): { target: string; line: number }[] {
  const links: { target: string; line: number }[] = [];
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((text, index) => {
      for (const match of text.matchAll(/\]\(([^)]+)\)/g)) {
        const target = match[1].split("#")[0].trim();
        if (!target || /^(https?:|mailto:)/.test(target)) continue;
        links.push({ target, line: index + 1 });
      }
    });
  return links;
}

const docs = collectMarkdown(DOCS_DIR);

// 1. Broken relative links.
const brokenLinks: string[] = [];
for (const file of docs) {
  for (const { target, line } of linksIn(file)) {
    if (!existsSync(resolve(dirname(file), target))) {
      brokenLinks.push(`${relative(ROOT, file)}:${line}  →  ${target}`);
    }
  }
}

// 2. Spec files nothing links to. Index READMEs are entry points, not targets.
const linked = new Set<string>();
for (const file of docs) {
  for (const { target } of linksIn(file)) {
    linked.add(resolve(dirname(file), target));
  }
}
const orphanSpecs = docs
  .filter((file) => !file.endsWith("README.md") && !linked.has(file))
  .map((file) => relative(ROOT, file));

// 3. Components without a story.
let storyCoverage: string[] = [];
if (existsSync(CATALOG_PATH) && existsSync(STORIES_DIR)) {
  const catalog = JSON.parse(readFileSync(CATALOG_PATH, "utf8")) as { components: CatalogEntry[] };
  const stories = readdirSync(STORIES_DIR)
    .filter((entry) => entry.endsWith(".stories.tsx"))
    .map((entry) => entry.replace(/\.stories\.tsx$/, ""));
  // `chart` ships as chart-area, chart-pie, … — a prefix match keeps that a hit.
  storyCoverage = catalog.components
    .filter(({ name }) => !stories.some((story) => story === name || story.startsWith(`${name}-`)))
    .map(({ name, layer }) => `${layer}/${name}`);
}

// 4. Components touched on this branch whose docs were not.
let sourceDrift: string[] = [];
try {
  const base = process.env.DS_DOCS_BASE ?? "origin/develop";
  const changed = execSync(`git diff --name-only ${base}...HEAD`, { cwd: ROOT, encoding: "utf8" })
    .split("\n")
    .filter(Boolean);
  const touchedComponents = new Set(
    changed
      .map(
        (path) =>
          path.match(/^src\/(?:components\/(?:primitives|composed)|templates)\/([^/]+)\//)?.[1],
      )
      .filter((name): name is string => Boolean(name)),
  );
  const docsTouched = changed.some((path) => path.startsWith("docs/design-system/"));
  if (touchedComponents.size > 0 && !docsTouched) {
    sourceDrift = [...touchedComponents].sort();
  }
} catch {
  // No git history available (shallow clone, detached state) — skip this section.
}

function section(title: string, items: string[], hint: string): void {
  if (items.length === 0) {
    console.log(`✓ ${title} — none`);
    return;
  }
  console.log(`\n▸ ${title} (${items.length})`);
  for (const item of items) console.log(`    ${item}`);
  console.log(`  ${hint}`);
}

console.log("check-docs (report only — never fails the build)\n");
section(
  "broken links",
  brokenLinks,
  "The target moved or was renamed. Fix the link or restore the file.",
);
section(
  "orphan specs",
  orphanSpecs,
  "Written but unreachable — add it to the nearest index README.",
);
section(
  "components without a story",
  storyCoverage,
  "Storybook is the published reference; undocumented components are invisible to consumers.",
);
section(
  "components changed without touching docs",
  sourceDrift,
  "If behaviour or props changed, the spec under docs/design-system is now stale.",
);
