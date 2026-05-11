import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface MultilineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  asChild?: boolean;
}

export function MultilineButton({ className, children, disabled, ...rest }: MultilineButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "inline-flex items-start justify-center rounded-md transition-colors",
        "bg-[var(--color-interactive-secondary-bg)] border border-[var(--color-interactive-secondary-border)]",
        "hover:bg-[var(--color-bg-secondary)] disabled:pointer-events-none disabled:opacity-50",
        "h-auto max-h-[56px] min-h-[36px] max-w-full min-w-0 px-4 py-2",
        className,
      )}
      {...rest}
    >
      <span className="line-clamp-2 whitespace-normal typography-label-md-base text-text-primary text-left">
        {children}
      </span>
    </button>
  );
}

MultilineButton.displayName = "MultilineButton";
