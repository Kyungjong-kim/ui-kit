import { useState } from "react";
import { cn } from "../../../utils/cn";
import { Calendar } from "../../primitives/calendar";
import { Icon } from "../../primitives/icon";
import { Popover, PopoverContent, PopoverTrigger } from "../../primitives/popover";

export interface DateTimePickerProps {
  /** 선택된 날짜+시간 (controlled) */
  value?: Date;
  /** uncontrolled 초기값 */
  defaultValue?: Date;
  /** 값 변경 콜백 */
  onChange?: (date: Date | undefined) => void;
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
  /** 날짜+시간 포맷터 */
  formatDate?: (date: Date) => string;
  /** 값이 없을 때 표시할 텍스트 */
  placeholder?: string;
}

const pad2 = (value: number) => String(value).padStart(2, "0");
const defaultFormatDate = (date: Date) =>
  `${date.getFullYear()}.${pad2(date.getMonth() + 1)}.${pad2(date.getDate())} ${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/**
 * 날짜와 시간(시/분)을 함께 선택하는 컴포넌트.
 * `Calendar`로 날짜를, 시/분 입력으로 시간을 선택한다.
 */
export function DateTimePicker({
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
  placeholder = "날짜·시간 선택",
}: DateTimePickerProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<Date | undefined>(defaultValue);

  const isOpenControlled = open !== undefined;
  const isOpen = isOpenControlled ? Boolean(open) : internalOpen;
  const isValueControlled = value !== undefined;
  const currentValue = isValueControlled ? value : internalValue;

  const setOpen = (next: boolean) => {
    if (!isOpenControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const commit = (next: Date) => {
    if (!isValueControlled) setInternalValue(next);
    onChange?.(next);
  };

  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return;
    const base = currentValue ?? new Date();
    commit(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        base.getHours(),
        base.getMinutes(),
      ),
    );
  };

  const handleTimeChange = (part: "hours" | "minutes", raw: string) => {
    const base = currentValue ?? startOfDay(new Date());
    const parsed = Number.parseInt(raw, 10);
    const num = Number.isNaN(parsed) ? 0 : parsed;
    const next = new Date(base);
    if (part === "hours") next.setHours(clamp(num, 0, 23));
    else next.setMinutes(clamp(num, 0, 59));
    commit(next);
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
            "inline-flex items-center gap-1 typography-label-md-base text-[var(--color-text-primary)] disabled:cursor-not-allowed disabled:text-[var(--color-text-disabled)]",
            triggerClassName,
          )}
        >
          {currentValue ? formatDate(currentValue) : placeholder}
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
          mode="single"
          selected={currentValue}
          onSelect={handleSelectDate}
          disabled={(date) => {
            const target = startOfDay(date);
            if (min && target < min) return true;
            if (max && target > max) return true;
            return false;
          }}
        />
        <div className="flex items-center justify-center gap-inline-xs border-t border-[var(--color-border-default)] px-inline-md py-stack-xs">
          <Icon name="clockCounterClockwise" size="sm" color="secondary" />
          <input
            type="number"
            min={0}
            max={23}
            aria-label="시"
            value={currentValue ? pad2(currentValue.getHours()) : ""}
            placeholder="00"
            onChange={(event) => handleTimeChange("hours", event.target.value)}
            className="w-10 rounded-xs border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-inline-xs py-stack-xxs text-center typography-label-md-base text-[var(--color-text-primary)] outline-none focus:border-[var(--color-border-focus)]"
          />
          <span className="typography-label-md-base text-[var(--color-text-primary)]">:</span>
          <input
            type="number"
            min={0}
            max={59}
            aria-label="분"
            value={currentValue ? pad2(currentValue.getMinutes()) : ""}
            placeholder="00"
            onChange={(event) => handleTimeChange("minutes", event.target.value)}
            className="w-10 rounded-xs border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-inline-xs py-stack-xxs text-center typography-label-md-base text-[var(--color-text-primary)] outline-none focus:border-[var(--color-border-focus)]"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

DateTimePicker.displayName = "DateTimePicker";
