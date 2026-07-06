import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
  Tooltip,
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
 * RadarChart — recharts 기반 레이더(방사형) 차트. DS 토큰으로 그리드·축·시리즈 색을 칠한다.
 *
 * 다중 시리즈를 겹쳐 그린다. 각 축은 `angleKey`(항목명)로 구분하고, 시리즈는
 * stroke(선)와 반투명 fill(면)을 같은 팔레트 색으로 칠한다.
 */

export interface RadarChartProps {
  /** 데이터 배열(각 항목 = 축 한 개) */
  data: Record<string, unknown>[];
  /** 각 축의 라벨로 쓸 데이터 키 */
  angleKey: string;
  /** 레이더 시리즈 정의(1개 이상) */
  series: ChartSeries[];
  /** 차트 높이(px) — 너비는 반응형 */
  height?: number;
  /** 범례 표시 */
  showLegend?: boolean;
  className?: string;
}

export function RadarChart({
  data,
  angleKey,
  series,
  height = 300,
  showLegend = true,
  className,
}: RadarChartProps) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 16 }}>
          <PolarGrid stroke={CHART_GRID_COLOR} />
          <PolarAngleAxis dataKey={angleKey} stroke={CHART_AXIS_COLOR} tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
          {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
          {series.map((s, i) => {
            const color = s.color ?? seriesColor(i);
            return (
              <Radar
                key={s.dataKey}
                dataKey={s.dataKey}
                name={s.name ?? s.dataKey}
                stroke={color}
                fill={color}
                fillOpacity={0.2}
                strokeWidth={2}
              />
            );
          })}
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}

RadarChart.displayName = "RadarChart";
