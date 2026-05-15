import * as Label from "@radix-ui/react-label";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { type ComponentPropsWithoutRef, useId } from "react";
import { cn } from "../../../utils/cn";

export interface SwitchProps extends ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string;
  size?: "sm" | "md" | "lg";
}

export function Switch({ className, label, id, size = "md", ...props }: SwitchProps) {
  const generatedId = useId();
  const switchId = id ?? generatedId;

  return (
    <div className="flex items-center gap-group-sm">
      <SwitchPrimitive.Root
        id={switchId}
        className={cn(
          "relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-[var(--color-bg-brand-default)] data-[state=unchecked]:bg-[var(--color-neutral-300)]",
          {
            "h-4 w-7": size === "sm",
            "h-5 w-9": size === "md",
            "h-6 w-11": size === "lg",
          },
          className,
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block rounded-full bg-white shadow-md transition-transform",
            {
              "h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0":
                size === "sm",
              "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0":
                size === "md",
              "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0":
                size === "lg",
            },
          )}
        />
      </SwitchPrimitive.Root>
      {label && (
        <Label.Root
          htmlFor={switchId}
          className="typography-label-md-base text-[var(--color-text-primary)] cursor-pointer select-none"
        >
          {label}
        </Label.Root>
      )}
    </div>
  );
}
