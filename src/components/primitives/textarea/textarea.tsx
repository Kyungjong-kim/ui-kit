import * as Label from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type TextareaHTMLAttributes, useId } from "react";
import { cn } from "../../../utils/cn";

const textareaVariants = cva(
  [
    "w-full rounded-sm border bg-[var(--color-bg-primary)]",
    "text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]",
    "transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--color-border-focus)] focus:border-[var(--color-border-focus)]",
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
        false: "border-[var(--color-border-default)]",
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
    { className, label, error, helperText, size = "md", resize = "vertical", id, ...props },
    ref,
  ) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;

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

Textarea.displayName = "Textarea";
