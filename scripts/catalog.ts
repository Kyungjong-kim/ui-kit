/**
 * Component catalog — generator and drift guard.
 *
 * Why this exists:
 *   README states "총 106개(primitives 38 · composed 60 · templates 8)" and lists every
 *   component by name. Both are hand-maintained, so both drift the moment a component is
 *   added or renamed — silently, because nothing reads them. A stale inventory in the
 *   README of a published package misleads consumers.
 *
 * The catalog is derived from the source of truth: one directory per component under
 * src/components/{primitives,composed} and src/templates, each with an index.ts whose
 * value exports are the component's public surface.
 *
 * Run with:
 *   pnpm catalog          write docs/design-system/ds-catalog.json
 *   pnpm check:catalog    verify the committed catalog and the README against source
 *
 * The checker fails when (a) the committed catalog no longer matches source — someone
 * changed a component without regenerating — or (b) the README counts disagree with the
 * catalog, or (c) the README names a component that no longer exists.
 *
 * Output is deterministic: sorted, no timestamps. A regenerated file is byte-identical
 * unless the source actually changed, which is what makes the drift check meaningful.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CATALOG_PATH = join(ROOT, "docs/design-system/ds-catalog.json");
const README_PATH = join(ROOT, "README.md");

const LAYERS = [
  { layer: "primitives", dir: "src/components/primitives" },
  { layer: "composed", dir: "src/components/composed" },
  { layer: "templates", dir: "src/templates" },
] as const;

type Layer = (typeof LAYERS)[number]["layer"];

interface CatalogEntry {
  name: string;
  layer: Layer;
  exports: string[];
  hasTest: boolean;
}

interface Catalog {
  $generated: string;
  counts: Record<Layer | "total", number>;
  components: CatalogEntry[];
}

/**
 * Value exports from an index.ts. Handles both single-line and multi-line export blocks,
 * and skips `export type { … }` — types are not components.
 */
function parseValueExports(source: string): string[] {
  const withoutTypeExports = source.replace(/export\s+type\s*\{[^}]*\}[^;]*;?/g, "");
  const names = new Set<string>();

  for (const block of withoutTypeExports.matchAll(/export\s*\{([^}]*)\}/g)) {
    for (const raw of block[1].split(",")) {
      // `Foo as Bar` re-exports expose Bar; `type Foo` inside a value block is a type.
      const cleaned = raw.trim().replace(/\s+as\s+/, " ");
      const name = cleaned.split(/\s+/).pop() ?? "";
      if (name && !cleaned.startsWith("type ")) names.add(name);
    }
  }

  return [...names].sort();
}

function buildCatalog(): Catalog {
  const components: CatalogEntry[] = [];
  const counts = { primitives: 0, composed: 0, templates: 0, total: 0 } as Catalog["counts"];

  for (const { layer, dir } of LAYERS) {
    const abs = join(ROOT, dir);
    const entries = readdirSync(abs, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();

    for (const name of entries) {
      const indexPath = join(abs, name, "index.ts");
      if (!existsSync(indexPath)) {
        throw new Error(
          `catalog: ${relative(ROOT, join(abs, name))} has no index.ts — every component ` +
            "directory must expose one, or the catalog cannot describe its public surface.",
        );
      }
      components.push({
        name,
        layer,
        exports: parseValueExports(readFileSync(indexPath, "utf8")),
        hasTest: existsSync(join(abs, name, `${name}.test.tsx`)),
      });
      counts[layer] += 1;
      counts.total += 1;
    }
  }

  return {
    $generated: "scripts/catalog.ts — run `pnpm catalog` to regenerate. Do not edit by hand.",
    counts,
    components,
  };
}

function serialize(catalog: Catalog): string {
  return `${JSON.stringify(catalog, null, 2)}\n`;
}

/** README repeats the counts in prose; both occurrences must agree with the catalog. */
function checkReadmeCounts(catalog: Catalog, readme: string): string[] {
  const { primitives, composed, templates, total } = catalog.counts;
  const problems: string[] = [];
  // Tolerates the two shapes the README uses: "106개 컴포넌트(…)" and "**106개**(…)".
  const claims = [
    ...readme.matchAll(
      /(\d+)개\**\s*(?:컴포넌트)?\s*\(primitives\s*(\d+)\s*·\s*composed\s*(\d+)\s*·\s*templates\s*(\d+)\)/g,
    ),
  ];

  if (claims.length === 0) {
    problems.push(
      "README has no '<N>개(primitives N · composed N · templates N)' claim — the counts " +
        "moved or changed shape, so this guard no longer verifies anything. Update the pattern.",
    );
    return problems;
  }

  for (const [text, claimTotal, claimPrim, claimComp, claimTpl] of claims) {
    const actual = `${total}개(primitives ${primitives} · composed ${composed} · templates ${templates})`;
    if (
      Number(claimTotal) !== total ||
      Number(claimPrim) !== primitives ||
      Number(claimComp) !== composed ||
      Number(claimTpl) !== templates
    ) {
      problems.push(`README count is stale: "${text}" → should be "${actual}"`);
    }
  }

  return problems;
}

/** Every component name the README lists must still be exported by some component. */
function checkReadmeNames(catalog: Catalog, readme: string): string[] {
  const section = readme.split(/^## 컴포넌트$/m)[1]?.split(/^## /m)[0];
  if (!section) {
    return [
      "README has no '## 컴포넌트' section — the component table moved, so its names are " +
        "no longer verified. Update this guard.",
    ];
  }

  const known = new Set(catalog.components.flatMap((component) => component.exports));
  const ghosts = new Set<string>();

  for (const match of section.matchAll(/`([A-Z][A-Za-z0-9]*)`/g)) {
    if (!known.has(match[1])) ghosts.add(match[1]);
  }

  return [...ghosts]
    .sort()
    .map((name) => `README lists \`${name}\`, but no component exports that name.`);
}

const catalog = buildCatalog();
const serialized = serialize(catalog);
const write = process.argv.includes("--write");

if (write) {
  writeFileSync(CATALOG_PATH, serialized);
  const { primitives, composed, templates, total } = catalog.counts;
  console.log(
    `catalog: wrote ${relative(ROOT, CATALOG_PATH)} — ${total} components ` +
      `(primitives ${primitives} · composed ${composed} · templates ${templates}).`,
  );
  process.exit(0);
}

const problems: string[] = [];

if (!existsSync(CATALOG_PATH)) {
  problems.push(`${relative(ROOT, CATALOG_PATH)} is missing — run \`pnpm catalog\`.`);
} else if (readFileSync(CATALOG_PATH, "utf8") !== serialized) {
  problems.push(
    `${relative(ROOT, CATALOG_PATH)} is out of date — a component was added, removed, or ` +
      "its exports changed without regenerating. Run `pnpm catalog`.",
  );
}

const readme = readFileSync(README_PATH, "utf8");
problems.push(...checkReadmeCounts(catalog, readme), ...checkReadmeNames(catalog, readme));

if (problems.length > 0) {
  console.error(`check:catalog: ${problems.length} problem(s).\n`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log(`check:catalog: ok — ${catalog.counts.total} components, README in sync.`);
