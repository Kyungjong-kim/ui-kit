import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { transform } from "@svgr/core";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SVG_DIR = path.join(__dirname, "svg");
const OUT_DIR = path.join(__dirname, "generated");

const pascalCase = (name) =>
  name
    .replace(/(-|_| )+(\w)/g, (_, __, c) => c.toUpperCase())
    .replace(/^\w/, (c) => c.toUpperCase());

const camelCase = (name) => {
  const pascal = pascalCase(name);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

const patchTitlePropsToAvoidNativeTooltip = (code) => {
  let next = code;

  next = next.replace(/^import\s+\*\s+as\s+React\s+from\s+['"]react['"];\s*\n/m, "");

  next = next.replace(/\n\s*titleId\?: string;\s*/g, "\n");
  next = next.replace(/\n\s*titleId,\s*\n/g, "\n");

  const ariaPattern = /aria-labelledby=\{titleId\}/;
  if (!ariaPattern.test(next)) {
    throw new Error("SVG transform result did not include aria-labelledby attribute");
  }
  next = next.replace(
    ariaPattern,
    "role={title ? 'img' : undefined} aria-label={title ?? undefined} aria-hidden={title ? undefined : true}",
  );

  const titleConditionalPattern =
    /\{title\s*\?\s*<title id=\{titleId\}>\{title\}<\/title>\s*:\s*null\s*\}/;
  if (!titleConditionalPattern.test(next)) {
    throw new Error("SVG transform result did not include conditional title element");
  }
  next = next.replace(titleConditionalPattern, "");

  return next;
};

const normalizePaintAttributes = (code) => {
  const paintRegex =
    /(fill|stroke)="(?!none|currentColor)(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\)|[a-zA-Z]+)"/g;
  const colors = new Set();
  let match = paintRegex.exec(code);

  while (match !== null) {
    colors.add(match[2]);
    if (colors.size > 1) {
      return { code, defaultColor: null };
    }
    match = paintRegex.exec(code);
  }

  if (colors.size === 0) return { code, defaultColor: null };
  return {
    code: code.replace(paintRegex, '$1="currentColor"'),
    defaultColor: [...colors][0],
  };
};

const injectDefaultColorFallback = (code, defaultColor) => {
  const destructPattern = /(title,\s*\n)(\s*)(\.\.\.props)/;
  if (!destructPattern.test(code)) return code;

  let next = code.replace(destructPattern, `$1$2style: styleProp = {},\n$2...props`);

  const svgSpreadPattern = /\{\.\.\.props\}>/;
  if (!svgSpreadPattern.test(next)) return next;

  next = next.replace(
    svgSpreadPattern,
    `{...props} style={{ color: '${defaultColor}', ...styleProp }}>`,
  );

  return next;
};

const ensureUniqueSvgIds = (code) => {
  const idRegex = /id="([^"]+)"/g;
  const ids = new Set();
  let match = idRegex.exec(code);
  while (match !== null) {
    ids.add(match[1]);
    match = idRegex.exec(code);
  }

  if (ids.size === 0) return code;

  let next = code;

  const reactTypeImportPattern = /import type \{ SVGProps \} from ['"]react['"];\n?/;
  if (reactTypeImportPattern.test(next)) {
    next = next.replace(reactTypeImportPattern, (line) => `${line}import { useId } from 'react'\n`);
  }

  const idLines = [...ids]
    .map((id) => {
      const safeName = `${id.replace(/[^a-zA-Z0-9_]/g, "_")}Id`;
      return `  const ${safeName} = \`${id}-\${uniqueId}\`\n`;
    })
    .join("");

  const componentBlockPattern = /const (\w+) = \(\{([\s\S]*?)\}\) => \(\n/;
  if (componentBlockPattern.test(next)) {
    next = next.replace(
      componentBlockPattern,
      (_full, componentName, props) =>
        `const ${componentName} = ({${props}}) => {\n  const uniqueId = useId().replace(/:/g, '')\n${idLines}  return (\n`,
    );
    const componentEndPattern = /\)\nexport default (\w+);?\n?$/;
    if (componentEndPattern.test(next)) {
      next = next.replace(componentEndPattern, ")\n}\n\nexport default $1\n");
    }
  }

  if (!next.includes("const uniqueId")) {
    const inlineStartPattern = /=>\s*<svg/;
    if (inlineStartPattern.test(next)) {
      next = next.replace(
        inlineStartPattern,
        `=> {\n  const uniqueId = useId().replace(/:/g, '')\n${idLines}  return (\n    <svg`,
      );
      next = next.replace(
        /<\/svg>;\s*export default (\w+);?\s*$/,
        "</svg>\n  )\n}\n\nexport default $1\n",
      );
    }
  }

  for (const id of ids) {
    const safeName = `${id.replace(/[^a-zA-Z0-9_]/g, "_")}Id`;
    const idAttrRegex = new RegExp(`id="${id}"`, "g");
    next = next.replace(idAttrRegex, `id={${safeName}}`);

    const urlAttrRegex = new RegExp(`="url\\(#${id}\\)"`, "g");
    next = next.replace(urlAttrRegex, `={\`url(#\${${safeName}})\`}`);
  }

  return next;
};

async function run() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const files = await fs.readdir(SVG_DIR);

  const exports = [];
  const iconEntries = [];

  for (const file of files) {
    if (!file.endsWith(".svg")) continue;

    const svgPath = path.join(SVG_DIR, file);
    const svgCode = await fs.readFile(svgPath, "utf8");

    const baseName = file.replace(/\.svg$/, "");
    const componentName = pascalCase(baseName);

    const tsxCode = await transform(
      svgCode,
      {
        icon: true,
        titleProp: true,
        typescript: true,
        plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
        svgoConfig: {
          plugins: [
            {
              name: "prefixIds",
              params: {
                prefix: `${componentName}-`,
              },
            },
          ],
        },
      },
      { componentName },
    );

    const withPatchedTitle = patchTitlePropsToAvoidNativeTooltip(tsxCode);
    const uniqueIdCode = ensureUniqueSvgIds(withPatchedTitle);
    const { code: paintedCode, defaultColor } = normalizePaintAttributes(uniqueIdCode);
    const finalCode = (
      defaultColor ? injectDefaultColorFallback(paintedCode, defaultColor) : paintedCode
    ).replace(/^interface SVGRProps/m, "export interface SVGRProps");

    const outPath = path.join(OUT_DIR, `${componentName}.tsx`);
    await fs.writeFile(outPath, finalCode, "utf8");
    exports.push(`export { default as ${componentName} } from './${componentName}'`);
    iconEntries.push({ key: camelCase(baseName), componentName });
  }

  await fs.writeFile(path.join(OUT_DIR, "index.ts"), exports.join("\n"), "utf8");

  const mapLines = [
    "import * as GeneratedIcons from './index'",
    "",
    "export const iconMap = {",
    ...iconEntries.map(({ key, componentName }) => `  '${key}': GeneratedIcons.${componentName},`),
    "} as const",
    "",
  ];
  await fs.writeFile(path.join(OUT_DIR, "icon-map.ts"), mapLines.join("\n"), "utf8");

  console.log(`Generated ${iconEntries.length} icons`);
}

run();
