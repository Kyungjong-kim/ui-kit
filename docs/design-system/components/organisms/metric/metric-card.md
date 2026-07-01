# MetricCard

컴팩트한 지표 카드. 라벨·큰 수치·단위·추세(증감 화살표 + 값)를 한 흐름으로 표시한다. 대시보드 상단 KPI 타일 등에 쓴다.

## Import

```ts
import { MetricCard } from "ui-kit";
import type { MetricCardProps, MetricTrend, MetricTrendDirection } from "ui-kit";
```

## Props (`MetricCardProps`)

표준 `<div>` 속성(`HTMLAttributes<HTMLDivElement>`)을 상속한다.

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `label` | `ReactNode` | — | 지표 라벨 |
| `value` | `ReactNode` | — | 큰 수치 값 |
| `unit` | `ReactNode` | — | 값 뒤에 붙는 단위(예: "명", "%") |
| `trend` | `MetricTrend` | — | 증감 추세(화살표 + 값) |

### `MetricTrend`

| 필드 | 타입 | 설명 |
|---|---|---|
| `direction` | `"up" \| "down" \| "neutral"` | 추세 방향. up=success 색, down=danger 색, neutral=회색 |
| `value` | `ReactNode` | 증감 값(예: `"12%"`, `"+3"`) |

## 기본 사용

```tsx
<MetricCard label="활성 사용자" value="1,284" unit="명" />

<MetricCard
  label="전환율"
  value="4.2"
  unit="%"
  trend={{ direction: "up", value: "0.8%" }}
/>

<MetricCard
  label="이탈률"
  value="2.1"
  unit="%"
  trend={{ direction: "down", value: "0.3%" }}
/>
```

## 동작 노트

- `trend`는 `direction`에 따라 색과 화살표 아이콘이 자동 매핑된다(`up`↑ success, `down`↓ danger, `neutral`→ 회색). 색은 방향으로만 결정되므로 "하락이 긍정"인 지표라면 표시 값을 호출부에서 조정한다.
- `trend`가 있으면 우측 정렬(`ml-auto`)로 값 옆에 붙는다.

## When to use

- 대시보드의 단일 핵심 수치 + 증감 표시.
- 라벨·값·부가 설명을 여러 줄로 담아야 하면 `StatCard`, 여러 지표를 격자로 묶으면 `SummaryGrid`를 고려한다.
