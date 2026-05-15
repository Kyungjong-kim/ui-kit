import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { type ComponentPropsWithoutRef, useId } from "react";
import { cn } from "../../../utils/cn";

export interface RadioGroupItemProps
  extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: string;
}

export type RadioGroupProps = ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>;

export function RadioGroup({ className, orientation = "vertical", ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      className={cn(
        "flex gap-group-sm",
        orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
        className,
      )}
      orientation={orientation}
      {...props}
    />
  );
}

export function RadioGroupItem({ className, label, id, ...props }: RadioGroupItemProps) {
  const generatedId = useId();
  const itemId = id ?? generatedId;

  return (
    <div className="flex items-center gap-group-sm">
      <RadioGroupPrimitive.Item
        id={itemId}
        className={cn(
          "h-size-control-xxxs w-size-control-xxxs rounded-full border border-[var(--color-border-strong)] bg-white transition-colors",
          "hover:border-[var(--color-border-brand-default)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-border-focus)]",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[var(--color-border-strong)]",
          "data-[state=checked]:border-[var(--color-bg-brand-default)] data-[state=checked]:bg-[var(--color-bg-brand-default)]",
          className,
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <div className="h-1.5 w-1.5 rounded-full bg-white" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {label && (
        <label htmlFor={itemId} className="cursor-pointer text-sm text-[var(--color-text-primary)]">
          {label}
        </label>
      )}
    </div>
  );
}

RadioGroup.displayName = "RadioGroup";
RadioGroupItem.displayName = "RadioGroupItem";
