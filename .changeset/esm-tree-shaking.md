---
"@kyungjong-kim/ui-kit": patch
---

ESM 빌드가 tree-shaking 되도록 고쳤다. 전에는 `dist/index.js` 한 파일이라 `Button` 하나만 import 해도 모든 컴포넌트와 의존성(Radix select·popover, recharts, CodeMirror 등)이 소비 앱 번들에 들어갔다(Vite 기준 1,477KB). 이제 컴포넌트별로 chunk 를 나누고 `package.json` 에 `"sideEffects": ["**/*.css"]` 를 선언해, 쓰지 않는 컴포넌트는 빠진다(`Button` 만 35KB, 컴포넌트 15개 125KB).

공개 진입점(`exports`)과 API 는 바뀌지 않는다. CJS(`index.cjs`)는 그대로 단일 파일이다.
