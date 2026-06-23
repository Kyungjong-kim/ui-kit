# ui-kit

> Personal React 디자인시스템 라이브러리.
> Tailwind v4 + Radix UI + cva 기반 65개 컴포넌트(primitives 38 · composed 27) + 캐노니컬 DS 문서 제공.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6.svg)](https://www.typescriptlang.org)

---

## 설치

```bash
pnpm add ui-kit
# peer dependencies
pnpm add react react-dom
```

## 사용법

### 1. 디자인 토큰 CSS 로드

앱 진입 파일에서 한 번만 import:

```ts
// main.tsx (또는 _app.tsx 등)
import "ui-kit/styles";
```

### 2. Tailwind v4 설정

ui-kit dist를 스캔하도록 추가합니다 (Tailwind v4는 컴포넌트 사용처에서 유틸리티 클래스를 생성):

```css
/* app.css */
@import "tailwindcss";
@source "../node_modules/ui-kit/dist";
```

### 3. 컴포넌트 사용

```tsx
import { Button, Badge, Toaster, toast } from "ui-kit";

export function App() {
  return (
    <>
      <Button onClick={() => toast.success("Hello")}>Click</Button>
      <Badge variant="success">Active</Badge>
      <Toaster />
    </>
  );
}
```

---

## 컴포넌트

Storybook 사이드바와 동일한 8개 카테고리.

| 카테고리 | 컴포넌트 |
|---|---|
| **Foundation** | `Icon`, `FileIcon` |
| **Actions** | `Button`, `LinkButton`, `IconButton`, `MultilineButton`, `SelectButton`, `SelectIconButton`, `CheckMark` |
| **Inputs** | `Input`, `Textarea`, `Select`, `Combobox`, `Checkbox`, `RadioGroup`, `Switch`, `Slider`, `DatePicker`, `FileUpload`, `MultiSelect`, `TagInput`, `SegmentedControl` |
| **Data Display** | `Text`, `Badge`, `Tag`, `Chip`, `Card`, `Avatar`, `Thumbnail`, `ImageCell`, `DocumentCell`, `SlideListBadge`, `Accordion`, `Separator`, `ScrollArea`, `Calendar`, `DndList`, `SectionTitle`, `TruncateText`, `MetaItem`, `DescriptionList`, `SettingRow`, `StatCard`, `SummaryGrid`, `Timeline` |
| **Feedback** | `Toast` (`Toaster` + `toast()`), `Spinner`, `Skeleton`, `TextSkeleton`, `Progress`, `EmptyState` |
| **Navigation** | `Tabs`, `IconTabs`, `Pagination`, `Breadcrumb`, `Stepper` |
| **Overlay** | `Dialog`, `AlertDialog`, `Sheet`, `Popover`, `DropdownMenu`, `Tooltip`, `Modal` |
| **Layout** | `PageHeader`, `LogoOnlyHeader` |

총 65개(primitives 38 · composed 27) — 컴포넌트별 Props·예제는 Storybook Docs 또는 [`docs/design-system/components/`](docs/design-system/components) 참고.

---

## 디자인 토큰

ui-kit는 **2계층 토큰** 구조를 따릅니다.

```
src/styles/
├── tokens.css                 # 진입점 (core + semantic)
└── tokens/
    ├── core.css               # raw 색상·spacing (직접 참조 금지)
    └── semantic.css           # 의미 토큰 (컴포넌트가 사용)
```

**원칙**: 컴포넌트는 semantic 토큰만 참조하되, 라이브러리 이식성 위해 **CSS 변수 직접 참조 형태**(`[var(--color-bg-brand-default)]`)를 쓴다 — 소비 앱이 `@theme`를 구성하지 않아도 동작. core 토큰(`--color-brand-500`)·raw hex(`#fabc37`) 직접 사용 금지.

자세한 토큰 카탈로그와 variant 패턴은 [`docs/ui-kit/agent/design-system.md`](docs/ui-kit/agent/design-system.md) 참고.

---

## 디자인 시스템 문서

토큰·컴포넌트·패턴·원칙의 캐노니컬 문서는 [`docs/design-system/`](docs/design-system/README.md)에 있습니다.

| 영역 | 내용 |
|------|------|
| [`foundation/`](docs/design-system/foundation) | 원칙·컬러·타이포·레이아웃·모션·접근성 |
| [`tokens/`](docs/design-system/tokens) | core→semantic 2계층 토큰 가이드 |
| [`components/`](docs/design-system/components) | 컴포넌트별 Props·예제·when-to-use |
| [`patterns/`](docs/design-system/patterns) | 폼·목록·상세 레이아웃, 빈 상태, 확인 모달 등 조합 규칙 |

---

## 개발

```bash
pnpm install
pnpm dev          # tsup --watch (dist 자동 갱신)
pnpm storybook    # localhost:6006
pnpm test         # vitest (단위 테스트)
pnpm lint         # biome check
pnpm format       # biome format --write
pnpm build        # tsup ESM+CJS dual + dist/styles.css
```

### 릴리스 (changesets)

```bash
pnpm changeset    # 변경사항 기록
pnpm version      # 버전 bump + CHANGELOG 갱신
pnpm release      # build + npm publish
```

---

## 기여

이 저장소는 1인 운영이며 Claude Code 하네스로 통제됩니다. 작업 진입 시 다음 문서를 참조합니다:

| 문서 | 역할 |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | 작업 진입 규칙 (STEP 0~3, 강제 규칙, 검증 하네스) |
| [`docs/ui-kit/agent/architecture.md`](docs/ui-kit/agent/architecture.md) | 라이브러리 빌드·exports·디렉토리 구조 |
| [`docs/ui-kit/agent/conventions.md`](docs/ui-kit/agent/conventions.md) | 코딩 컨벤션 (biome·네이밍·forwardRef 등) |
| [`docs/ui-kit/agent/design-system.md`](docs/ui-kit/agent/design-system.md) | 토큰·variant 패턴·새 토큰 추가 절차 (에이전트 quickref) |
| [`docs/design-system/`](docs/design-system/README.md) | 디자인 시스템 캐노니컬 문서 (foundation·tokens·components·patterns) |
| [`docs/ui-kit/git-workflow/branch-commit.md`](docs/ui-kit/git-workflow/branch-commit.md) | Git Flow + 컨벤셔널 커밋 |
| [`docs/ui-kit/status/HANDOFF_NOW.md`](docs/ui-kit/status/HANDOFF_NOW.md) | 현재 상태·다음 작업 (Hot 문서) |

### 브랜치 모델 (Git Flow)

```
main                  ← 프로덕션 (npm publish 시점)
  ├── release/<버전>   ← 버전 cut + changeset 통합 (develop 분기)
  └── hotfix/<요약>    ← 프로덕션 긴급 수정 (main 분기)

develop               ← 개발 통합 (모든 feature PR 머지 대상)
  └── feat|fix|refactor|docs|test|chore/<요약>
```

상세 규칙은 [`branch-commit.md`](docs/ui-kit/git-workflow/branch-commit.md).

---

## 라이선스

[MIT](LICENSE) © Kyungjong Kim
