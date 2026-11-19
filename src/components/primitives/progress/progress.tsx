import * as ProgressPrimitive from "@radix-ui/react-progress";
import { useId } from "react";
import { cn } from "../../../utils/cn";

export interface ProgressProps {
  value?: number;
  max?: number;
  size?: "sm" | "md";
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function Progress({
  value,
  max = 100,
  size = "md",
  label,
  showValue,
  className,
}: ProgressProps) {
  const isIndeterminate = value == null;
  const safeMax = max > 0 ? max : 100;
  const percentage = isIndeterminate ? null : Math.min(100, Math.max(0, (value / safeMax) * 100));
  // Radix 는 범위 밖 value 를 버리고 indeterminate 로 바꾼다 — 시각과 같은 값으로 잘라 넘긴다
  const clampedValue = isIndeterminate ? null : Math.min(safeMax, Math.max(0, value));
  const labelId = `${useId()}-label`;

  return (
    <div className={cn("flex w-full flex-col gap-group-xs", className)}>
      {(label || (showValue && !isIndeterminate)) && (
        <div className="flex items-center justify-between">
          {label && (
            <span
              id={labelId}
              className="typography-label-md-medium text-[var(--color-text-primary)]"
            >
              {label}
            </span>
          )}
          {showValue && !isIndeterminate && (
            <span className="tabular-nums typography-label-sm-medium text-[var(--color-text-secondary)]">
              {Math.round(percentage ?? 0)}%
            </span>
          )}
        </div>
      )}
      <ProgressPrimitive.Root
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-[var(--color-bg-tertiary)]",
          size === "sm" ? "h-stack-xxs" : "h-stack-xs",
        )}
        value={clampedValue}
        max={safeMax}
        aria-labelledby={label ? labelId : undefined}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full rounded-full bg-gradient-to-r from-[var(--color-bg-brand-default)] to-[var(--color-bg-brand-hover)] transition-transform duration-500 ease-out",
            isIndeterminate && "w-1/3 animate-progress-indeterminate",
          )}
          style={
            isIndeterminate ? undefined : { transform: `translateX(-${100 - (percentage ?? 0)}%)` }
          }
        />
      </ProgressPrimitive.Root>
    </div>
  );
}

Progress.displayName = "Progress";
