import * as React from "react";
import { cn } from "../../../utils/cn";
import { Button } from "../../primitives/button";
import { Checkbox } from "../../primitives/checkbox";
import { Icon } from "../../primitives/icon";
import { Popover, PopoverContent, PopoverTrigger } from "../../primitives/popover";

export interface FilterOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FilterDropdownProps {
  /** 필터 옵션 목록 */
  options: FilterOption[];
  /** 적용된 선택 값 (제어형) */
  value?: string[];
  /** 기본 선택 값 (비제어형) */
  defaultValue?: string[];
  /** 적용 콜백 — "적용" 클릭 시 확정된 값 전달 */
  onChange?: (value: string[]) => void;
  /** 트리거 라벨 */
  label?: string;
  /** 적용 버튼 문구 */
  applyLabel?: string;
  /** 초기화 버튼 문구 */
  resetLabel?: string;
  /** 전체 비활성화 */
  disabled?: boolean;
  className?: string;
}

/**
 * FilterDropdown — 체크박스 다중선택 필터.
 * Popover 안에서 체크박스로 선택하고 "적용" 시 확정한다. "초기화"로 임시 선택 비운다.
 * value+onChange(제어) 또는 defaultValue(비제어)를 지원한다.
 */
export function FilterDropdown({
  options,
  value,
  defaultValue,
  onChange,
  label = "필터",
  applyLabel = "적용",
  resetLabel = "초기화",
  disabled,
  className,
}: FilterDropdownProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<string[]>(defaultValue ?? []);
  const applied = isControlled ? value : internal;

  const [open, setOpen] = React.useState(false);
  // 팝오버 내부 임시 선택 (적용 전)
  const [draft, setDraft] = React.useState<string[]>(applied);

  // 팝오버 열릴 때 확정 값으로 draft 동기화
  const handleOpenChange = (o: boolean) => {
    if (disabled) return;
    if (o) setDraft(applied);
    setOpen(o);
  };

  const toggle = (v: string) => {
    setDraft((prev) => (prev.includes(v) ? prev.filter((it) => it !== v) : [...prev, v]));
  };

  const handleApply = () => {
    if (!isControlled) setInternal(draft);
    onChange?.(draft);
    setOpen(false);
  };

  const handleReset = () => {
    setDraft([]);
  };

  const count = applied.length;

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "inline-flex h-size-control-md items-center gap-group-xs rounded-xs border px-inline-md",
            "typography-label-md-medium transition-colors outline-none",
            "border-[var(--color-border-default)] bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]",
            "hover:bg-[var(--color-bg-secondary)]",
            "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-border-focus)]",
            "data-[state=open]:border-[var(--color-border-focus)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            count > 0 && "border-[var(--color-border-brand-default)]",
            className,
          )}
        >
          <span>{label}</span>
          {count > 0 && (
            <span className="inline-flex min-w-size-icon-md items-center justify-center rounded-full bg-[var(--color-bg-brand-default)] px-inline-xs typography-label-sm-medium text-[var(--color-text-inverse)]">
              {count}
            </span>
          )}
          <Icon
            name="chevronDownThickFalse"
            size="sm"
            color={disabled ? "disabled" : "secondary"}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-0">
        <div className="flex max-h-[280px] flex-col gap-group-sm overflow-y-auto p-inline-md">
          {options.map((opt) => (
            <Checkbox
              key={opt.value}
              label={opt.label}
              checked={draft.includes(opt.value)}
              disabled={opt.disabled}
              onCheckedChange={() => toggle(opt.value)}
            />
          ))}
        </div>
        <div className="flex items-center justify-between gap-group-sm border-t border-[var(--color-border-default)] p-inline-md">
          <Button variant="ghost" size="sm" onClick={handleReset}>
            {resetLabel}
          </Button>
          <Button variant="primary" size="sm" onClick={handleApply}>
            {applyLabel}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

FilterDropdown.displayName = "FilterDropdown";
