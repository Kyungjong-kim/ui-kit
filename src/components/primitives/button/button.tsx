import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../../utils/cn";
import { Spinner } from "../spinner/spinner";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-group-xs whitespace-nowrap",
    "rounded-xs",
    "typography-label-md-medium",
    "transition-[background-color,border-color,box-shadow,transform,opacity] duration-150 ease-out",
    "focus-ring",
    "active:scale-[0.98]",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--color-interactive-primary-bg)]",
          "text-[var(--color-interactive-primary-text)]",
          "hover:bg-[var(--color-interactive-primary-bg-hover)]",
        ],
        secondary: [
          "border border-[var(--color-interactive-secondary-border)]",
          "bg-[var(--color-interactive-secondary-bg)]",
          "text-[var(--color-interactive-secondary-text)]",
          "hover:bg-[var(--color-bg-secondary)] hover:border-[var(--color-border-strong)]",
        ],
        ghost: [
          "text-[var(--color-interactive-ghost-text)]",
          "hover:bg-[var(--color-interactive-ghost-bg-hover)]",
        ],
        destructive: [
          "bg-[var(--color-interactive-destructive-bg)]",
          "text-[var(--color-interactive-destructive-text)]",
          "hover:bg-[var(--color-interactive-destructive-bg-hover)]",
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
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const isInactive = Boolean(disabled || loading);
    // 링크 등 자식 요소에는 disabled 가 통하지 않는다 — aria-disabled 로 알리고 클릭을 막는다
    const blocksChild = asChild && isInactive;
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={asChild ? undefined : isInactive}
        aria-disabled={blocksChild || undefined}
        aria-busy={loading}
        onClick={blocksChild ? (event) => event.preventDefault() : onClick}
        {...props}
      >
        {loading && <Spinner size="sm" className="border-current border-t-current opacity-70" />}
        {/* asChild 일 때 Slot 이 이 자리의 자식 요소를 버튼으로 삼고, Spinner 는 그 안으로 넣는다 */}
        <Slottable>{children}</Slottable>
      </Comp>
    );
  },
);

Button.displayName = "Button";
