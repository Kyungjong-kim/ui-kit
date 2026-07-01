import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { cn } from "../../../utils/cn";
import { Calendar } from "../../primitives/calendar";
import { Icon } from "../../primitives/icon";
import { Popover, PopoverContent, PopoverTrigger } from "../../primitives/popover";

export type DateRangeValue = { from?: Date; to?: Date };

export interface DateRangePickerProps {
  /** 선택된 날짜 범위 (controlled) */
  value?: DateRangeValue;
  /** uncontrolled 초기값 */
  defaultValue?: DateRangeValue;
  /** 범위 변경 콜백 */
  onChange?: (range: DateRangeValue) => void;
  /** Popover 열림 상태 (controlled) */
  open?: boolean;
  /** Popover 열림 상태 변경 콜백 */
  onOpenChange?: (open: boolean) => void;
  /** 선택 가능한 최소 날짜 */
  minDate?: Date;
  /** 선택 가능한 최대 날짜 */
  maxDate?: Date;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** PopoverContent className */
  className?: string;
  /** 트리거 버튼 className */
  triggerClassName?: string;
  /** 날짜 포맷터 */
  formatDate?: (date: Date) => string;
  /** 값이 없을 때 표시할 텍스트 */
  placeholder?: string;
}

const pad2 = (value: number) => String(value).padStart(2, "0");
const defaultFormatDate = (date: Date) =>
  `${date.getFullYear()}.${pad2(date.getMonth() + 1)}.${pad2(date.getDate())}`;
const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

/**
 * 시작~끝 날짜 범위를 선택하는 컴포넌트.
 * `Calendar`의 range 모드를 재사용하며 Popover 트리거로 구성된다.
 */
export function DateRangePicker({
  value,
  defaultValue,
  onChange,
  open,
  onOpenChange,
  minDate,
  maxDate,
  disabled,
  className,
  triggerClassName,
  formatDate = defaultFormatDate,
  placeholder = "기간 선택",
}: DateRangePickerProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [internalRange, setInternalRange] = useState<DateRangeValue>(defaultValue ?? {});

  const isOpenControlled = open !== undefined;
  const isOpen = isOpenControlled ? Boolean(open) : internalOpen;
  const isValueControlled = value !== undefined;
  const currentRange = isValueControlled ? value : internalRange;

  const setOpen = (next: boolean) => {
    if (!isOpenControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const handleSelect = (range: DateRange | undefined) => {
    const next: DateRangeValue = { from: range?.from, to: range?.to };
    if (!isValueControlled) setInternalRange(next);
    onChange?.(next);
    if (next.from && next.to) setOpen(false);
  };

  const min = minDate ? startOfDay(minDate) : undefined;
  const max = maxDate ? startOfDay(maxDate) : undefined;

  const label =
    currentRange.from && currentRange.to
      ? `${formatDate(currentRange.from)} ~ ${formatDate(currentRange.to)}`
      : currentRange.from
        ? `${formatDate(currentRange.from)} ~`
        : placeholder;

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "inline-flex items-center gap-1 typography-label-md-base text-[var(--color-text-primary)] disabled:cursor-not-allowed disabled:text-[var(--color-text-disabled)]",
            triggerClassName,
          )}
        >
          {label}
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
          "w-auto p-0 bg-[var(--color-bg-primary)] rounded-md border border-[var(--color-border-default)] overflow-hidden",
          className,
        )}
      >
        <Calendar
          mode="range"
          selected={
            currentRange.from ? { from: currentRange.from, to: currentRange.to } : undefined
          }
          onSelect={handleSelect}
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

DateRangePicker.displayName = "DateRangePicker";
