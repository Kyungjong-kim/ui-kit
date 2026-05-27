import * as Label from "@radix-ui/react-label";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva } from "class-variance-authority";
import { type ComponentPropsWithoutRef, useId } from "react";
import { cn } from "../../../utils/cn";

const radioVariants = cva(
  [
    "h-size-control-xxxs w-size-control-xxxs rounded-full border bg-white transition-colors",
    "hover:border-[var(--color-border-brand-default)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-border-focus)]",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[var(--color-border-strong)]",
    "data-[state=checked]:border-[var(--color-bg-brand-default)] data-[state=checked]:bg-[var(--color-bg-brand-default)]",
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

export interface RadioGroupProps extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  label?: string;
  error?: boolean;
  helperText?: string;
}

export interface RadioGroupItemProps
  extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: string;
  helperText?: string;
  error?: boolean;
}

export function RadioGroup({
  className,
  label,
  error,
  helperText,
  orientation = "vertical",
  children,
  ...props
}: RadioGroupProps) {
  return (
    <div className="flex flex-col gap-group-xs">
      {label && (
        <p className="typography-label-md-medium text-[var(--color-text-primary)]">{label}</p>
      )}
      <RadioGroupPrimitive.Root
        className={cn(
          "flex gap-group-sm",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
          className,
        )}
        orientation={orientation}
        {...props}
      >
        {children}
      </RadioGroupPrimitive.Root>
      {helperText && (
        <p
          className={cn(
            "typography-caption",
            error ? "text-[var(--color-text-danger-default)]" : "text-[var(--color-text-tertiary)]",
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

export function RadioGroupItem({
  className,
  label,
  helperText,
  error,
  id,
  ...props
}: RadioGroupItemProps) {
  const generatedId = useId();
  const itemId = id ?? generatedId;

  return (
    <div className={cn("flex gap-group-sm", helperText ? "items-start" : "items-center")}>
      <RadioGroupPrimitive.Item
        id={itemId}
        className={cn(radioVariants({ error: !!error }), helperText && "mt-[2px]", className)}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <div className="h-size-icon-xxs w-size-icon-xxs rounded-full bg-white" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {(label || helperText) && (
        <div className="flex flex-col gap-group-xxs">
          {label && (
            <Label.Root
              htmlFor={itemId}
              className="typography-label-md-base text-[var(--color-text-primary)] cursor-pointer select-none"
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

RadioGroup.displayName = "RadioGroup";
RadioGroupItem.displayName = "RadioGroupItem";
