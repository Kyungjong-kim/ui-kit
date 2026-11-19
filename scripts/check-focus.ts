/**
 * Focus style guard — blocks interactive elements that render no keyboard focus indicator.
 *
 * Why this exists:
 *   A `<button>` or Radix `*.Trigger` without a focus style is fully clickable and passes
 *   every test, but a keyboard user tabbing onto it sees nothing move. Inline styles make
 *   it worse: `style={{ outline: "none" }}` beats any class, so the ring never shows.
 *
 * The rule (foundation/a11y.md): interactive elements use the `focus-ring` utility
 * (`focus-ring-inset` inside scrolling lists and menus), both declared in theme.css.
 *
 * For each `<button>`, `<a>` and `<X.Trigger>` opening tag in src/components the guard
 * accepts the element when its tag block mentions a focus style (`focus-ring`, `focus:`,
 * `focus-visible:`), delegates rendering (`asChild`), is removed from the tab order
 * (`tabIndex={-1}`), or takes its classes from a shared variable or cva call it cannot
 * see into. A bare passthrough wrapper (`{...props}` and no className of its own) is left
 * to the consumer. Anything else exits 1. An inline `outline: "none"` is always blocked.
 *
 * Run with:  pnpm check:focus
 *
 * Deliberate exception: add `focus-exempt: <reason>` in a comment inside the tag.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SCAN_DIR = join(ROOT, "src/components");
const OPEN_TAG_RE = /<(button|a|[A-Z]\w*\.Trigger)\b/;
const ACCEPT_RE =
  /focus-ring|focus:|focus-visible:|asChild|tabIndex=\{-1\}|focus-exempt|className=\{[A-Za-z_]\w*\}|cn\(\s*[A-Za-z_]\w*[,)]|[A-Za-z]Variants\(/;
const INLINE_OUTLINE_NONE_RE = /outline:\s*["']none["']/;

interface Hit {
  file: string;
  line: number;
  reason: string;
  text: string;
}

function collectFiles(dir: string, found: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      collectFiles(path, found);
    } else if (entry.endsWith(".tsx") && !entry.endsWith(".test.tsx")) {
      found.push(path);
    }
  }
  return found;
}

/** Lines from the opening `<tag` to the line that closes the opening tag. */
function tagBlock(lines: string[], start: number): string {
  const block: string[] = [];
  for (let index = start; index < Math.min(start + 40, lines.length); index++) {
    const line = lines[index];
    block.push(line);
    const trimmed = line.trim().replace(/[;),]+$/, "");
    if (index === start && trimmed.endsWith(">") && !trimmed.endsWith("=>")) break;
    if (index > start && (trimmed === ">" || trimmed.endsWith("/>"))) break;
  }
  return block.join("\n");
}

const hits: Hit[] = [];
const files = collectFiles(SCAN_DIR);
for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, index) => {
    const where = { file: relative(ROOT, file), line: index + 1, text: line.trim().slice(0, 100) };
    if (INLINE_OUTLINE_NONE_RE.test(line)) {
      hits.push({ ...where, reason: 'inline outline: "none" hides the focus ring' });
    }
    if (!OPEN_TAG_RE.test(line)) return;
    const block = tagBlock(lines, index);
    const isPassthrough = /\{\.\.\.props\}/.test(block) && !/className=/.test(block);
    if (!isPassthrough && !ACCEPT_RE.test(block)) {
      hits.push({ ...where, reason: "interactive element has no focus style" });
    }
  });
}

if (hits.length > 0) {
  console.error(`check-focus: missing keyboard focus indicators (${hits.length})\n`);
  for (const hit of hits) {
    console.error(`  ${hit.file}:${hit.line}  ${hit.reason}`);
    console.error(`    ${hit.text}`);
  }
  console.error(
    "\n  Add the `focus-ring` utility (`focus-ring-inset` inside scrolling lists and menus).\n" +
      "  If the element is focus-managed elsewhere, add a `focus-exempt: <reason>` comment in the tag.",
  );
  process.exit(1);
}

console.log(
  `check-focus: ok — ${files.length} files, every interactive element has a focus style.`,
);
