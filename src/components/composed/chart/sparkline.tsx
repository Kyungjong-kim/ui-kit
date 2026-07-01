import { Area, AreaChart, Line, LineChart, ResponsiveContainer } from "recharts";
import { cn } from "../../../utils/cn";
import { seriesColor } from "./chart-shared";

/**
 * Sparkline — 축·그리드·범례 없는 초소형 인라인 라인 차트. 표 셀·카드 안 추세 표시용.
 *
 * 숫자 배열만 받아 추세선을 그린다. `variant="area"`면 선 아래를 반투명 면으로 채운다.
 * 반응형 컨테이너로 부모 크기에 맞춰 늘어난다.
 */

export interface SparklineProps {
  /** 값 배열 — 각 항목이 한 점 */
  data: number[];
  /** 표시 방식 — 선(line) 또는 면(area) */
  variant?: "line" | "area";
  /** 선/면 색 오버라이드 — 생략 시 팔레트 첫 색 */
  color?: string;
  /** 선 두께(px) */
  strokeWidth?: number;
  /** 차트 높이(px) — 너비는 반응형 */
  height?: number;
  className?: string;
}

export function Sparkline({
  data,
  variant = "line",
  color,
  strokeWidth = 2,
  height = 40,
  className,
}: SparklineProps) {
  const stroke = color ?? seriesColor(0);
  const chartData = data.map((value, index) => ({ index, value }));
  const margin = { top: 2, right: 2, bottom: 2, left: 2 };

  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {variant === "area" ? (
          <AreaChart data={chartData} margin={margin}>
            <Area
              type="monotone"
              dataKey="value"
              stroke={stroke}
              strokeWidth={strokeWidth}
              fill={stroke}
              fillOpacity={0.2}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        ) : (
          <LineChart data={chartData} margin={margin}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={stroke}
              strokeWidth={strokeWidth}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

Sparkline.displayName = "Sparkline";
