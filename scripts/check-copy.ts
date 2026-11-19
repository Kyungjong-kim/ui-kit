/**
 * Component copy guard — blocks UI text hardcoded in component source.
 *
 * Why this exists:
 *   Default labels ("닫기", "No results found.") used to live inside each component, in
 *   two languages, with no way for an app to switch them. They now come from the locale
 *   dictionary (src/locale/messages.ts) through `useUiKitMessages()`. A new literal
 *   reintroduces the problem silently: it renders fine and every test still passes.
 *
 * The guard scans src/components and src/templates for Hangul outside comments — in string literals and in
 * JSX text — and exits 1 on any hit. English copy cannot be told apart from identifiers
 * and keys by a scan, so English literals stay a review item.
 *
 * Run with:  pnpm check:copy
 *
 * Deliberate exception: put `copy-exempt: <reason>` in a comment on the same line.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SCAN_DIRS = [join(ROOT, "src/components"), join(ROOT, "src/templates")];
const SKIP_DIRS = new Set(["generated"]);
const HANGUL_RE = /[가-힣]/;
const LINE_COMMENT_RE = /(?<![:"'`\w])\/\/.*$/;

function collectFiles(dir: string, found: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      collectFiles(path, found);
    } else if (/\.tsx?$/.test(entry) && !/\.test\.tsx?$/.test(entry)) {
      found.push(path);
    }
  }
  return found;
}

/** Blank block comments (JSDoc, `{/* … *\/}`) but keep line breaks for line numbers. */
function stripBlockComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, " "));
}

const hits: Array<{ file: string; line: number; text: string }> = [];
const files = SCAN_DIRS.flatMap((dir) => collectFiles(dir));
for (const file of files) {
  const raw = readFileSync(file, "utf8").split("\n");
  stripBlockComments(raw.join("\n"))
    .split("\n")
    .forEach((line, index) => {
      if (raw[index].includes("copy-exempt")) return;
      if (HANGUL_RE.test(line.replace(LINE_COMMENT_RE, ""))) {
        hits.push({ file: relative(ROOT, file), line: index + 1, text: raw[index].trim() });
      }
    });
}

if (hits.length > 0) {
  console.error(`check-copy: UI text hardcoded in components (${hits.length})\n`);
  for (const hit of hits) {
    console.error(`  ${hit.file}:${hit.line}`);
    console.error(`    ${hit.text.slice(0, 120)}`);
  }
  console.error(
    "\n  Add the text to src/locale/messages.ts (ko and en) and read it with useUiKitMessages().\n" +
      "  Keep a prop for per-instance overrides: `label: labelProp` → `labelProp ?? t.section.key`.",
  );
  process.exit(1);
}

console.log(`check-copy: ok — ${files.length} files, no hardcoded UI text.`);
