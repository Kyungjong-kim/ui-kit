import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

const tagVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-bg-brand-subtle)] text-[var(--color-text-brand-default)]",
        info: "bg-[var(--color-bg-info-subtle)] text-[var(--color-text-info-default)]",
        success: "bg-[var(--color-bg-success-subtle)] text-[var(--color-text-success-default)]",
        warning: "bg-[var(--color-bg-warning-subtle)] text-[var(--color-text-warning-default)]",
        danger: "bg-[var(--color-bg-danger-subtle)] text-[var(--color-text-danger-default)]",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-sm",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export interface TagProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  onRemove?: () => void;
}

export function Tag({ className, variant, size, onRemove, children, ...props }: TagProps) {
  return (
    <span className={cn(tagVariants({ variant, size }), className)} {...props}>
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
