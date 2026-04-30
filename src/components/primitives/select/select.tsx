import * as SelectPrimitive from "@radix-ui/react-select";
import * as Label from "@radix-ui/react-label";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useId } from "react";
import { cn } from "../../../utils/cn";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
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
  className,
}: SelectProps) {
  const generatedId = useId();

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label.Root
          htmlFor={generatedId}
          className="text-sm font-medium text-[var(--color-text-primary)]"
        >
          {label}
        </Label.Root>
      )}
      <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectPrimitive.Trigger
          id={generatedId}
          className={cn(
            "flex h-9 w-full items-center justify-between rounded-md border bg-[var(--color-bg-primary)] px-3 text-sm text-[var(--color-text-primary)] transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)] focus:border-[var(--color-border-focus)]",
            "disabled:cursor-not-allowed disabled:bg-[var(--color-bg-disabled)] disabled:opacity-50",
            "data-[placeholder]:text-[var(--color-text-tertiary)]",
            error ? "border-[var(--color-border-danger-default)]" : "border-[var(--color-border-default)]",
            className,
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon>
            <ChevronDownIcon className="h-4 w-4 text-[var(--color-text-tertiary)]" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={4}
            className="z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          >
            <SelectPrimitive.Viewport className="p-1">
              {options.map((opt) => (
                <SelectPrimitive.Item
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                  className={cn(
                    "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm text-[var(--color-text-primary)] outline-none",
                    "hover:bg-[var(--color-bg-tertiary)] focus:bg-[var(--color-bg-tertiary)]",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  )}
                >
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <SelectPrimitive.ItemIndicator>
                      <CheckIcon className="h-3.5 w-3.5 text-[var(--color-text-brand-default)]" />
                    </SelectPrimitive.ItemIndicator>
                  </span>
                  <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {helperText && (
        <p className={cn("text-xs", error ? "text-[var(--color-text-danger-default)]" : "text-[var(--color-text-tertiary)]")}>
          {helperText}
        </p>
      )}
    </div>
  );
}
