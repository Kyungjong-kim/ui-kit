import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../../../utils/cn";

export interface ProgressProps {
  value?: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
}

export function Progress({ value, max = 100, size = "md", className }: ProgressProps) {
  const isIndeterminate = value == null;
  const safeMax = max > 0 ? max : 100;
  const percentage = isIndeterminate ? null : Math.min(100, Math.max(0, (value / safeMax) * 100));

  return (
    <ProgressPrimitive.Root
      className={cn(
        "relative w-full overflow-hidden rounded-full bg-[var(--color-bg-tertiary)]",
        size === "sm" ? "h-stack-xxs" : "h-stack-xs",
        className,
      )}
      value={value ?? null}
      max={max}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full bg-[var(--color-bg-brand-default)] transition-transform duration-300 ease-in-out",
          isIndeterminate && "w-1/3 animate-progress-indeterminate",
        )}
        style={
          isIndeterminate ? undefined : { transform: `translateX(-${100 - (percentage ?? 0)}%)` }
        }
      />
    </ProgressPrimitive.Root>
  );
}

Progress.displayName = "Progress";
