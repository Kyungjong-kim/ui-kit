import * as Label from "@radix-ui/react-label";
import { forwardRef, type InputHTMLAttributes, useId } from "react";
import { cn } from "../../../utils/cn";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
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
      <div className="flex flex-col gap-group-xs">
        {label && (
          <Label.Root
            htmlFor={inputId}
            className="typography-label-md-medium text-[var(--color-text-primary)]"
          >
            {label}
          </Label.Root>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "w-full rounded-sm border bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] transition-[border-color,box-shadow]",
            "focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--color-border-focus)] focus:border-[var(--color-border-focus)]",
            "disabled:cursor-not-allowed disabled:bg-[var(--color-bg-disabled)] disabled:text-[var(--color-text-disabled)]",
            error
              ? "border-[var(--color-border-danger-default)]"
              : "border-[var(--color-border-default)]",
            {
              "h-size-control-sm px-inline-sm typography-label-sm-base": size === "sm",
              "h-size-control-md px-inline-md typography-label-md-base": size === "md",
              "h-size-control-lg px-inline-lg typography-label-lg-base": size === "lg",
            },
            className,
          )}
          {...props}
        />
        {helperText && (
          <p
            className={cn(
              "typography-caption",
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
