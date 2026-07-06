import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

const tagVariants = cva("inline-flex items-center gap-group-xxs rounded-full transition-colors", {
  variants: {
    variant: {
      default: "bg-[var(--color-bg-brand-subtle)] text-[var(--color-text-brand-default)]",
      info: "bg-[var(--color-bg-info-subtle)] text-[var(--color-text-info-default)]",
      success: "bg-[var(--color-bg-success-subtle)] text-[var(--color-text-success-default)]",
      warning: "bg-[var(--color-bg-warning-subtle)] text-[var(--color-text-warning-default)]",
      danger: "bg-[var(--color-bg-danger-subtle)] text-[var(--color-text-danger-default)]",
    },
    appearance: {
      subtle: "",
      solid: "text-[var(--color-text-inverse)]",
    },
    size: {
      sm: "px-inline-xs py-stack-xxs typography-label-xs",
      md: "px-inline-sm py-stack-xs typography-label-sm-medium",
    },
  },
  compoundVariants: [
    { variant: "default", appearance: "solid", className: "bg-[var(--color-bg-brand-default)]" },
    { variant: "info", appearance: "solid", className: "bg-[var(--color-bg-info-default)]" },
    { variant: "success", appearance: "solid", className: "bg-[var(--color-bg-success-default)]" },
    { variant: "warning", appearance: "solid", className: "bg-[var(--color-bg-warning-default)]" },
    { variant: "danger", appearance: "solid", className: "bg-[var(--color-bg-danger-default)]" },
  ],
  defaultVariants: { variant: "default", appearance: "subtle", size: "md" },
});

export interface TagProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  onRemove?: () => void;
}

export function Tag({
  className,
  variant,
  appearance,
  size,
  onRemove,
  children,
  ...props
}: TagProps) {
  return (
    <span className={cn(tagVariants({ variant, appearance, size }), className)} {...props}>
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="제거"
          className="ml-0.5 flex items-center justify-center rounded-full opacity-60 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M9 3L3 9M3 3l6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </span>
  );
}

Tag.displayName = "Tag";
