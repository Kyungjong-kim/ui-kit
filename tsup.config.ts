import { existsSync, readdirSync } from "node:fs";
import { defineConfig } from "tsup";

// 단일 파일이면 소비 앱이 안 쓰는 컴포넌트를 못 버린다 — 컴포넌트별 entry 로 chunk 를 나눈다(#216)
const componentEntries = Object.fromEntries(
  ["src/components/primitives", "src/components/composed", "src/templates"]
    .flatMap((dir) =>
      readdirSync(dir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => `${dir}/${d.name}/index.ts`),
    )
    .filter((file) => existsSync(file))
    .map((file) => [file.replace(/^src\//, "").replace(/\.ts$/, ""), file]),
);

const shared = {
  sourcemap: true,
  external: ["react", "react-dom"],
  // 설정 3개가 동시에 돌아 서로의 출력을 지우지 않도록 clean 은 build 스크립트에서 한다
  clean: false,
};

export default defineConfig([
  {
    ...shared,
    entry: { index: "src/index.ts", ...componentEntries },
    format: ["esm"],
    splitting: true,
    dts: { entry: { index: "src/index.ts" } },
  },
  {
    ...shared,
    entry: { index: "src/index.ts" },
    format: ["cjs"],
    dts: { entry: { index: "src/index.ts" } },
  },
  {
    ...shared,
    entry: {
      styles: "src/styles/tokens.css",
      theme: "src/styles/theme.css",
      "reduced-motion": "src/styles/reduced-motion.css",
    },
    format: ["esm"],
  },
]);
