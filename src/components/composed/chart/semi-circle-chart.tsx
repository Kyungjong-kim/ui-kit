import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import { cn } from "../../../utils/cn";
import { seriesColor } from "./chart-shared";

/**
 * SemiCircleChart — recharts RadialBar 기반 반원(180°) 게이지.
 *
 * GaugeChart와 달리 아래쪽이 열린 반원 아크로 단일 값을 표시한다. `value`/`max`로
 * 채움 비율을 계산하고 배경 트랙 위에 값 아크를 그린다. 반원 하단 중앙에 값 텍스트를 겹친다.
 */

export interface SemiCircleChartProps {
  /** 현재 값 */
  value: number;
  /** 최대 값 — value/max로 채움 비율 산출 */
  max?: number;
  /** 아크 색 오버라이드 — 생략 시 팔레트 첫 색 */
  color?: string;
  /** 중앙 값 텍스트 표시 */
  showValue?: boolean;
  /** 차트 높이(px) — 너비는 반응형 */
  height?: number;
  className?: string;
}

export function SemiCircleChart({
  value,
  max = 100,
  color,
  showValue = true,
  height = 200,
  className,
}: SemiCircleChartProps) {
  const ratio = max > 0 ? Math.min(Math.max(value / max, 0), 1) : 0;
  const percent = Math.round(ratio * 100);
  const fill = color ?? seriesColor(0);
  const chartData = [{ name: "value", value }];

  return (
    <div className={cn("relative w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          data={chartData}
          startAngle={180}
          endAngle={0}
          innerRadius="70%"
          outerRadius="100%"
          cy="75%"
        >
          <PolarAngleAxis type="number" domain={[0, max]} tick={false} />
          <RadialBar
            dataKey="value"
            background={{ fill: "var(--color-bg-tertiary)" }}
            cornerRadius={999}
            fill={fill}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      {showValue && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-[15%] flex items-center justify-center text-2xl font-semibold text-[var(--color-text-primary)]"
          aria-hidden
        >
          {percent}%
        </div>
      )}
    </div>
  );
}

SemiCircleChart.displayName = "SemiCircleChart";
