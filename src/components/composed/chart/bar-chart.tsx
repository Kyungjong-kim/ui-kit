import {
  Bar,
  CartesianGrid,
  Legend,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "../../../utils/cn";
import {
  CHART_AXIS_COLOR,
  CHART_GRID_COLOR,
  CHART_TOOLTIP_STYLE,
  type ChartSeries,
  seriesColor,
} from "./chart-shared";

/**
 * BarChart — recharts 기반 막대 차트. DS 토큰으로 축·그리드·시리즈 색을 칠한다.
 *
 * 다중 시리즈는 기본 그룹(병렬), `stacked`로 누적 막대로 전환한다.
 */

export interface BarChartProps {
  /** 데이터 배열(각 항목 = X축 한 그룹) */
  data: Record<string, unknown>[];
  /** X축으로 쓸 데이터 키 */
  xKey: string;
  /** 막대 시리즈 정의(1개 이상) */
  series: ChartSeries[];
  /** 누적 막대 여부 */
  stacked?: boolean;
  /** 차트 높이(px) — 너비는 반응형 */
  height?: number;
  /** 범례 표시 */
  showLegend?: boolean;
  /** 그리드 표시 */
  showGrid?: boolean;
  className?: string;
}

export function BarChart({
  data,
  xKey,
  series,
  stacked = false,
  height = 300,
  showLegend = true,
  showGrid = true,
  className,
}: BarChartProps) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_COLOR} />}
          <XAxis
            dataKey={xKey}
            stroke={CHART_AXIS_COLOR}
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <YAxis stroke={CHART_AXIS_COLOR} tick={{ fontSize: 12 }} tickLine={false} />
          <Tooltip
            contentStyle={CHART_TOOLTIP_STYLE}
            cursor={{ fill: CHART_GRID_COLOR, opacity: 0.3 }}
          />
          {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
          {series.map((s, i) => (
            <Bar
              key={s.dataKey}
              dataKey={s.dataKey}
              name={s.name ?? s.dataKey}
              fill={s.color ?? seriesColor(i)}
              stackId={stacked ? "stack" : undefined}
              radius={stacked ? undefined : [4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

BarChart.displayName = "BarChart";
