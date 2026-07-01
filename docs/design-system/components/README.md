# Component Specs

`ui-kit` 디자인 시스템의 핵심 컴포넌트 spec 문서 인덱스.

모든 컴포넌트는 패키지 루트에서 named export 된다.

```ts
import { Button, Input, Dialog, Toaster } from "ui-kit";
```

토큰 규약: 색상·간격·타이포는 CSS 변수(`var(--color-...)`)와 토큰 유틸리티 클래스(`typography-*`, `h-size-control-*`, `px-inline-*` 등)로 표현한다. raw hex·임의 px 값은 사용하지 않는다.

## 카테고리

컴포넌트는 두 계층으로 나뉜다.

- **primitives** — 단일 책임의 기본 빌딩 블록. 다수가 Radix UI primitive 위에 토큰 스타일을 입힌 래퍼.
- **composed** — primitives를 조합한 상위 컴포넌트.

| 문서 | 컴포넌트 | 카테고리 | export |
|---|---|---|---|
| [button.md](./button.md) | Button | primitives | `Button` |
| [input.md](./input.md) | Input | primitives | `Input` |
| [textarea.md](./textarea.md) | Textarea | primitives | `Textarea` |
| [select.md](./select.md) | Select | primitives | `Select` |
| [form-controls.md](./form-controls.md) | Checkbox · RadioGroup · Switch | primitives | `Checkbox`, `RadioGroup`, `RadioGroupItem`, `Switch` |
| [badge-chip-tag.md](./badge-chip-tag.md) | Badge · Tag · Chip | primitives / composed | `Badge`, `Tag`, `Chip` |
| [tooltip.md](./tooltip.md) | Tooltip | primitives | `Tooltip` |
| [overlay.md](./overlay.md) | Dialog · Sheet | primitives | `Dialog`, `DialogTrigger`, `Sheet`, `SheetTrigger` |
| [toast.md](./toast.md) | Toaster · toast | primitives | `Toaster`, `toast` |
| [pagination.md](./pagination.md) | Pagination | primitives | `Pagination` |
| [tabs.md](./tabs.md) | Tabs | primitives | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` |
| [empty-state.md](./empty-state.md) | EmptyState | composed | `EmptyState` |
| [page-header.md](./page-header.md) | PageHeader | composed | `PageHeader` |
| [date-picker.md](./date-picker.md) | DatePicker | composed | `DatePicker` |
| [chart.md](./chart.md) | LineChart · BarChart · DonutChart | composed | `LineChart`, `BarChart`, `DonutChart` |
| [data-table.md](./data-table.md) | DataTable | composed | `DataTable` |

## 공통 패턴

- **폼 입력 컴포넌트**(Input · Textarea · Select · Checkbox · RadioGroup · Switch)는 공통적으로 `label` · `error: boolean` · `helperText` props를 지원한다. `error`가 `true`면 테두리·헬퍼 텍스트가 danger 토큰으로 전환된다.
- **포커스 링**: 모든 인터랙티브 요소는 `focus-visible` 상태에서 `var(--color-border-focus)` 링을 표시한다.
- **size 스케일**: 컨트롤 높이는 `sm` · `md`(기본) · `lg` 3단계 토큰(`h-size-control-*`)을 사용한다.
