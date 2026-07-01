import { useState } from "react";
import { cn } from "../../../utils/cn";
import { Icon } from "../../primitives/icon";
import { Popover, PopoverContent, PopoverTrigger } from "../../primitives/popover";

export type MonthValue = { year: number; month: number };

export interface MonthPickerProps {
  /** 선택된 연/월 (controlled). month는 0-based (0=1월) */
  value?: MonthValue;
  /** uncontrolled 초기값 */
  defaultValue?: MonthValue;
  /** 값 변경 콜백 */
  onChange?: (value: MonthValue) => void;
  /** Popover 열림 상태 (controlled) */
  open?: boolean;
  /** Popover 열림 상태 변경 콜백 */
  onOpenChange?: (open: boolean) => void;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** PopoverContent className */
  className?: string;
  /** 트리거 버튼 className */
  triggerClassName?: string;
  /** 값이 없을 때 표시할 텍스트 */
  placeholder?: string;
}

const MONTH_LABELS = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

/**
 * 연도와 월을 선택하는 컴포넌트.
 * 12개월 그리드와 연도 이동 네비게이션으로 구성된다.
 */
export function MonthPicker({
  value,
  defaultValue,
  onChange,
  open,
  onOpenChange,
  disabled,
  className,
  triggerClassName,
  placeholder = "년/월 선택",
}: MonthPickerProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<MonthValue | undefined>(defaultValue);
  const [viewYear, setViewYear] = useState(
    (value ?? defaultValue)?.year ?? new Date().getFullYear(),
  );

  const isOpenControlled = open !== undefined;
  const isOpen = isOpenControlled ? Boolean(open) : internalOpen;
  const isValueControlled = value !== undefined;
  const currentValue = isValueControlled ? value : internalValue;

  const setOpen = (next: boolean) => {
    if (!isOpenControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const handleSelectMonth = (month: number) => {
    const next: MonthValue = { year: viewYear, month };
    if (!isValueControlled) setInternalValue(next);
    onChange?.(next);
    setOpen(false);
  };

  const label = currentValue
    ? `${currentValue.year}.${String(currentValue.month + 1).padStart(2, "0")}`
    : placeholder;

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
          "w-auto p-stack-xs bg-[var(--color-bg-primary)] rounded-sm border border-[var(--color-border-default)]",
          className,
        )}
      >
        <div className="flex items-center justify-between px-inline-xs py-stack-xxs">
          <button
            type="button"
            aria-label="이전 연도"
            onClick={() => setViewYear((prev) => prev - 1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-xs hover:bg-[var(--color-bg-tertiary)]"
          >
            <Icon name="chevronLeftThickFalse" size="sm" color="primary" />
          </button>
          <span className="typography-label-md-bold text-[var(--color-text-primary)]">
            {viewYear}년
          </span>
          <button
            type="button"
            aria-label="다음 연도"
            onClick={() => setViewYear((prev) => prev + 1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-xs hover:bg-[var(--color-bg-tertiary)]"
          >
            <Icon name="chevronRightThickFalse" size="sm" color="primary" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-stack-xxs pt-stack-xxs">
          {MONTH_LABELS.map((monthLabel, index) => {
            const isSelected = currentValue?.year === viewYear && currentValue?.month === index;
            return (
              <button
                key={monthLabel}
                type="button"
                onClick={() => handleSelectMonth(index)}
                aria-pressed={isSelected}
                className={cn(
                  "inline-flex h-9 w-16 items-center justify-center rounded-xs typography-label-md-base transition-colors",
                  isSelected
                    ? "bg-[var(--color-bg-brand-default)] text-[var(--color-text-inverse)]"
                    : "text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]",
                )}
              >
                {monthLabel}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

MonthPicker.displayName = "MonthPicker";
