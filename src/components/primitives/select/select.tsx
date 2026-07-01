import * as Label from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useId } from "react";
import { cn } from "../../../utils/cn";

const triggerVariants = cva(
  [
    "flex w-size-field-md items-center justify-between rounded-sm border bg-[var(--color-bg-primary)]",
    "text-[var(--color-text-primary)] transition-[border-color,box-shadow]",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-border-focus)] focus:border-[var(--color-border-focus)]",
    "disabled:cursor-not-allowed disabled:bg-[var(--color-bg-disabled)] disabled:opacity-50",
    "data-[placeholder]:text-[var(--color-text-tertiary)]",
  ],
  {
    variants: {
      size: {
        sm: "h-size-control-sm px-inline-sm typography-label-sm-base",
        md: "h-size-control-md px-inline-md typography-label-md-base",
        lg: "h-size-control-lg px-inline-lg typography-label-lg-base",
      },
      error: {
        true: "border-[var(--color-border-danger-default)]",
        false: "border-[var(--color-border-default)]",
      },
    },
    defaultVariants: { size: "md", error: false },
  },
);

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<VariantProps<typeof triggerVariants>, "error"> {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Select({
  options,
  value,
  onValueChange,
  placeholder = "선택",
  label,
  error,
  helperText,
  disabled,
  size = "md",
  className,
}: SelectProps) {
  const generatedId = useId();

  return (
    <div className="flex flex-col gap-group-xs">
      {label && (
        <Label.Root
          htmlFor={generatedId}
          className="typography-label-md-medium text-[var(--color-text-primary)]"
        >
          {label}
        </Label.Root>
      )}
      <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectPrimitive.Trigger
          id={generatedId}
          className={cn(triggerVariants({ size, error: !!error }), className)}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon aria-hidden="true">
            <ChevronDownIcon className="h-size-icon-sm w-size-icon-sm text-[var(--color-text-tertiary)]" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={4}
            className="z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-sm border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] shadow-default-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
          >
            <SelectPrimitive.Viewport className="p-stack-xxs">
              {options.map((opt) => (
                <SelectPrimitive.Item
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                  className={cn(
                    "flex cursor-pointer select-none items-center justify-between gap-inline-sm rounded-xs px-inline-md py-stack-xs typography-label-md-base text-[var(--color-text-primary)] outline-none transition-colors",
                    "hover:bg-[var(--color-bg-tertiary)] focus:bg-[var(--color-bg-tertiary)]",
                    "data-[state=checked]:font-medium data-[state=checked]:text-[var(--color-text-brand-default)]",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  )}
                >
                  <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="flex h-size-icon-sm w-size-icon-sm shrink-0 items-center justify-center">
                    <CheckIcon className="h-size-icon-sm w-size-icon-sm" aria-hidden="true" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
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
