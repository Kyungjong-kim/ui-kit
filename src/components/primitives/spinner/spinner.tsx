import { cn } from "../../../utils/cn";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="로딩 중"
      className={cn(
        "animate-spin rounded-full border-2 border-[var(--color-border-default)] border-t-[var(--color-bg-brand-default)]",
        {
          "h-size-icon-sm w-size-icon-sm": size === "sm",
          "h-size-icon-lg w-size-icon-lg": size === "md",
          "h-size-icon-xl w-size-icon-xl": size === "lg",
        },
        className,
      )}
    />
  );
}
