import * as Label from "@radix-ui/react-label";
import { forwardRef, type TextareaHTMLAttributes, useId } from "react";
import { cn } from "../../../utils/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, resize = "vertical", id, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <Label.Root
            htmlFor={textareaId}
            className="text-sm font-medium text-[var(--color-text-primary)]"
          >
            {label}
          </Label.Root>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={props.rows ?? 4}
          className={cn(
            "w-full rounded-md border bg-[var(--color-bg-primary)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)] focus:border-[var(--color-border-focus)]",
            "disabled:cursor-not-allowed disabled:bg-[var(--color-bg-disabled)] disabled:text-[var(--color-text-disabled)]",
            error
              ? "border-[var(--color-border-danger-default)]"
              : "border-[var(--color-border-default)]",
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

Textarea.displayName = "Textarea";
