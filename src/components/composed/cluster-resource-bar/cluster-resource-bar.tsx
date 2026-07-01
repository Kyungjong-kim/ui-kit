import { cn } from "../../../utils/cn";
import { Text } from "../../primitives/text";

/**
 * ClusterResourceBar — 다중 세그먼트 누적 바 + 범례.
 *
 * 여러 항목 값을 합 대비 비율로 하나의 가로 막대에 누적하고, 하단에 색·라벨·값 범례를 나열한다.
 * 클러스터 노드별 리소스 점유·네임스페이스별 할당 등 구성 비중을 나타낼 때 사용.
 */

export type ClusterSegmentTone = "brand" | "blue" | "green" | "orange" | "red" | "neutral";

export interface ClusterResourceSegment {
  /** 세그먼트 라벨 */
  label: string;
  /** 세그먼트 값 (음수는 0으로 클램프) */
  value: number;
  /** 세그먼트 색 톤 */
  tone: ClusterSegmentTone;
}

export interface ClusterResourceBarProps {
  /** 누적 표시할 세그먼트 목록 */
  segments: ClusterResourceSegment[];
  /** 범례 표시 여부 (기본 true) */
  showLegend?: boolean;
  /** 값 표시 포맷터 — 기본 그대로 문자열화 */
  valueFormatter?: (value: number) => string;
  className?: string;
}

const SEGMENT_COLOR: Record<ClusterSegmentTone, string> = {
  brand: "bg-[var(--color-brand-400)]",
  blue: "bg-[var(--color-blue-400)]",
  green: "bg-[var(--color-green-400)]",
  orange: "bg-[var(--color-orange-400)]",
  red: "bg-[var(--color-red-400)]",
  neutral: "bg-[var(--color-neutral-300)]",
};

function clampNonNegative(value: number): number {
  return value < 0 ? 0 : value;
}

export function ClusterResourceBar({
  segments,
  showLegend = true,
  valueFormatter,
  className,
}: ClusterResourceBarProps) {
  const safeValues = segments.map((segment) => clampNonNegative(segment.value));
  const total = safeValues.reduce((sum, value) => sum + value, 0);
  const formatValue = valueFormatter ?? ((value: number) => String(value));

  return (
    <div className={cn("flex w-full flex-col gap-3", className)}>
      <div className="flex h-[10px] w-full overflow-hidden rounded-full bg-[var(--color-bg-tertiary)]">
        {segments.map((segment, index) => {
          const percent = total > 0 ? (safeValues[index] / total) * 100 : 0;
          return (
            <div
              key={segment.label}
              title={segment.label}
              className={cn("h-full", SEGMENT_COLOR[segment.tone])}
              style={{ width: `${percent}%` }}
            />
          );
        })}
      </div>

      {showLegend && (
        <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
          {segments.map((segment) => (
            <li key={segment.label} className="flex items-center gap-1.5">
              <span className={cn("size-2 rounded-full", SEGMENT_COLOR[segment.tone])} />
              <Text
                variant="typography-label-sm-medium"
                className="text-[var(--color-text-secondary)]"
              >
                {segment.label}
              </Text>
              <Text
                variant="typography-label-sm-base"
                className="tabular-nums text-[var(--color-text-tertiary)]"
              >
                {formatValue(segment.value)}
              </Text>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

ClusterResourceBar.displayName = "ClusterResourceBar";
