# Component Specs

`ui-kit` 디자인 시스템의 컴포넌트 spec 문서 인덱스.

모든 컴포넌트는 패키지 루트에서 named export 된다.

```ts
import { Button, Input, Dialog, Toaster } from "ui-kit";
```

토큰 규약: 색상·간격·타이포는 CSS 변수(`var(--color-...)`)와 토큰 유틸리티 클래스(`typography-*`, `h-size-control-*`, `px-inline-*` 등)로 표현한다. raw hex·임의 px 값은 사용하지 않는다.

## 구현 계층 (소스 기준)

- **primitives** — 단일 책임의 기본 빌딩 블록. 다수가 Radix UI primitive 위에 토큰 스타일을 입힌 래퍼.
- **composed** — primitives를 조합한 상위 컴포넌트.
- **templates** — composed·primitives를 조합한 페이지 골격.

## 문서 계층 (Atomic Design)

문서는 [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) 계층으로 나뉜다.
각 단계는 **단계 > 서브그룹 > 컴포넌트**의 2단계 하위 구조를 갖는다.
각 단계 폴더의 `README.md`에 서브그룹 목록이, 각 서브그룹 폴더의 `README.md`에 소속 컴포넌트 목록이 있다.

| 단계 | 개요 | 서브그룹 | 인덱스 |
|---|---|---|---|
| Foundation | 타이포·아이콘·로고·토큰 등 시각 언어의 재료 (0단계) | — | [foundation/](./foundation/README.md) |
| Atoms | 더 쪼갤 수 없는 최소 UI 단위 | buttons · status · form-controls · loading · display | [atoms/](./atoms/README.md) |
| Molecules | atoms를 묶은 재사용 단위 컨트롤 | form · select · date · navigation · feedback · filter · heading · progress | [molecules/](./molecules/README.md) |
| Organisms | 도메인 맥락을 갖는 복합 블록 | charts · tables · metric · overlay · cells · card · misc | [organisms/](./organisms/README.md) |
| Templates | 페이지 수준 레이아웃 골격 | 8종 페이지 템플릿 | [templates/](./templates/README.md) |

## 작성된 문서

| 문서 | 컴포넌트 | 단계 · 서브그룹 |
|---|---|---|
| [atoms/buttons/button.md](./atoms/buttons/button.md) | Button | Atoms · buttons |
| [atoms/status/badge-chip-tag.md](./atoms/status/badge-chip-tag.md) | Badge · Tag · Chip | Atoms · status |
| [atoms/form-controls/form-controls.md](./atoms/form-controls/form-controls.md) | Checkbox · RadioGroup · Switch | Atoms · form-controls |
| [atoms/display/tooltip.md](./atoms/display/tooltip.md) | Tooltip | Atoms · display |
| [molecules/form/input.md](./molecules/form/input.md) | Input | Molecules · form |
| [molecules/form/textarea.md](./molecules/form/textarea.md) | Textarea | Molecules · form |
| [molecules/form/code-editor.md](./molecules/form/code-editor.md) | CodeEditor | Molecules · form |
| [molecules/select/select.md](./molecules/select/select.md) | Select | Molecules · select |
| [molecules/select/multi-select.md](./molecules/select/multi-select.md) | MultiSelect | Molecules · select |
| [molecules/date/date-picker.md](./molecules/date/date-picker.md) | DatePicker | Molecules · date |
| [molecules/navigation/tabs.md](./molecules/navigation/tabs.md) | Tabs | Molecules · navigation |
| [molecules/navigation/pagination.md](./molecules/navigation/pagination.md) | Pagination | Molecules · navigation |
| [molecules/feedback/alert.md](./molecules/feedback/alert.md) | Alert | Molecules · feedback |
| [molecules/feedback/toast.md](./molecules/feedback/toast.md) | Toaster · toast | Molecules · feedback |
| [molecules/feedback/empty-state.md](./molecules/feedback/empty-state.md) | EmptyState | Molecules · feedback |
| [molecules/heading/page-header.md](./molecules/heading/page-header.md) | PageHeader | Molecules · heading |
| [organisms/charts/chart.md](./organisms/charts/chart.md) | LineChart · BarChart · DonutChart | Organisms · charts |
| [organisms/charts/bar-list.md](./organisms/charts/bar-list.md) | BarList | Organisms · charts |
| [organisms/tables/table.md](./organisms/tables/table.md) | Table | Organisms · tables |
| [organisms/tables/tree-table.md](./organisms/tables/tree-table.md) | TreeTable | Organisms · tables |
| [organisms/tables/data-table.md](./organisms/tables/data-table.md) | DataTable | Organisms · tables |
| [organisms/metric/metric-card.md](./organisms/metric/metric-card.md) | MetricCard | Organisms · metric |
| [organisms/overlay/overlay.md](./organisms/overlay/overlay.md) | Dialog · Sheet | Organisms · overlay |
| [templates/list-page.md](./templates/list-page.md) | ListPageTemplate | Templates |
| [templates/bulk-action-list-page.md](./templates/bulk-action-list-page.md) | BulkActionListPageTemplate | Templates |
| [templates/data-items-layout.md](./templates/data-items-layout.md) | DataItemsLayout | Templates |
| [templates/form-page.md](./templates/form-page.md) | FormPageTemplate | Templates |
| [templates/detail-tabs-page.md](./templates/detail-tabs-page.md) | DetailTabsPageTemplate | Templates |
| [templates/side-panel-page.md](./templates/side-panel-page.md) | SidePanelPageTemplate | Templates |
| [templates/modal-page.md](./templates/modal-page.md) | ModalPageTemplate | Templates |
| [templates/full-screen-dialog-page.md](./templates/full-screen-dialog-page.md) | FullScreenDialogPageTemplate | Templates |

> 나머지 컴포넌트는 각 서브그룹 `README.md`에 "문서 예정"으로 표기되어 있다.

## 공통 패턴

- **폼 입력 컴포넌트**(Input · Textarea · Select · Checkbox · RadioGroup · Switch)는 공통적으로 `label` · `error: boolean` · `helperText` props를 지원한다. `error`가 `true`면 테두리·헬퍼 텍스트가 danger 토큰으로 전환된다.
- **포커스 링**: 모든 인터랙티브 요소는 `focus-visible` 상태에서 `var(--color-border-focus)` 링을 표시한다.
- **size 스케일**: 컨트롤 높이는 `sm` · `md`(기본) · `lg` 3단계 토큰(`h-size-control-*`)을 사용한다.
