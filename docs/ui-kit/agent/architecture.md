# ui-kit 아키텍처 (에이전트용 요약)

> 이 문서는 에이전트가 작업을 시작할 때 읽는 **라이브러리 구조 인덱스**입니다.
>
> **문서 신선도**: 마지막 확인 2026-05-15

---

## 1. 라이브러리 개요

ui-kit는 React 디자인시스템 라이브러리이며 `dist/` 산출물을 외부 앱이 npm 패키지처럼 소비합니다.

| 항목 | 값 |
|---|---|
| **타입** | 라이브러리 (npm publish 대상) — 앱 아님 |
| **빌드 도구** | tsup 8.x (ESM + CJS dual) |
| **타입 시스템** | TypeScript 6.x (`dts: true` — `.d.ts` 함께 출력) |
| **패키지 매니저** | pnpm 9.x |
| **린터·포매터** | biome 2.x |
| **테스트** | vitest 4.x + Testing Library |
| **시각 검증** | Storybook 10.x (react-vite) |
| **버전 관리** | Changesets |

---

## 2. exports 진입점

`package.json` `exports` 필드 기준:

| 진입점 | 파일 | 용도 |
|---|---|---|
| `ui-kit` | `dist/index.js` (ESM) / `dist/index.cjs` (CJS) | 컴포넌트·유틸 import |
| `ui-kit/styles` | `dist/styles.css` | 디자인 토큰 CSS 로드 |

**주의**: `dist/styles.css`는 **디자인 토큰 + `@utility typography-*`** 만 포함 (2026-05-15 기준 311줄 / ~12.8KB). 컴포넌트 className(`bg-[var(--...)]` 임의값)에 해당하는 Tailwind 유틸리티는 사용처(외부 앱) Tailwind v4가 ui-kit dist를 스캔해야 생성됨.

---

## 3. peerDependencies / dependencies

| 종류 | 패키지 | 비고 |
|---|---|---|
| **peer** | `react ^19`, `react-dom ^19` | 사용처에서 제공 |
| **dep (Radix)** | `@radix-ui/react-{accordion, avatar, checkbox, dialog, dropdown-menu, label, popover, select, separator, slot, switch, tabs, tooltip}` | dist에 번들 안 함 (external 아니지만 그대로 import) |
| **dep (DnD)** | `@dnd-kit/{core, sortable, utilities}` | DndList 컴포넌트용 |
| **dep (variant)** | `class-variance-authority`, `clsx`, `tailwind-merge` | cva·cn 유틸 |
| **dep (toast)** | `sonner` | Toast 컴포넌트 |
| **dep (file)** | `react-dropzone` | FileUpload 컴포넌트 |
| **dep (icon)** | `lucide-react` | 아이콘 |

> **tsup external**: `react`, `react-dom`만 external. 나머지는 사용처가 자동으로 transitive dependency로 가져감.

---

## 4. 디렉토리 구조

```
src/
├── index.ts                  # 모든 export 진입점
├── components/
│   ├── index.ts              # primitives + composed 재export
│   ├── primitives/
│   │   ├── index.ts          # 36개 컴포넌트 export (2026-05-15 기준)
│   │   ├── accordion/
│   │   │   ├── accordion.tsx
│   │   │   ├── accordion.test.tsx
│   │   │   └── index.ts
│   │   ├── badge/
│   │   └── ... (총 36개 — Radix 래핑·단일 책임)
│   └── composed/
│       ├── index.ts          # 16개 컴포넌트 export (2026-05-15 기준)
│       ├── date-picker/
│       ├── empty-state/
│       ├── page-header/
│       └── ... (총 16개 — primitives 조합·도메인 컴포넌트)
├── styles/
│   ├── tokens.css            # tokens/ 진입점 (core + semantic import)
│   ├── index.css             # Storybook/dev 전용 (@theme inline + @utility typography-*)
│   └── tokens/
│       ├── core.css          # raw 색상·spacing·radius·size·shadow·typography 토큰
│       └── semantic.css      # core 참조하는 의미 토큰
├── utils/
│   └── cn.ts                 # clsx + tailwind-merge 유틸
└── stories/                  # 일부 데모 자료 (별도 stories/ 디렉토리도 사용)

stories/                      # Storybook 스토리 (52개 ≈ primitives 36 + composed 16)
.storybook/                   # Storybook 설정
.changeset/                   # 버전 관리
dist/                         # 빌드 산출물 (gitignore)
```

---

## 5. 컴포넌트 패턴

### 5-1. 디렉토리 구조 (1 컴포넌트당)

`<카테고리>` = `primitives` 또는 `composed`.

```
src/components/<카테고리>/<kebab-case>/
├── <kebab-case>.tsx          # 컴포넌트 본체
├── <kebab-case>.test.tsx     # vitest 단위 테스트
└── index.ts                  # export 재노출

stories/<kebab-case>.stories.tsx
src/components/<카테고리>/index.ts  # ← export 추가 갱신 필수
```

### 5-2. forwardRef 사용 기준

| 컴포넌트 종류 | forwardRef | 예시 |
|---|---|---|
| Radix 래핑 (Trigger·Content 분리) | ✅ 사용 | `Accordion`, `Dialog`, `Tabs`, `DropdownMenu` (primitives) |
| 단순 props 전달 함수 | ❌ 미사용 (함수 선언) | `Avatar`, `Spinner`, `Skeleton` (primitives) / `EmptyState`, `PageHeader` (composed) |
| Button 류 (DOM ref 노출 필요) | ✅ 사용 | `Button` (primitives) |

### 5-3. variant 시스템

`class-variance-authority` (cva) 기반. variant·size 키 사용:

```ts
const buttonVariants = cva("기본 클래스", {
  variants: {
    variant: { primary: "...", secondary: "...", ghost: "...", destructive: "..." },
    size: { sm: "...", md: "...", lg: "..." },
  },
  defaultVariants: { variant: "primary", size: "md" },
});
```

---

## 6. 빌드·배포 흐름

```
[개발] pnpm dev (tsup --watch)  →  dist/ 자동 갱신
[테스트] pnpm test (vitest run)  →  226/226 통과 (2026-05-13 기준)
[린트] pnpm lint (biome check)
[시각 검증] pnpm storybook       →  localhost:6006
[릴리스] pnpm changeset → version → release (changesets publish)
```

에이전트는 컴포넌트 작업 시:
1. 수정 대상이 **primitives** (Radix 래핑·단일 책임) 인지 **composed** (조합·도메인) 인지 먼저 분류
2. 같은 카테고리·같은 패턴(Radix 래핑 / 단순 / DnD)의 컴포넌트 2개 이상 읽고 답습
3. 빌드·테스트·스토리 3종 검증 후 완료
