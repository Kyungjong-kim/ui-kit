import {
  Area,
  CartesianGrid,
  Legend,
  AreaChart as RechartsAreaChart,
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
 * AreaChart — recharts 기반 영역 차트. DS 토큰으로 축·그리드·시리즈 색을 칠한다.
 *
 * 다중 시리즈는 기본 겹침(overlap), `stacked`로 누적 영역으로 전환한다.
 * 각 시리즈는 stroke(선)와 반투명 fill(면)을 같은 팔레트 색으로 칠한다.
 */

export interface AreaChartProps {
  /** 데이터 배열(각 항목 = X축 한 점) */
  data: Record<string, unknown>[];
  /** X축으로 쓸 데이터 키 */
  xKey: string;
  /** 영역 시리즈 정의(1개 이상) */
  series: ChartSeries[];
  /** 누적 영역 여부 */
  stacked?: boolean;
  /** 차트 높이(px) — 너비는 반응형 */
  height?: number;
  /** 범례 표시 */
  showLegend?: boolean;
  /** 그리드 표시 */
  showGrid?: boolean;
  className?: string;
}

export function AreaChart({
  data,
  xKey,
  series,
  stacked = false,
  height = 300,
  showLegend = true,
  showGrid = true,
  className,
}: AreaChartProps) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_COLOR} />}
          <XAxis
            dataKey={xKey}
            stroke={CHART_AXIS_COLOR}
            tick={{ fontSize: 12 }}
            tickLine={false}
          />
          <YAxis stroke={CHART_AXIS_COLOR} tick={{ fontSize: 12 }} tickLine={false} />
          <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
          {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
          {series.map((s, i) => {
            const color = s.color ?? seriesColor(i);
            return (
              <Area
                key={s.dataKey}
                type="monotone"
                dataKey={s.dataKey}
                name={s.name ?? s.dataKey}
                stroke={color}
                fill={color}
                fillOpacity={0.2}
                strokeWidth={2}
                stackId={stacked ? "stack" : undefined}
              />
            );
          })}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}

AreaChart.displayName = "AreaChart";
