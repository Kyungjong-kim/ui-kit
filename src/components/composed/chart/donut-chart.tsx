import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { cn } from "../../../utils/cn";
import { CHART_TOOLTIP_STYLE, seriesColor } from "./chart-shared";

/**
 * DonutChart — recharts 기반 도넛 차트. 각 조각을 DS 팔레트 색으로 칠한다.
 *
 * `innerRadius`로 도넛/파이를 조절한다(0이면 파이). 데이터는 이름·값 쌍 배열.
 */

export interface DonutDatum {
  /** 조각 라벨 */
  name: string;
  /** 조각 값 */
  value: number;
  /** 색 오버라이드 — 생략 시 팔레트 순환 */
  color?: string;
}

export interface DonutChartProps {
  /** 조각 데이터 */
  data: DonutDatum[];
  /** 안쪽 반지름(px 또는 %) — 0이면 파이 차트 */
  innerRadius?: number | string;
  /** 바깥 반지름(px 또는 %) */
  outerRadius?: number | string;
  /** 차트 높이(px) — 너비는 반응형 */
  height?: number;
  /** 범례 표시 */
  showLegend?: boolean;
  className?: string;
}

export function DonutChart({
  data,
  innerRadius = "60%",
  outerRadius = "80%",
  height = 300,
  showLegend = true,
  className,
}: DonutChartProps) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={1}
          >
            {data.map((datum, i) => (
              <Cell key={datum.name} fill={datum.color ?? seriesColor(i)} />
            ))}
          </Pie>
          <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
          {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}

DonutChart.displayName = "DonutChart";
