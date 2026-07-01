import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../../utils/cn";
import { Spinner } from "../spinner/spinner";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-group-xs",
    "rounded-sm",
    "typography-label-md-medium",
    "transition-[background-color,border-color,box-shadow,transform,opacity] duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-border-focus)]",
    "active:scale-[0.98]",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--color-interactive-primary-bg)]",
          "text-[var(--color-interactive-primary-text)]",
          "shadow-default-sm",
          "hover:bg-[var(--color-interactive-primary-bg-hover)] hover:shadow-default-md",
        ],
        secondary: [
          "border border-[var(--color-interactive-secondary-border)]",
          "bg-[var(--color-interactive-secondary-bg)]",
          "text-[var(--color-interactive-secondary-text)]",
          "shadow-default-sm",
          "hover:bg-[var(--color-bg-secondary)] hover:border-[var(--color-border-strong)]",
        ],
        ghost: [
          "text-[var(--color-interactive-ghost-text)]",
          "hover:bg-[var(--color-interactive-ghost-bg-hover)]",
        ],
        destructive: [
          "bg-[var(--color-interactive-destructive-bg)]",
          "text-[var(--color-interactive-destructive-text)]",
          "shadow-default-sm",
          "hover:bg-[var(--color-interactive-destructive-bg-hover)] hover:shadow-default-md",
          "destructive",
        ],
      },
      size: {
        sm: "h-size-control-sm px-inline-md typography-label-sm-medium",
        md: "h-size-control-md px-inline-lg",
        lg: "h-size-control-lg px-inline-xxl typography-label-lg-medium",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, disabled, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && <Spinner size="sm" className="border-current border-t-current opacity-70" />}
        {children}
      </Comp>
    );
  },
);

Button.displayName = "Button";
