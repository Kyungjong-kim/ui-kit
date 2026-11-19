/**
 * Typography utility guard — blocks silently-dead `typography-*` classes.
 *
 * Why this exists:
 *   Tailwind v4 ignores undefined utilities without raising an error. A class like
 *   `typography-label-xs-medium` (which does not exist — `label-xs` has no weight
 *   suffix) passes the build, passes lint, and silently applies no font styles.
 *   Nothing fails; the text is just wrong.
 *
 * The guard treats the `@utility typography-*` declarations in src/styles/theme.css
 * as the source of truth, scans source files for `typography-*` class usage, and
 * exits 1 on any name that has no matching declaration.
 *
 * Run with:  pnpm check:typography
 *
 * Known limit: only literal class names are detected. A dynamically composed name
 * (`typography-${size}`) is invisible to this scan — prefer a lookup map with
 * literal values so the guard can see them.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const THEME_CSS = join(ROOT, "src/styles/theme.css");
const SCAN_ROOTS = ["src", "showcase", "stories"];
const SCAN_EXT = new Set([".ts", ".tsx", ".js", ".jsx"]);
/** Token CSS declares `--token-typography-*` variables, not utility classes. */
const SKIP_DIRS = new Set(["node_modules", "dist", "storybook-static", "styles"]);

const UTILITY_RE = /@utility\s+(typography-[a-z0-9-]+)/g;
const USAGE_RE = /\btypography-[a-z0-9-]+/g;

function collectDefined(): Set<string> {
  const css = readFileSync(THEME_CSS, "utf8");
  const defined = new Set<string>();
  for (const match of css.matchAll(UTILITY_RE)) {
    defined.add(match[1]);
  }
  return defined;
}

function collectSourceFiles(dir: string, found: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      collectSourceFiles(path, found);
    } else if (SCAN_EXT.has(extname(entry))) {
      found.push(path);
    }
  }
  return found;
}

interface Violation {
  file: string;
  line: number;
  name: string;
}

function collectViolations(defined: Set<string>): Violation[] {
  const violations: Violation[] = [];

  for (const root of SCAN_ROOTS) {
    const abs = join(ROOT, root);
    let files: string[];
    try {
      files = collectSourceFiles(abs);
    } catch {
      continue; // optional directory (e.g. stories) may be absent
    }

    for (const file of files) {
      const lines = readFileSync(file, "utf8").split("\n");
      lines.forEach((text, index) => {
        for (const match of text.matchAll(USAGE_RE)) {
          const name = match[0];
          if (!defined.has(name)) {
            violations.push({ file: relative(ROOT, file), line: index + 1, name });
          }
        }
      });
    }
  }

  return violations;
}

const defined = collectDefined();

if (defined.size === 0) {
  console.error(
    `check-typography: no '@utility typography-*' declarations found in ${relative(ROOT, THEME_CSS)}.\n` +
      "The source of truth moved or the file is malformed — fix THEME_CSS in this script.",
  );
  process.exit(1);
}

const violations = collectViolations(defined);

if (violations.length > 0) {
  console.error(`check-typography: ${violations.length} undefined typography utility usage(s).\n`);
  for (const { file, line, name } of violations) {
    console.error(`  ${file}:${line}  ${name}`);
  }
  console.error(`\nDefined utilities (${defined.size}):`);
  for (const name of [...defined].sort()) {
    console.error(`  ${name}`);
  }
  console.error(
    "\nTailwind v4 drops these silently — the build succeeds and the font never applies.",
  );
  process.exit(1);
}

console.log(`check-typography: ok — ${defined.size} utilities defined, no undefined usage.`);
