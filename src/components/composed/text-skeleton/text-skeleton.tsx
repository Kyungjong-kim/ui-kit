import { cn } from "../../../utils/cn";

type Size = "sm" | "md";

export interface TextSkeletonProps {
  className?: string;
  width?: number;
  size?: Size;
  style?: React.CSSProperties;
}

export function TextSkeleton({ className, width = 100, size = "md", style }: TextSkeletonProps) {
  const sizeClassName = size === "sm" ? "h-[12px]" : "h-[20px]";
  const widthStyle = { width: `${Math.min(100, Math.max(0, width))}%` };

  return (
    <div
      className={cn(
        "animate-pulse bg-[var(--color-neutral-200)]",
        "rounded-xxs",
        sizeClassName,
        className,
      )}
      style={{ ...style, ...widthStyle }}
    />
  );
}
