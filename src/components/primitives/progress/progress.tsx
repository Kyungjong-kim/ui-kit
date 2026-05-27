import * as ProgressPrimitive from "@radix-ui/react-progress";
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

  return (
    <div className={cn("flex w-full flex-col gap-group-xs", className)}>
      {(label || (showValue && !isIndeterminate)) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="typography-label-md-medium text-[var(--color-text-primary)]">
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
          "shadow-[inset_0_1px_2px_rgba(20,18,16,0.08)]",
          size === "sm" ? "h-stack-xxs" : "h-stack-xs",
        )}
        value={value ?? null}
        max={max}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full rounded-full bg-gradient-to-r from-[var(--color-brand-400)] to-[var(--color-bg-brand-hover)] transition-transform duration-500 ease-out",
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
