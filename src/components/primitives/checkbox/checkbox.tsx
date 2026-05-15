import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as Label from "@radix-ui/react-label";
import { CheckIcon } from "lucide-react";
import { type ComponentPropsWithoutRef, useId } from "react";
import { cn } from "../../../utils/cn";

export interface CheckboxProps extends ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
}

export function Checkbox({ className, label, id, ...props }: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <div className="flex items-center gap-group-sm">
      <CheckboxPrimitive.Root
        id={checkboxId}
        className={cn(
          "h-size-control-xxxs w-size-control-xxxs shrink-0 rounded-xxs border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] transition-colors",
          "hover:border-[var(--color-border-brand-default)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[var(--color-border-focus)]",
          "data-[state=checked]:bg-[var(--color-bg-brand-default)] data-[state=checked]:border-[var(--color-bg-brand-default)] data-[state=checked]:text-white",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[var(--color-border-strong)]",
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center">
          <CheckIcon className="h-3 w-3" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <Label.Root
          htmlFor={checkboxId}
          className="typography-label-md-base text-[var(--color-text-primary)] cursor-pointer select-none"
        >
          {label}
        </Label.Root>
      )}
    </div>
  );
}
