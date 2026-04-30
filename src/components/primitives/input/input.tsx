import * as Label from "@radix-ui/react-label";
import { type InputHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "../../../utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
  size?: "sm" | "md" | "lg";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, size = "md", id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <Label.Root
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--color-text-primary)]"
          >
            {label}
          </Label.Root>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "w-full rounded-md border bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)] focus:border-[var(--color-border-focus)]",
            "disabled:cursor-not-allowed disabled:bg-[var(--color-bg-disabled)] disabled:text-[var(--color-text-disabled)]",
            error
              ? "border-[var(--color-border-danger-default)]"
              : "border-[var(--color-border-default)]",
            {
              "h-8 px-2.5 text-xs": size === "sm",
              "h-9 px-3 text-sm": size === "md",
              "h-11 px-4 text-base": size === "lg",
            },
            className,
          )}
          {...props}
        />
        {helperText && (
          <p
            className={cn(
              "text-xs",
              error
                ? "text-[var(--color-text-danger-default)]"
                : "text-[var(--color-text-tertiary)]",
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
