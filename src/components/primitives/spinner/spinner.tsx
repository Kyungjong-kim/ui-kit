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
          "h-4 w-4": size === "sm",
          "h-6 w-6": size === "md",
          "h-8 w-8": size === "lg",
        },
        className,
      )}
    />
  );
}
