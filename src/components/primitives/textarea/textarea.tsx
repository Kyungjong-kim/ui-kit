import * as Label from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type TextareaHTMLAttributes, useId } from "react";
import { cn } from "../../../utils/cn";
import { joinIds } from "../../../utils/join-ids";
import { FieldHelperText } from "../../_internal/field-helper-text";

const textareaVariants = cva(
  [
    "w-size-field-lg rounded-xs border bg-[var(--color-bg-primary)]",
    "text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]",
    "transition-[border-color,box-shadow] duration-150",
    "hover:border-[var(--color-border-input-hover)]",
    "focus:outline-none focus:border-[var(--color-border-input-focus)] focus:shadow-[0_0_0_3px_var(--color-focus-halo)]",
    "disabled:cursor-not-allowed disabled:bg-[var(--color-bg-disabled)] disabled:text-[var(--color-text-disabled)]",
  ],
  {
    variants: {
      size: {
        sm: "px-inline-sm py-stack-xs typography-label-sm-base",
        md: "px-inline-md py-stack-sm typography-label-md-base",
        lg: "px-inline-lg py-stack-md typography-label-lg-base",
      },
      error: {
        true: "border-[var(--color-border-danger-default)]",
        false: "border-[var(--color-border-input-default)]",
      },
    },
    defaultVariants: { size: "md", error: false },
  },
);

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    Omit<VariantProps<typeof textareaVariants>, "error"> {
  label?: string;
  error?: boolean;
  helperText?: string;
  size?: "sm" | "md" | "lg";
  resize?: "none" | "vertical" | "horizontal" | "both";
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      size = "md",
      resize = "vertical",
      id,
      "aria-describedby": describedBy,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const helperId = `${textareaId}-helper`;

    return (
      <div className="flex flex-col gap-group-xs">
        {label && (
          <Label.Root
            htmlFor={textareaId}
            className="typography-label-md-medium text-[var(--color-text-primary)]"
          >
            {label}
          </Label.Root>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={props.rows ?? 4}
          aria-describedby={joinIds(describedBy, helperText && helperId)}
          aria-invalid={ariaInvalid ?? (error || undefined)}
          className={cn(
            textareaVariants({ size, error: !!error }),
            {
              "resize-none": resize === "none",
              "resize-y": resize === "vertical",
              "resize-x": resize === "horizontal",
              resize: resize === "both",
            },
            className,
          )}
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

Textarea.displayName = "Textarea";
