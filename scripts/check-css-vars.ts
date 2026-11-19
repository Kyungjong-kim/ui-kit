/**
 * CSS variable reference guard — blocks `var(--name)` references to names nobody declares.
 *
 * Why this exists:
 *   Components reference tokens as `[var(--color-text-danger)]`. A typo such as
 *   `[var(--color-text-dangr)]` is still valid CSS: the declaration just resolves to
 *   its initial value at runtime. Build, lint and tests all pass and the colour (or
 *   radius, or spacing) silently drops. `check:tokens` blocks raw values, but it has
 *   no way to tell a real token name from a misspelt one.
 *
 * The guard collects every custom property that is declared somewhere we own:
 *
 *   - token CSS under src/styles (`--color-text-primary: …`)
 *   - arbitrary-property declarations in class strings (`[--icon-tab-color:…]`)
 *   - style-object keys (`{ "--progress": … }`)
 *
 * and exits 1 on any `var(--…)` reference outside that set. Variables set at runtime by
 * dependencies (Radix `--radix-*`, Tailwind `--tw-*`) are allowed by prefix.
 *
 * Run with:  pnpm check:vars
 *
 * Known limit: only literal names are detected. A dynamically composed reference
 * (`var(--color-${tone})`) is invisible to this scan — prefer a lookup map with
 * literal values so the guard can see them.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SCAN_ROOTS = ["src", "showcase", "stories"];
const SCAN_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".css"]);
const SKIP_DIRS = new Set(["node_modules", "dist", "storybook-static", "generated"]);
/** Set at runtime by dependencies, never declared in our source. */
const EXTERNAL_PREFIXES = ["--radix-", "--tw-"];

const NAME = "--[A-Za-z0-9_-]*[A-Za-z0-9_]";
/** `--name:` in CSS, `[--name:` in class strings. */
const DECL_RE = new RegExp(`(?:^|[\\s{;[])(${NAME})\\s*:`, "gm");
/** `"--name":` / `'--name':` style-object keys. */
const STYLE_KEY_RE = new RegExp(`["'](${NAME})["']\\s*:`, "g");
const REF_RE = new RegExp(`var\\(\\s*(${NAME})`, "g");
/** Comments carry prose like `var(--token-*)`; they are not references. */
const COMMENT_RE = /\/\*[\s\S]*?\*\/|(?<![:"'`\w])\/\/.*$/gm;

interface Hit {
  file: string;
  line: number;
  name: string;
  text: string;
}

function collectFiles(dir: string, found: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      collectFiles(path, found);
    } else if (SCAN_EXT.has(extname(entry))) {
      found.push(path);
    }
  }
  return found;
}

/** Blank out comments but keep line breaks so reported line numbers stay right. */
function stripComments(source: string): string {
  return source.replace(COMMENT_RE, (comment) => comment.replace(/[^\n]/g, " "));
}

const files = SCAN_ROOTS.flatMap((root) => collectFiles(join(ROOT, root)));
const sources = files.map((file) => ({ file, text: stripComments(readFileSync(file, "utf8")) }));

const declared = new Set<string>();
for (const { text } of sources) {
  for (const match of text.matchAll(DECL_RE)) declared.add(match[1]);
  for (const match of text.matchAll(STYLE_KEY_RE)) declared.add(match[1]);
}

const unknown: Hit[] = [];
let referenceCount = 0;
for (const { file, text } of sources) {
  text.split("\n").forEach((line, index) => {
    for (const match of line.matchAll(REF_RE)) {
      referenceCount++;
      const name = match[1];
      if (declared.has(name) || EXTERNAL_PREFIXES.some((prefix) => name.startsWith(prefix))) {
        continue;
      }
      unknown.push({ file: relative(ROOT, file), line: index + 1, name, text: line.trim().slice(0, 120) });
    }
  });
}

if (unknown.length > 0) {
  console.error(`check-css-vars: references to undeclared CSS variables (${unknown.length})\n`);
  for (const hit of unknown) {
    console.error(`  ${hit.file}:${hit.line}  ${hit.name}`);
    console.error(`    ${hit.text}`);
  }
  console.error(
    "\n  The name is declared nowhere, so the property silently falls back at runtime.\n" +
      "  Fix the spelling against src/styles/tokens/semantic.json, or declare the variable.\n" +
      "  If a dependency sets it at runtime, add its prefix to EXTERNAL_PREFIXES in this script.",
  );
  process.exit(1);
}

console.log(
  `check-css-vars: ok — ${files.length} files, ${referenceCount} var() references, ${declared.size} declared names.`,
);
