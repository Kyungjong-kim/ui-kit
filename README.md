# ui-kit

> Personal React 디자인시스템 라이브러리.
> Tailwind v4 + Radix UI + cva 기반 106개 컴포넌트(primitives 38 · composed 60 · templates 8) + JSON 단일 소스 토큰 파이프라인 + 다크모드 + 캐노니컬 DS 문서 제공.

**📖 라이브 Storybook → https://kyungjong-kim.github.io/ui-kit/**

[![Storybook](https://img.shields.io/badge/Storybook-live-ff4785.svg)](https://kyungjong-kim.github.io/ui-kit/)
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

### 1. Tailwind v4 CSS 설정

앱 전역 CSS(예: `app.css` · `globals.css`)에서 한 번만 구성:

```css
@import "tailwindcss";
@import "ui-kit/styles";   /* 디자인 토큰 :root (--token-*, --color-*) */
@import "ui-kit/theme";    /* @theme inline 매핑 — gap-group-xl·h-size-control-sm 등 커스텀 유틸 생성 */
@source "../node_modules/ui-kit/dist";  /* 컴포넌트 클래스 스캔 */
```

| import | 내용 | 필수 |
|---|---|---|
| `ui-kit/styles` | core+semantic 토큰 `:root` 값 (런타임 CSS 변수) | ✅ |
| `ui-kit/theme` | Tailwind v4 `@theme inline` 매핑 (radius·spacing·size·shadow·color·typography 유틸 매핑) | ✅ Tailwind v4 |
| `@source` | ui-kit dist 스캔 → 컴포넌트가 쓰는 유틸 생성 | ✅ |

> `ui-kit/theme` 없이는 컴포넌트가 쓰는 `gap-group-xl`·`h-size-control-sm`·`w-size-icon-sm`·`rounded-md`·`shadow-default-sm`·`typography-*` 같은 커스텀 theme 유틸이 생성되지 않아 레이아웃이 깨진다. (`@import "tailwindcss"` 는 소비 앱이 직접 선언 — `ui-kit/theme` 에는 포함하지 않는다.)
>
> CSS `@import` 대신 JS 진입에서 토큰만 로드하려면 `import "ui-kit/styles";` 도 가능하나, `ui-kit/theme` 는 Tailwind 가 처리해야 하므로 반드시 CSS `@import` 로 둔다.

### 2. 컴포넌트 사용

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

Storybook 사이드바와 동일한 **Atomic Design 계층 + 서브그룹** 구조.

| 계층 | 서브그룹 · 컴포넌트 |
|---|---|
| **Foundations** | Design Tokens · `Text` · `Icon` · `FileIcon` |
| **Atoms** | **Buttons** `Button` `IconButton` `LinkButton` `MultilineButton` `SelectButton` `SelectIconButton` `FavoriteButton` `RefreshButton` `ResetButton` / **Status** `Badge` `Tag` `Chip` `DotBadge` `SlideListBadge` / **Form Controls** `Checkbox` `RadioGroup` `Switch` / **Loading** `Skeleton` `TextSkeleton` `Spinner` `Progress` / **Display** `Avatar` `Thumbnail` `Tooltip` `HelpTooltipIcon` `Separator` `CheckMark` |
| **Molecules** | **Form** `Input` `Textarea` `TagInput` `CodeEditor` `SegmentedControl` `FileUpload` / **Select** `Select` `MultiSelect` `Combobox` `SearchableSelect` `CascadingSelect` / **Date** `Calendar` `DatePicker` `DateRangePicker` `DateTimePicker` `MonthPicker` `PeriodFilterDropdown` / **Navigation** `Tabs` `IconTabs` `Breadcrumb` `Pagination` `Stepper` `Accordion` / **Feedback** `Toast` `Alert` `GuideBlock` `EmptyState` / **Filter** `DropdownMenu` `FilterDropdown` `ListControl` / **Heading** `PageHeader` `SectionTitle` / **Progress** `Slider` `SliderField` |
| **Organisms** | **Charts** `LineChart` `BarChart` `AreaChart` `PieChart` `DonutChart` `RadarChart` `GaugeChart` `SemiCircleChart` `Sparkline` `Heatmap` `BarList` `ComparisonBar` / **Tables** `Table` `DataTable` `TreeTable` `DataItemsTable` / **Metric** `StatCard` `MetricCard` `ResourceUsage` `ClusterResourceBar` `SummaryGrid` / **Cells** `UserCell` `DateTimeCell` `ImageCell` `DocumentCell` / **Overlay** `Dialog` `AlertDialog` `Modal` `Sheet` `Popover` `SidePanel` `FullScreenDialog` `NavFlyout` / **Card** `Card` `VersionInfoCard` / **Misc** `Timeline` `SettingRow` `DescriptionList` `MetaItem` `DndList` `ScrollArea` `TruncateText` `LogoOnlyHeader` |
| **Templates** | `ListPageTemplate` `FormPageTemplate` `DetailTabsPageTemplate` `BulkActionListPageTemplate` `ModalPageTemplate` `SidePanelPageTemplate` `FullScreenDialogPageTemplate` `DataItemsLayout` — 실사용 조합 화면 목업 |

총 **106개**(primitives 38 · composed 60 · templates 8) — 컴포넌트별 Props·예제는 [라이브 Storybook](https://kyungjong-kim.github.io/ui-kit/) 또는 [`docs/design-system/components/`](docs/design-system/components) 참고.

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

## 변경 이력

주요 변경을 여기 누적한다(세부 버전 릴리스는 changesets → `CHANGELOG.md`).

### 2026-07-06 — Storybook 공개 배포·마감 품질

- **GitHub Pages 자동 배포**(#151) — develop push 시 Storybook 배포 → https://kyungjong-kim.github.io/ui-kit/
- 실화면 조합 버그 일괄(#146·#149): Button `whitespace-nowrap` · TagInput 한글 라벨 · cn `size-*` 토큰 병합 등록(`w-full` override 신뢰성) · Storybook docs 표 리셋 스코프 격리 · DotBadge `info` 파랑 정정 · Badge 톤 semantic 경유(`text-*-strong` 신설)
- 차트 semantic 토큰 `--color-chart-*`(#145) · 공개 자산 식별자 마스킹 정리(#153)

### 2026-07-02 — 템플릿·다크모드·문서 계층·규격

- **페이지 템플릿 8종** — 실사용 조합 화면 목업(List·Form·DetailTabs·BulkAction·Modal·SidePanel·FullScreenDialog·DataItems)
- **다크모드** — `[data-theme="dark"]` semantic 오버라이드(라이트 회귀 0)
- **Atomic Design 재편** — 문서·Storybook 사이드바 5계층+서브그룹
- **정량 디자인 규격** `docs/design-system/DESIGN.md` — spacing 리듬·타이포 스케일·elevation 4단계·radius 정책 + 규격 감사 일괄 적용

### 2026-07-01 — 관리자 DS 격차 보완 (컴포넌트 대량 확충·토큰 파이프라인·아이콘)

성숙 관리자 DS를 벤치마크로 부재 컴포넌트 43종 및 인프라 보강 (이슈 #74~95).

- **컴포넌트(+43)**
  - 데이터: `DataTable`(정렬·페이지·선택) · `Table` · `TreeTable` · `DataItemsTable`
  - 차트(recharts): `LineChart` · `BarChart` · `DonutChart` · `AreaChart` · `PieChart` · `RadarChart` · `GaugeChart` · `SemiCircleChart` · `Sparkline` · `Heatmap`
  - 데이터 보조: `BarList` · `ResourceUsage` · `ComparisonBar` · `ClusterResourceBar`
  - 고급 입력: `DateRangePicker` · `DateTimePicker` · `MonthPicker` · `SearchableSelect` · `CascadingSelect` · `FilterDropdown` · `PeriodFilterDropdown` · `SliderField`
  - 표시: `Alert` · `MetricCard` · `DotBadge` · `VersionInfoCard` · `DateTimeCell` · `UserCell` · `GuideBlock`
  - 액션·오버레이: `FullScreenDialog` · `SidePanel` · `RefreshButton` · `ResetButton` · `FavoriteButton` · `HelpTooltipIcon` · `ListControl` · `NavFlyout`
  - 코드: `CodeEditor`(CodeMirror 6)
- **토큰**: JSON 단일 소스 파이프라인(`scripts/build-tokens.ts`) 도입 · `surface-*` 계층 확장(subtle~strongest·상태) · 소비자용 Tailwind v4 `theme.css` 출하
- **아이콘**: semantic alias 레이어(37종 — `success`·`close`·`refresh` 등 의미명)

---

## 라이선스

[MIT](LICENSE) © Kyungjong Kim
