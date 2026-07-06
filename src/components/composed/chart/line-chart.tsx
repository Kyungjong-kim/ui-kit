import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
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
 * LineChart — recharts 기반 꺾은선 차트. DS 토큰으로 축·그리드·시리즈 색을 칠한다.
 *
 * 다중 시리즈(`series`)를 지원하며, 반응형 컨테이너로 부모 너비에 맞춰 렌더한다.
 */

export interface LineChartProps {
  /** 데이터 배열(각 항목 = X축 한 점) */
  data: Record<string, unknown>[];
  /** X축으로 쓸 데이터 키 */
  xKey: string;
  /** 라인 시리즈 정의(1개 이상) */
  series: ChartSeries[];
  /** 차트 높이(px) — 너비는 반응형 */
  height?: number;
  /** 범례 표시 */
  showLegend?: boolean;
  /** 그리드 표시 */
  showGrid?: boolean;
  className?: string;
}

export function LineChart({
  data,
  xKey,
  series,
  height = 300,
  showLegend = true,
  showGrid = true,
  className,
}: LineChartProps) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
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
          {series.map((s, i) => (
            <Line
              key={s.dataKey}
              type="monotone"
              dataKey={s.dataKey}
              name={s.name ?? s.dataKey}
              stroke={s.color ?? seriesColor(i)}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

LineChart.displayName = "LineChart";
