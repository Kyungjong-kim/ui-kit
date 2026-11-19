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
 * For each `<button>`, `<a>`, `<X.Trigger|Close|Action|Cancel>` and any element with an
 * interactive `role` or `tabIndex={0}` in src/components, the guard accepts the element
 * when its tag block draws a focus style (`focus-ring`, or a `focus:`/`focus-visible:`
 * ring·outline·border·bg·shadow — `outline-none` alone does not count), delegates rendering (`asChild`), is removed from the tab order
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
const OPEN_TAG_RE = /<(button|a|[A-Z]\w*\.(?:Trigger|Close|Action|Cancel))\b/;
/** Any other element becomes interactive through a role or by joining the tab order. */
const ANY_TAG_RE = /<[a-z][\w.]*\b/;
const INTERACTIVE_ATTR_RE =
  /role="(?:button|tab|option|menuitem|checkbox|radio|switch)"|tabIndex=\{0\}/;
/** A focus style that actually draws something — `focus:outline-none` alone removes, not shows. */
const VISIBLE_FOCUS_RE =
  /focus-ring|focus(?:-visible|-within)?:(?:ring-(?!0\b)|outline-(?!none\b|hidden\b)|border-|bg-|shadow|underline)/;
const ACCEPT_RE =
  /asChild|tabIndex=\{-1\}|focus-exempt|className=\{[A-Za-z_]\w*\}|cn\(\s*[A-Za-z_]\w*[,)]|[A-Za-z]Variants\(/;
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
    // an attribute line that closes the tag: `className="…">`, `onClick={…}>` (not an arrow `=>`)
    if (index > start && (trimmed === ">" || trimmed.endsWith("/>") || /["'}]>$/.test(trimmed)))
      break;
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
    const isTarget = OPEN_TAG_RE.test(line);
    if (!isTarget && !ANY_TAG_RE.test(line)) return;
    const block = tagBlock(lines, index);
    if (!isTarget && !INTERACTIVE_ATTR_RE.test(block)) return;
    const isPassthrough = /\{\.\.\.props\}/.test(block) && !/className=/.test(block);
    if (!isPassthrough && !VISIBLE_FOCUS_RE.test(block) && !ACCEPT_RE.test(block)) {
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
