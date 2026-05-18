import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as Label from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import { CheckIcon } from "lucide-react";
import { type ComponentPropsWithoutRef, useId } from "react";
import { cn } from "../../../utils/cn";

const checkboxVariants = cva(
  [
    "h-size-control-xxxs w-size-control-xxxs shrink-0 rounded-xxs border bg-[var(--color-bg-primary)] transition-colors",
    "hover:border-[var(--color-border-brand-default)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[var(--color-border-focus)]",
    "data-[state=checked]:bg-[var(--color-bg-brand-default)] data-[state=checked]:border-[var(--color-bg-brand-default)] data-[state=checked]:text-white",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[var(--color-border-strong)]",
  ],
  {
    variants: {
      error: {
        true: "border-[var(--color-border-danger-default)]",
        false: "border-[var(--color-border-strong)]",
      },
    },
    defaultVariants: { error: false },
  },
);

export interface CheckboxProps extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
  error?: boolean;
  helperText?: string;
}

export function Checkbox({ className, label, error, helperText, id, ...props }: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <div className="flex items-start gap-group-sm">
      <CheckboxPrimitive.Root
        id={checkboxId}
        className={cn(checkboxVariants({ error: !!error }), "mt-[2px]", className)}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center">
          <CheckIcon className="h-size-icon-xs w-size-icon-xs" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {(label || helperText) && (
        <div className="flex flex-col gap-group-xxs">
          {label && (
            <Label.Root
              htmlFor={checkboxId}
              className="typography-label-md-base text-[var(--color-text-primary)] cursor-pointer select-none leading-none pt-[2px]"
            >
              {label}
            </Label.Root>
          )}
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
      )}
    </div>
  );
}
