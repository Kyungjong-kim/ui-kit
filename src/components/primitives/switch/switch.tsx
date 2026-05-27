import * as Label from "@radix-ui/react-label";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { type ComponentPropsWithoutRef, useId } from "react";
import { cn } from "../../../utils/cn";

export interface SwitchProps extends ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string;
  size?: "sm" | "md" | "lg";
  error?: boolean;
  helperText?: string;
}

const trackSize = {
  sm: "h-4 w-7",
  md: "h-5 w-9",
  lg: "h-6 w-11",
} as const;

const thumbSize = {
  sm: "h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0",
  md: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
  lg: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
} as const;

export function Switch({
  className,
  label,
  id,
  size = "md",
  error,
  helperText,
  ...props
}: SwitchProps) {
  const generatedId = useId();
  const switchId = id ?? generatedId;

  return (
    <div className={cn("flex gap-group-sm", helperText ? "items-start" : "items-center")}>
      <SwitchPrimitive.Root
        id={switchId}
        className={cn(
          "relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
          helperText && "mt-[1px]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "data-[state=unchecked]:bg-[var(--color-border-danger-default)]"
            : "data-[state=unchecked]:bg-[var(--color-neutral-300)]",
          "data-[state=checked]:bg-[var(--color-bg-brand-default)]",
          trackSize[size],
          className,
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block rounded-full bg-white shadow-md transition-transform",
            thumbSize[size],
          )}
        />
      </SwitchPrimitive.Root>
      {(label || helperText) && (
        <div className="flex flex-col gap-group-xxs">
          {label && (
            <Label.Root
              htmlFor={switchId}
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
