/**
 * Token discipline guard — raw colors are blocked, core-palette refs are reported.
 *
 * The rule (README § 디자인 토큰): components reference semantic tokens as
 * `[var(--color-bg-brand-default)]`. Raw hex and core palette steps
 * (`--color-brand-500`) are not the component's to choose — they are the token
 * layer's, and hardcoding them means a theme change silently skips that element.
 *
 * Two severities, deliberately:
 *
 *   BLOCKING  raw hex / rgb() / rgba()
 *             The tree currently has zero of these outside generated and test files.
 *             A gate at zero stays at zero; it never has to be negotiated later.
 *
 *   REPORTED  core palette refs — `var(--color-brand-400)` and friends
 *             18 exist today, all in colour-scale contexts (comparison-bar,
 *             cluster-resource-bar, thumbnail) where a series needs a specific ramp
 *             step and no semantic token expresses "series colour 3". Blocking these
 *             would demand inventing tokens under time pressure, so they are surfaced
 *             and left to a deliberate decision. Flip to blocking by adding
 *             --strict-palette once semantic series tokens exist.
 *
 * Run with:  pnpm check:tokens
 *
 * Excluded: src/components/primitives/icon/generated (SVGR output carries a `#1A1A1A`
 * fallback), *.test.tsx (fixtures assert on literal colours), and src/styles (the token
 * layer itself is where real values belong).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SCAN_DIR = join(ROOT, "src");
const SCAN_EXT = new Set([".ts", ".tsx"]);
const SKIP_DIRS = new Set(["node_modules", "generated", "styles"]);
const SKIP_FILE = /\.test\.tsx?$/;

/** #RGB · #RGBA · #RRGGBB · #RRGGBBAA, and rgb()/rgba() function calls. */
const RAW_COLOR_RE = /#[0-9a-fA-F]{3,8}\b|\brgba?\s*\(/g;
/** Core palette steps — the raw ramp, not a semantic role. */
const CORE_PALETTE_RE = /var\(\s*--color-(?:brand|neutral|red|green|blue|orange|yellow)-\d+/g;

interface Hit {
  file: string;
  line: number;
  text: string;
  match: string;
}

function collectFiles(dir: string, found: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      collectFiles(path, found);
    } else if (SCAN_EXT.has(entry.slice(entry.lastIndexOf("."))) && !SKIP_FILE.test(entry)) {
      found.push(path);
    }
  }
  return found;
}

function scan(files: string[], pattern: RegExp): Hit[] {
  const hits: Hit[] = [];
  for (const file of files) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((text, index) => {
      for (const match of text.matchAll(pattern)) {
        hits.push({
          file: relative(ROOT, file),
          line: index + 1,
          text: text.trim().slice(0, 120),
          match: match[0],
        });
      }
    });
  }
  return hits;
}

function report(title: string, hits: Hit[]): void {
  console.error(`${title} (${hits.length})\n`);
  for (const hit of hits) {
    console.error(`  ${hit.file}:${hit.line}  ${hit.match}`);
    console.error(`    ${hit.text}`);
  }
  console.error("");
}

const files = collectFiles(SCAN_DIR);
const rawColors = scan(files, RAW_COLOR_RE);
const corePalette = scan(files, CORE_PALETTE_RE);
const strictPalette = process.argv.includes("--strict-palette");

if (corePalette.length > 0) {
  report("check-tokens: core palette references", corePalette);
  console.error(
    strictPalette
      ? "  Blocked by --strict-palette. Replace with a semantic token.\n"
      : "  Reported, not blocked — see the script header for why. Prefer a semantic token.\n",
  );
}

if (rawColors.length > 0) {
  report("check-tokens: raw color literals (blocking)", rawColors);
  console.error(
    "  Components must reference semantic tokens: [var(--color-bg-brand-default)].\n" +
      "  If this is generated or fixture code, add it to SKIP_DIRS / SKIP_FILE in this script.",
  );
}

if (rawColors.length > 0 || (strictPalette && corePalette.length > 0)) {
  process.exit(1);
}

console.log(
  `check-tokens: ok — ${files.length} files, 0 raw color literals` +
    (corePalette.length > 0 ? `, ${corePalette.length} core palette ref(s) reported.` : "."),
);
