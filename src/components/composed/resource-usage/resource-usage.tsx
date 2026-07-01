import { cn } from "../../../utils/cn";
import { Text } from "../../primitives/text";

/**
 * ResourceUsage — 단일 리소스 사용률 바.
 *
 * current/max 비율을 진행바로 표시하고, 임계값(warning·danger)에 따라 막대 색을 자동 결정한다.
 * CPU·메모리·저장공간 등 사용률 지표를 순수 CSS 막대로 나타낼 때 사용.
 */

export interface ResourceUsageProps {
  /** 리소스 라벨 (예: 'CPU', '메모리') */
  label: string;
  /** 현재 사용량 (0 미만은 0으로 클램프) */
  current: number;
  /** 최대 용량 (0 이하는 무효 → 비율 0%) */
  max: number;
  /** 사용량 단위 (예: 'GB', 'vCPU') — 생략 시 % 만 표시 */
  unit?: string;
  /** warning 톤 전환 비율(%) 기본 70 */
  warningThreshold?: number;
  /** danger 톤 전환 비율(%) 기본 90 */
  dangerThreshold?: number;
  className?: string;
}

type UsageTone = "success" | "warning" | "danger";

const BAR_COLOR: Record<UsageTone, string> = {
  success: "bg-[var(--color-bg-success-default)]",
  warning: "bg-[var(--color-bg-warning-default)]",
  danger: "bg-[var(--color-bg-danger-default)]",
};

function clampNonNegative(value: number): number {
  return value < 0 ? 0 : value;
}

function resolveTone(percent: number, warning: number, danger: number): UsageTone {
  if (percent >= danger) return "danger";
  if (percent >= warning) return "warning";
  return "success";
}

export function ResourceUsage({
  label,
  current,
  max,
  unit,
  warningThreshold = 70,
  dangerThreshold = 90,
  className,
}: ResourceUsageProps) {
  const safeCurrent = clampNonNegative(current);
  const percent = max > 0 ? Math.min(100, (safeCurrent / max) * 100) : 0;
  const roundedPercent = Math.round(percent);
  const tone = resolveTone(percent, warningThreshold, dangerThreshold);

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between">
        <Text variant="typography-label-sm-medium" className="text-[var(--color-text-secondary)]">
          {label}
        </Text>
        <Text
          variant="typography-label-sm-base"
          className="tabular-nums text-[var(--color-text-tertiary)]"
        >
          {unit ? `${safeCurrent} / ${max} ${unit}` : `${roundedPercent}%`}
        </Text>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={roundedPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-[6px] w-full overflow-hidden rounded-full bg-[var(--color-bg-tertiary)]"
      >
        <div
          className={cn("h-full rounded-full transition-[width] duration-300", BAR_COLOR[tone])}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

ResourceUsage.displayName = "ResourceUsage";
