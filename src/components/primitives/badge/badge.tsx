import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

const badgeVariants = cva("inline-flex items-center rounded-full transition-colors", {
  variants: {
    variant: {
      default: "bg-[var(--color-bg-brand-subtle)] text-[var(--color-text-brand-default)]",
      success: "bg-[var(--color-bg-success-subtle)] text-[var(--color-text-success-strong)]",
      warning: "bg-[var(--color-bg-warning-subtle)] text-[var(--color-text-warning-strong)]",
      danger: "bg-[var(--color-bg-danger-subtle)] text-[var(--color-text-danger-strong)]",
      info: "bg-[var(--color-bg-info-subtle)] text-[var(--color-text-info-default)]",
      outline: "border border-[var(--color-border-default)] text-[var(--color-text-secondary)]",
    },
    appearance: {
      subtle: "",
      solid: "text-[var(--color-text-inverse)]",
    },
    size: {
      sm: "px-inline-xs py-stack-xxs typography-label-xs",
      md: "px-inline-sm py-stack-xxs typography-label-sm-medium",
    },
  },
  compoundVariants: [
    { variant: "default", appearance: "solid", className: "bg-[var(--color-bg-brand-default)]" },
    { variant: "success", appearance: "solid", className: "bg-[var(--color-bg-success-default)]" },
    { variant: "warning", appearance: "solid", className: "bg-[var(--color-bg-warning-default)]" },
    { variant: "danger", appearance: "solid", className: "bg-[var(--color-bg-danger-default)]" },
    { variant: "info", appearance: "solid", className: "bg-[var(--color-bg-info-default)]" },
    // outline은 톤 배경이 없어 solid가 성립하지 않음 — subtle 스타일 유지
    { variant: "outline", appearance: "solid", className: "text-[var(--color-text-secondary)]" },
  ],
  defaultVariants: { variant: "default", appearance: "subtle", size: "md" },
});

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, appearance, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, appearance, size }), className)} {...props} />
  );
}

Badge.displayName = "Badge";
