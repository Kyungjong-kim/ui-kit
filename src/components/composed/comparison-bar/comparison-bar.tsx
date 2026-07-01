import { cn } from "../../../utils/cn";
import { Text } from "../../primitives/text";

/**
 * ComparisonBar — 두 값 비교 수평 막대.
 *
 * 좌/우 두 값의 합을 100%로 나눠 하나의 막대를 두 세그먼트로 채운다.
 * A/B 비교·할당 대비 사용 등 두 값의 상대 비중을 한 줄로 나타낼 때 사용.
 */

export interface ComparisonBarValue {
  /** 세그먼트 라벨 */
  label: string;
  /** 세그먼트 값 (음수는 0으로 클램프) */
  value: number;
}

export type ComparisonBarTone = "brand" | "blue" | "green" | "neutral";

export interface ComparisonBarProps {
  /** 왼쪽 세그먼트 */
  left: ComparisonBarValue;
  /** 오른쪽 세그먼트 */
  right: ComparisonBarValue;
  /** 왼쪽 세그먼트 색 톤 (기본 brand) */
  leftTone?: ComparisonBarTone;
  /** 오른쪽 세그먼트 색 톤 (기본 neutral) */
  rightTone?: ComparisonBarTone;
  /** 값 표시 포맷터 — 기본 그대로 문자열화 */
  valueFormatter?: (value: number) => string;
  className?: string;
}

const SEGMENT_COLOR: Record<ComparisonBarTone, string> = {
  brand: "bg-[var(--color-brand-400)]",
  blue: "bg-[var(--color-blue-400)]",
  green: "bg-[var(--color-green-400)]",
  neutral: "bg-[var(--color-neutral-300)]",
};

function clampNonNegative(value: number): number {
  return value < 0 ? 0 : value;
}

export function ComparisonBar({
  left,
  right,
  leftTone = "brand",
  rightTone = "neutral",
  valueFormatter,
  className,
}: ComparisonBarProps) {
  const leftValue = clampNonNegative(left.value);
  const rightValue = clampNonNegative(right.value);
  const total = leftValue + rightValue;
  const leftPercent = total > 0 ? (leftValue / total) * 100 : 0;
  const rightPercent = total > 0 ? 100 - leftPercent : 0;
  const formatValue = valueFormatter ?? ((value: number) => String(value));

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span className={cn("size-2 rounded-full", SEGMENT_COLOR[leftTone])} />
          <Text variant="typography-label-sm-medium" className="text-[var(--color-text-primary)]">
            {left.label}
          </Text>
          <Text
            variant="typography-label-sm-base"
            className="tabular-nums text-[var(--color-text-tertiary)]"
          >
            {formatValue(left.value)}
          </Text>
        </span>
        <span className="flex items-center gap-1.5">
          <Text
            variant="typography-label-sm-base"
            className="tabular-nums text-[var(--color-text-tertiary)]"
          >
            {formatValue(right.value)}
          </Text>
          <Text variant="typography-label-sm-medium" className="text-[var(--color-text-primary)]">
            {right.label}
          </Text>
          <span className={cn("size-2 rounded-full", SEGMENT_COLOR[rightTone])} />
        </span>
      </div>
      <div className="flex h-[8px] w-full overflow-hidden rounded-full bg-[var(--color-bg-tertiary)]">
        <div
          title={left.label}
          className={cn("h-full", SEGMENT_COLOR[leftTone])}
          style={{ width: `${leftPercent}%` }}
        />
        <div
          title={right.label}
          className={cn("h-full", SEGMENT_COLOR[rightTone])}
          style={{ width: `${rightPercent}%` }}
        />
      </div>
    </div>
  );
}

ComparisonBar.displayName = "ComparisonBar";
