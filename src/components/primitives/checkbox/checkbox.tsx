import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as Label from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import { CheckIcon } from "lucide-react";
import { type ComponentPropsWithoutRef, useId } from "react";
import { cn } from "../../../utils/cn";
import { joinIds } from "../../../utils/join-ids";

const checkboxVariants = cva(
  [
    "h-size-control-xxxs w-size-control-xxxs shrink-0 rounded-xxs border bg-[var(--color-bg-primary)] transition-[background-color,border-color,transform] duration-150",
    "hover:border-[var(--color-border-brand-default)] active:scale-90",
    "focus-ring",
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

export function Checkbox({
  className,
  label,
  error,
  helperText,
  id,
  "aria-describedby": describedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;
  const helperId = `${checkboxId}-helper`;

  return (
    <div className={cn("flex gap-group-sm", helperText ? "items-start" : "items-center")}>
      <CheckboxPrimitive.Root
        id={checkboxId}
        className={cn(checkboxVariants({ error: !!error }), helperText && "mt-[2px]", className)}
        aria-describedby={joinIds(describedBy, helperText && helperId)}
        aria-invalid={ariaInvalid ?? (error || undefined)}
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
              className="typography-label-md-base text-[var(--color-text-primary)] cursor-pointer select-none"
            >
              {label}
            </Label.Root>
          )}
          {helperText && (
            <p
              id={helperId}
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
