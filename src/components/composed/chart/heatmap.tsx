import { cn } from "../../../utils/cn";

/**
 * Heatmap — 자체 SVG grid 기반 히트맵. recharts에 없는 행렬형 밀도 시각화를 담당한다.
 *
 * `data`는 행(row) × 열(col) 값 행렬이다. 각 셀 값을 [min,max] 범위로 정규화해
 * 단색 브랜드 색의 명도(alpha)로 매핑한다. 축 라벨(`xLabels`/`yLabels`)은 선택.
 * 색은 DS 색 토큰 위에 opacity를 얹어 표현한다(값이 클수록 진함).
 */

export interface HeatmapProps {
  /** 행 × 열 숫자 행렬 — data[row][col] */
  data: number[][];
  /** 열(가로) 라벨 — 길이는 열 개수와 일치 */
  xLabels?: string[];
  /** 행(세로) 라벨 — 길이는 행 개수와 일치 */
  yLabels?: string[];
  /** 셀 한 변 크기(px) */
  cellSize?: number;
  /** 셀 간격(px) */
  cellGap?: number;
  /** 셀 기본 색 — 값 크기에 따라 opacity로 명도 조절 */
  color?: string;
  /** 셀에 값 텍스트 표시 */
  showValues?: boolean;
  className?: string;
}

export function Heatmap({
  data,
  xLabels,
  yLabels,
  cellSize = 32,
  cellGap = 4,
  color = "var(--color-chart-1)",
  showValues = false,
  className,
}: HeatmapProps) {
  const rows = data.length;
  const cols = rows > 0 ? Math.max(...data.map((r) => r.length)) : 0;

  const flat = data.flat();
  const min = flat.length > 0 ? Math.min(...flat) : 0;
  const max = flat.length > 0 ? Math.max(...flat) : 0;
  const span = max - min;

  const yLabelWidth = yLabels ? 48 : 0;
  const xLabelHeight = xLabels ? 20 : 0;
  const step = cellSize + cellGap;
  const gridWidth = cols * step - cellGap;
  const gridHeight = rows * step - cellGap;
  const svgWidth = yLabelWidth + gridWidth;
  const svgHeight = xLabelHeight + gridHeight;

  /** 값 → [0.08, 1] opacity(값이 클수록 진함, 균일 시 중간값) */
  function intensity(value: number): number {
    if (span === 0) return 0.5;
    return 0.08 + ((value - min) / span) * 0.92;
  }

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        role="img"
        aria-label="heatmap"
      >
        {yLabels?.map((label, r) => (
          <text
            key={`y-${label}`}
            x={yLabelWidth - 8}
            y={xLabelHeight + r * step + cellSize / 2}
            textAnchor="end"
            dominantBaseline="central"
            fontSize={11}
            fill="var(--color-text-tertiary)"
          >
            {label}
          </text>
        ))}
        {xLabels?.map((label, c) => (
          <text
            key={`x-${label}`}
            x={yLabelWidth + c * step + cellSize / 2}
            y={xLabelHeight - 6}
            textAnchor="middle"
            fontSize={11}
            fill="var(--color-text-tertiary)"
          >
            {label}
          </text>
        ))}
        {data.map((row, r) =>
          row.map((value, c) => {
            const x = yLabelWidth + c * step;
            const y = xLabelHeight + r * step;
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: 히트맵은 행×열 고정 격자 — 셀 좌표(r,c)가 곧 안정 식별자
              <g key={`cell-${r}-${c}`}>
                <rect
                  x={x}
                  y={y}
                  width={cellSize}
                  height={cellSize}
                  rx={4}
                  fill={color}
                  fillOpacity={intensity(value)}
                />
                {showValues && (
                  <text
                    x={x + cellSize / 2}
                    y={y + cellSize / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={11}
                    fill="var(--color-text-primary)"
                  >
                    {value}
                  </text>
                )}
              </g>
            );
          }),
        )}
      </svg>
    </div>
  );
}

Heatmap.displayName = "Heatmap";
