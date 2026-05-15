import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

const badgeVariants = cva("inline-flex items-center rounded-full transition-colors", {
  variants: {
    variant: {
      default: "bg-[var(--color-bg-brand-subtle)] text-[var(--color-text-brand-default)]",
      success: "bg-[var(--color-green-50)] text-[var(--color-green-700)]",
      warning: "bg-[var(--color-orange-50)] text-[var(--color-orange-700)]",
      danger: "bg-[var(--color-red-50)] text-[var(--color-red-600)]",
      info: "bg-[var(--color-bg-info-subtle)] text-[var(--color-text-info-default)]",
      outline:
        "border border-[var(--color-border-default)] text-[var(--color-text-secondary)]",
    },
    size: {
      sm: "px-inline-xs py-stack-xxs typography-label-xs",
      md: "px-inline-sm py-stack-xxs typography-label-sm-medium",
    },
  },
  defaultVariants: { variant: "default", size: "md" },
});

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}
