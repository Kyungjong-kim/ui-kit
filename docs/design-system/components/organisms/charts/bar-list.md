# BarList

라벨 + 값 가로 막대 리스트. 각 항목 값을 최댓값(또는 지정 `max`) 대비 비율로 환산해 라벨 뒤 배경 막대로 표시한다. 순위형 지표(상위 요청 경로·모델별 호출 수 등)를 순수 CSS 막대로 나열할 때 쓴다.

## Import

```ts
import { BarList } from "ui-kit";
import type { BarListProps, BarListItem, BarListTone } from "ui-kit";
```

## Props (`BarListProps`)

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `items` | `BarListItem[]` | — | 표시할 항목 목록 |
| `tone` | `"brand" \| "blue" \| "green" \| "orange" \| "red" \| "neutral"` | `"brand"` | 막대 색 톤 |
| `max` | `number` | items 최댓값 | 비율 기준 최댓값. 생략 시 항목 값 중 최댓값 사용 |
| `valueFormatter` | `(value: number) => string` | `String(value)` | 값 표시 포맷터 |
| `className` | `string` | — | 루트 `ul`에 병합 |

### `BarListItem`

| 필드 | 타입 | 설명 |
|---|---|---|
| `label` | `string` | 항목 라벨 |
| `value` | `number` | 항목 값(음수는 0으로 클램프) |

## 기본 사용

```tsx
<BarList
  items={[
    { label: "/chat", value: 1240 },
    { label: "/search", value: 860 },
    { label: "/upload", value: 320 },
  ]}
  tone="blue"
  valueFormatter={(v) => v.toLocaleString()}
/>
```

## 동작 노트

- 각 막대 너비는 `min(100%, value / max * 100)`. `max`를 명시하면 여러 BarList 간 스케일을 통일할 수 있다.
- 값이 음수면 0으로 클램프해 막대가 그려지지 않는다. `resolvedMax`가 0이면 모든 막대가 0%다.
- 막대 배경은 `opacity-20`으로 옅게 깔리고 그 위에 라벨·값 텍스트가 얹힌다.

## When to use

- 소수의 카테고리를 값 크기 순으로 비교·나열하는 순위형 지표.
- 시계열 추이는 [LineChart](./chart.md), 비율 합계는 [DonutChart](./chart.md), 카테고리 비교량이 많으면 [BarChart](./chart.md)를 쓴다.
