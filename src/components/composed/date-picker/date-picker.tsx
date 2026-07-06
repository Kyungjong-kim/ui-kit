import { useState } from "react";
import { cn } from "../../../utils/cn";
import { Calendar } from "../../primitives/calendar";
import { Icon } from "../../primitives/icon";
import { Popover, PopoverContent, PopoverTrigger } from "../../primitives/popover";

export type DatePickerProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  formatDate?: (date: Date) => string;
  placeholder?: string;
};

const pad2 = (value: number) => String(value).padStart(2, "0");
const defaultFormatDate = (date: Date) =>
  `${date.getFullYear()}.${pad2(date.getMonth() + 1)}.${pad2(date.getDate())}`;
const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export function DatePicker({
  value,
  onChange,
  open,
  onOpenChange,
  minDate,
  maxDate,
  disabled,
  className,
  triggerClassName,
  formatDate = defaultFormatDate,
  placeholder = "날짜 선택",
}: DatePickerProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? Boolean(open) : internalOpen;

  const setOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const min = minDate ? startOfDay(minDate) : undefined;
  const max = maxDate ? startOfDay(maxDate) : undefined;

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "inline-flex items-center gap-group-xs typography-label-md-base text-[var(--color-text-primary)] disabled:cursor-not-allowed disabled:text-[var(--color-text-disabled)]",
            triggerClassName,
          )}
        >
          {value ? formatDate(value) : placeholder}
          <Icon
            name={isOpen ? "chevronUpThickFalse" : "chevronDownThickFalse"}
            size="sm"
            color="secondary"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={cn(
          "w-auto p-0 bg-[var(--color-bg-primary)] rounded-sm border border-[var(--color-border-default)] overflow-hidden",
          className,
        )}
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange?.(date);
            if (date) setOpen(false);
          }}
          disabled={(date) => {
            const target = startOfDay(date);
            if (min && target < min) return true;
            if (max && target > max) return true;
            return false;
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

DatePicker.displayName = "DatePicker";
