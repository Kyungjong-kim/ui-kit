import * as Label from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useId } from "react";
import { useUiKitMessages } from "../../../locale";
import { cn } from "../../../utils/cn";
import { joinIds } from "../../../utils/join-ids";
import { FieldHelperText } from "../../_internal/field-helper-text";

const triggerVariants = cva(
  [
    "flex w-size-field-md items-center justify-between rounded-xs border bg-[var(--color-bg-primary)]",
    "text-[var(--color-text-primary)] transition-[border-color,box-shadow]",
    "hover:border-[var(--color-border-input-hover)]",
    "focus:outline-none focus:border-[var(--color-border-input-focus)] focus:shadow-[0_0_0_3px_var(--color-focus-halo)]",
    "data-[state=open]:border-[var(--color-border-input-focus)] data-[state=open]:shadow-[0_0_0_3px_var(--color-focus-halo)]",
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
        false: "border-[var(--color-border-input-default)]",
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

/**
 * Radix Select 는 Item value 로 빈 문자열을 받지 않는다(빈 값 = 선택 해제 신호).
 * 「전체」처럼 value 가 "" 인 옵션은 내부에서만 이 값으로 바꿔 넘기고, 밖으로는 "" 를 돌려준다.
 */
const EMPTY_OPTION_VALUE = "__ui-kit-select-empty__";

export function Select({
  options,
  value,
  onValueChange,
  placeholder: placeholderProp,
  label,
  error,
  helperText,
  disabled,
  size = "md",
  className,
}: SelectProps) {
  const t = useUiKitMessages();
  const placeholder = placeholderProp ?? t.common.select;
  const generatedId = useId();
  // 빈 값 옵션이 없으면 value="" 는 지금처럼 「선택 없음(placeholder)」 이다
  const hasEmptyOption = options.some((opt) => opt.value === "");
  const helperId = `${generatedId}-helper`;

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
      <SelectPrimitive.Root
        value={hasEmptyOption && value === "" ? EMPTY_OPTION_VALUE : value}
        onValueChange={(next) => onValueChange?.(next === EMPTY_OPTION_VALUE ? "" : next)}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger
          id={generatedId}
          className={cn(triggerVariants({ size, error: !!error }), className)}
          aria-describedby={joinIds(helperText && helperId)}
          aria-invalid={error || undefined}
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
            <SelectPrimitive.Viewport className="p-stack-xs">
              {options.map((opt) => (
                <SelectPrimitive.Item
                  key={opt.value}
                  value={opt.value === "" ? EMPTY_OPTION_VALUE : opt.value}
                  disabled={opt.disabled}
                  className={cn(
                    "flex cursor-pointer select-none items-center justify-between gap-inline-sm rounded-xxs px-inline-md py-stack-xs typography-label-md-base text-[var(--color-text-primary)] outline-none transition-colors",
                    "hover:bg-[var(--color-bg-tertiary)] focus:bg-[var(--color-bg-tertiary)]",
                    "data-[state=checked]:bg-[var(--color-bg-brand-subtle)] data-[state=checked]:font-medium",
                    "data-[state=checked]:hover:bg-[var(--color-bg-brand-subtle-hover)] data-[state=checked]:focus:bg-[var(--color-bg-brand-subtle-hover)]",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  )}
                >
                  <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="flex h-size-icon-sm w-size-icon-sm shrink-0 items-center justify-center">
                    <CheckIcon
                      className="h-size-icon-sm w-size-icon-sm text-[var(--color-text-brand-default)]"
                      aria-hidden="true"
                    />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {helperText && (
        <FieldHelperText id={helperId} error={error}>
          {helperText}
        </FieldHelperText>
      )}
    </div>
  );
}
