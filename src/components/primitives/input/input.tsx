import * as Label from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type InputHTMLAttributes, useId } from "react";
import { cn } from "../../../utils/cn";
import { joinIds } from "../../../utils/join-ids";
import { FieldHelperText } from "../../_internal/field-helper-text";

const inputVariants = cva(
  [
    "w-size-field-md rounded-xs border bg-[var(--color-bg-primary)]",
    "text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]",
    "transition-[border-color,box-shadow] duration-150",
    "hover:border-[var(--color-border-input-hover)]",
    "focus:outline-none focus:border-[var(--color-border-input-focus)] focus:shadow-[0_0_0_3px_var(--color-focus-halo)]",
    "disabled:cursor-not-allowed disabled:bg-[var(--color-bg-disabled)] disabled:text-[var(--color-text-disabled)] disabled:hover:border-[var(--color-border-input-default)]",
  ],
  {
    variants: {
      size: {
        sm: "h-size-control-sm px-inline-sm typography-label-sm-base",
        md: "h-size-control-md px-inline-md typography-label-md-base",
        lg: "h-size-control-lg px-inline-lg typography-label-lg-base",
      },
      error: {
        true: "border-[var(--color-border-danger-default)]",
        false: "border-[var(--color-border-input-default)]",
      },
    },
    defaultVariants: { size: "md", error: false },
  },
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    Omit<VariantProps<typeof inputVariants>, "error"> {
  label?: string;
  error?: boolean;
  helperText?: string;
  size?: "sm" | "md" | "lg";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      size = "md",
      id,
      "aria-describedby": describedBy,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;

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
          className={cn(inputVariants({ size, error: !!error }), className)}
          aria-describedby={joinIds(describedBy, helperText && helperId)}
          aria-invalid={ariaInvalid ?? (error || undefined)}
          {...props}
        />
        {helperText && (
          <FieldHelperText id={helperId} error={error}>
            {helperText}
          </FieldHelperText>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
