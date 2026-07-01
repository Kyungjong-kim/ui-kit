# Chart (LineChart · BarChart · DonutChart)

[recharts](https://recharts.org) 기반 차트 컴포넌트. DS 토큰으로 축·그리드·시리즈 색·툴팁을 칠하며, `ResponsiveContainer`로 부모 너비에 맞춰 반응형 렌더한다.

## Import

```ts
import { LineChart, BarChart, DonutChart } from "ui-kit";
import type { LineChartProps, BarChartProps, DonutChartProps, ChartSeries, DonutDatum } from "ui-kit";
```

> `recharts`는 내부 의존이라 별도 설치 불필요. 시리즈 색은 `seriesColor(index)` / `CHART_SERIES_COLORS` 팔레트로 순환한다.

## 공통 개념

- **시리즈(`ChartSeries`)**: `{ dataKey, name?, color? }`. `color` 생략 시 DS 팔레트를 순서대로 순환.
- **색**: 차트 시리즈 색은 의미색이 아닌 구분색이라 core 색 토큰(`--color-brand-500` 등)을 직접 참조한다.
- **반응형**: 너비는 부모에 맞추고 높이는 `height`(기본 300)로 지정.

## LineChart

```tsx
const data = [
  { month: "1월", 매출: 100, 비용: 60 },
  { month: "2월", 매출: 140, 비용: 80 },
];

<LineChart data={data} xKey="month" series={[{ dataKey: "매출" }, { dataKey: "비용" }]} />
```

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `data` | `Record<string, unknown>[]` | — | 각 항목 = X축 한 점 |
| `xKey` | `string` | — | X축 데이터 키 |
| `series` | `ChartSeries[]` | — | 라인 시리즈(1개 이상) |
| `height` | `number` | `300` | 높이(px), 너비는 반응형 |
| `showLegend` | `boolean` | `true` | 범례 표시 |
| `showGrid` | `boolean` | `true` | 그리드 표시 |

## BarChart

```tsx
<BarChart data={byRegion} xKey="region" series={[{ dataKey: "방문" }, { dataKey: "가입" }]} />
{/* 누적 막대 */}
<BarChart data={byRegion} xKey="region" series={[...]} stacked />
```

`stacked`를 제외한 props는 LineChart와 동일. `stacked`면 시리즈가 누적, 아니면 그룹(병렬) 막대.

## DonutChart

```tsx
const status = [
  { name: "정상", value: 62 },
  { name: "주의", value: 24 },
  { name: "오류", value: 14 },
];

<DonutChart data={status} />
{/* 파이 차트: innerRadius=0 */}
<DonutChart data={status} innerRadius={0} />
```

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| `data` | `DonutDatum[]` | — | `{ name, value, color? }` 조각 배열 |
| `innerRadius` | `number \| string` | `"60%"` | 안쪽 반지름. `0`이면 파이 |
| `outerRadius` | `number \| string` | `"80%"` | 바깥 반지름 |
| `height` | `number` | `300` | 높이(px) |
| `showLegend` | `boolean` | `true` | 범례 표시 |

## When to use

- 시계열·추세 → LineChart. 범주 비교 → BarChart. 구성비 → DonutChart(`innerRadius=0`이면 파이).
- 단일 지표 요약 카드는 [StatCard](../../..), 스파크라인·게이지 등은 후속 차트(M2/M3)에서 추가 예정.
