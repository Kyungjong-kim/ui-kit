# Component Specs

`ui-kit` 디자인 시스템의 컴포넌트 spec 문서 인덱스.

모든 컴포넌트는 패키지 루트에서 named export 된다.

```ts
import { Button, Input, Dialog, Toaster } from "ui-kit";
```

토큰 규약: 색상·간격·타이포는 CSS 변수(`var(--color-...)`)와 토큰 유틸리티 클래스(`typography-*`, `h-size-control-*`, `px-inline-*` 등)로 표현한다. raw hex·임의 px 값은 사용하지 않는다.

## 컴포넌트 구현 계층

- **primitives** — 단일 책임의 기본 빌딩 블록. 다수가 Radix UI primitive 위에 토큰 스타일을 입힌 래퍼.
- **composed** — primitives를 조합한 상위 컴포넌트.

## 문서 카테고리

문서는 기능 역할에 따라 8개 카테고리로 나뉜다. 각 카테고리 폴더의 `README.md`에 소속 컴포넌트 전체 목록이 있다.

| 카테고리 | 개요 | 인덱스 |
|---|---|---|
| Foundation | 타이포·아이콘·구분선 등 원자 요소 | [foundation/](./foundation/README.md) |
| Actions | 버튼 계열 액션 트리거 | [actions/](./actions/README.md) |
| Inputs | 폼 입력·선택 컨트롤 | [inputs/](./inputs/README.md) |
| Data Display | 표·차트·카드·지표 시각화 | [data-display/](./data-display/README.md) |
| Feedback | 경고·토스트·빈 상태 알림 | [feedback/](./feedback/README.md) |
| Navigation | 탭·페이지네이션·헤더 탐색 | [navigation/](./navigation/README.md) |
| Overlay | 다이얼로그·시트·툴팁 레이어 | [overlay/](./overlay/README.md) |
| Layout | 카드·아코디언 등 컨테이너 | [layout/](./layout/README.md) |

## 작성된 문서

| 문서 | 컴포넌트 | 카테고리 |
|---|---|---|
| [actions/button.md](./actions/button.md) | Button | Actions |
| [inputs/input.md](./inputs/input.md) | Input | Inputs |
| [inputs/textarea.md](./inputs/textarea.md) | Textarea | Inputs |
| [inputs/select.md](./inputs/select.md) | Select | Inputs |
| [inputs/form-controls.md](./inputs/form-controls.md) | Checkbox · RadioGroup · Switch | Inputs |
| [inputs/date-picker.md](./inputs/date-picker.md) | DatePicker | Inputs |
| [inputs/multi-select.md](./inputs/multi-select.md) | MultiSelect | Inputs |
| [inputs/code-editor.md](./inputs/code-editor.md) | CodeEditor | Inputs |
| [data-display/table.md](./data-display/table.md) | Table | Data Display |
| [data-display/tree-table.md](./data-display/tree-table.md) | TreeTable | Data Display |
| [data-display/data-table.md](./data-display/data-table.md) | DataTable | Data Display |
| [data-display/chart.md](./data-display/chart.md) | LineChart · BarChart · DonutChart | Data Display |
| [data-display/bar-list.md](./data-display/bar-list.md) | BarList | Data Display |
| [data-display/metric-card.md](./data-display/metric-card.md) | MetricCard | Data Display |
| [data-display/badge-chip-tag.md](./data-display/badge-chip-tag.md) | Badge · Tag · Chip | Data Display |
| [feedback/alert.md](./feedback/alert.md) | Alert | Feedback |
| [feedback/toast.md](./feedback/toast.md) | Toaster · toast | Feedback |
| [feedback/empty-state.md](./feedback/empty-state.md) | EmptyState | Feedback |
| [navigation/tabs.md](./navigation/tabs.md) | Tabs | Navigation |
| [navigation/pagination.md](./navigation/pagination.md) | Pagination | Navigation |
| [navigation/page-header.md](./navigation/page-header.md) | PageHeader | Navigation |
| [overlay/overlay.md](./overlay/overlay.md) | Dialog · Sheet | Overlay |
| [overlay/tooltip.md](./overlay/tooltip.md) | Tooltip | Overlay |

> 나머지 컴포넌트는 각 카테고리 `README.md`에 "문서 예정"으로 표기되어 있다.

## 공통 패턴

- **폼 입력 컴포넌트**(Input · Textarea · Select · Checkbox · RadioGroup · Switch)는 공통적으로 `label` · `error: boolean` · `helperText` props를 지원한다. `error`가 `true`면 테두리·헬퍼 텍스트가 danger 토큰으로 전환된다.
- **포커스 링**: 모든 인터랙티브 요소는 `focus-visible` 상태에서 `var(--color-border-focus)` 링을 표시한다.
- **size 스케일**: 컨트롤 높이는 `sm` · `md`(기본) · `lg` 3단계 토큰(`h-size-control-*`)을 사용한다.
