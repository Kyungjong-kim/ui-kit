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
 * PieChart — recharts 기반 파이 차트. 각 조각을 DS 팔레트 색으로 칠한다.
 *
 * 도넛 형태가 필요하면 DonutChart를 쓴다(PieChart는 꽉 찬 원). `showLabel`로
 * 조각 위에 값 라벨을 표시한다. 데이터는 이름·값 쌍 배열.
 */

export interface PieDatum {
  /** 조각 라벨 */
  name: string;
  /** 조각 값 */
  value: number;
  /** 색 오버라이드 — 생략 시 팔레트 순환 */
  color?: string;
}

export interface PieChartProps {
  /** 조각 데이터 */
  data: PieDatum[];
  /** 바깥 반지름(px 또는 %) */
  outerRadius?: number | string;
  /** 조각 값 라벨 표시 */
  showLabel?: boolean;
  /** 차트 높이(px) — 너비는 반응형 */
  height?: number;
  /** 범례 표시 */
  showLegend?: boolean;
  className?: string;
}

export function PieChart({
  data,
  outerRadius = "80%",
  showLabel = false,
  height = 300,
  showLegend = true,
  className,
}: PieChartProps) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={0}
            outerRadius={outerRadius}
            label={showLabel ? { fontSize: 12 } : undefined}
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

PieChart.displayName = "PieChart";
