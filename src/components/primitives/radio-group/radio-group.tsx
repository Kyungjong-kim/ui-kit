import * as Label from "@radix-ui/react-label";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva } from "class-variance-authority";
import { type ComponentPropsWithoutRef, useId } from "react";
import { cn } from "../../../utils/cn";
import { joinIds } from "../../../utils/join-ids";

const radioVariants = cva(
  [
    "h-size-control-xxxs w-size-control-xxxs rounded-full border bg-[var(--color-bg-primary)] transition-[background-color,border-color,transform] duration-150",
    "hover:border-[var(--color-border-brand-default)] active:scale-90",
    "focus-ring",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[var(--color-border-control)]",
    "data-[state=checked]:border-[var(--color-bg-brand-default)] data-[state=checked]:bg-[var(--color-bg-brand-default)]",
  ],
  {
    variants: {
      error: {
        true: "border-[var(--color-border-danger-default)]",
        false: "border-[var(--color-border-control)]",
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
  "aria-labelledby": labelledBy,
  "aria-describedby": describedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: RadioGroupProps) {
  const groupId = useId();
  const labelId = `${groupId}-label`;
  const helperId = `${groupId}-helper`;

  return (
    <div className="flex flex-col gap-group-xs">
      {label && (
        <p id={labelId} className="typography-label-md-medium text-[var(--color-text-primary)]">
          {label}
        </p>
      )}
      <RadioGroupPrimitive.Root
        className={cn(
          "flex gap-group-sm",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
          className,
        )}
        orientation={orientation}
        aria-labelledby={joinIds(labelledBy, label && labelId)}
        aria-describedby={joinIds(describedBy, helperText && helperId)}
        aria-invalid={ariaInvalid ?? (error || undefined)}
        {...props}
      >
        {children}
      </RadioGroupPrimitive.Root>
      {helperText && (
        <p
          id={helperId}
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
  "aria-describedby": describedBy,
  ...props
}: RadioGroupItemProps) {
  const generatedId = useId();
  const itemId = id ?? generatedId;
  const helperId = `${itemId}-helper`;

  return (
    <div className={cn("flex gap-group-sm", helperText ? "items-start" : "items-center")}>
      <RadioGroupPrimitive.Item
        id={itemId}
        className={cn(radioVariants({ error: !!error }), helperText && "mt-[2px]", className)}
        aria-describedby={joinIds(describedBy, helperText && helperId)}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <div className="h-size-icon-xxs w-size-icon-xxs rounded-full bg-[var(--color-interactive-primary-text)]" />
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

RadioGroup.displayName = "RadioGroup";
RadioGroupItem.displayName = "RadioGroupItem";
