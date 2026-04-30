import { cn } from "../../../utils/cn";

export interface SkeletonProps {
  className?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}

export function Skeleton({ className, rounded = "md" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-[var(--color-neutral-200)]",
        {
          "rounded-none": rounded === "none",
          "rounded-sm": rounded === "sm",
          "rounded-md": rounded === "md",
          "rounded-lg": rounded === "lg",
          "rounded-full": rounded === "full",
        },
        className,
      )}
    />
  );
}
