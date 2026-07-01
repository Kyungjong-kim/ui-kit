import * as Label from "@radix-ui/react-label";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, ChevronDownIcon, SearchIcon } from "lucide-react";
import type * as React from "react";
import { useId, useMemo, useRef, useState } from "react";
import { cn } from "../../../utils/cn";

const triggerVariants = cva(
  [
    "flex w-size-field-md items-center justify-between rounded-xs border bg-[var(--color-bg-primary)]",
    "text-[var(--color-text-primary)] transition-[border-color,box-shadow]",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-border-focus)] focus:border-[var(--color-border-focus)]",
    "disabled:cursor-not-allowed disabled:bg-[var(--color-bg-disabled)] disabled:opacity-50",
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

export interface SearchableSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  /** 옵션 그룹명. 지정 시 동일 group끼리 묶여 헤더와 함께 렌더된다. */
  group?: string;
}

export interface SearchableSelectProps extends Omit<VariantProps<typeof triggerVariants>, "error"> {
  /** 옵션 목록. `group` 지정 시 그룹 헤더로 묶여 렌더된다. */
  options: SearchableSelectOption[];
  /** 선택값 (controlled) */
  value?: string;
  /** uncontrolled 초기값 */
  defaultValue?: string;
  /** 값 변경 콜백 */
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * 검색 필터가 되는 select 컴포넌트.
 * 옵션 그룹과 다량 옵션 대응을 지원하며 키보드 탐색이 가능하다.
 */
export function SearchableSelect({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "선택",
  searchPlaceholder = "검색",
  emptyText = "결과 없음",
  label,
  error,
  helperText,
  disabled,
  size = "md",
  className,
}: SearchableSelectProps) {
  const generatedId = useId();
  const listId = `${generatedId}-list`;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const selectedOption = options.find((opt) => opt.value === currentValue);

  const filteredOptions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return options;
    return options.filter((opt) => opt.label.toLowerCase().includes(normalized));
  }, [options, query]);

  // 그룹 헤더 사이로 flat 인덱스를 유지하기 위해 렌더 순서 배열을 미리 만든다.
  const groupedEntries = useMemo(() => {
    const groups = new Map<string, SearchableSelectOption[]>();
    for (const opt of filteredOptions) {
      const key = opt.group ?? "";
      const bucket = groups.get(key);
      if (bucket) bucket.push(opt);
      else groups.set(key, [opt]);
    }
    return Array.from(groups.entries());
  }, [filteredOptions]);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) {
      setQuery("");
      setActiveIndex(0);
    }
  }

  function selectOption(option: SearchableSelectOption) {
    if (option.disabled) return;
    if (!isControlled) setInternalValue(option.value);
    onValueChange?.(option.value);
    setOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const option = filteredOptions[activeIndex];
      if (option) selectOption(option);
    }
  }

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
      <PopoverPrimitive.Root open={open} onOpenChange={handleOpenChange}>
        <PopoverPrimitive.Trigger
          id={generatedId}
          disabled={disabled}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          className={cn(triggerVariants({ size, error: !!error }), className)}
        >
          <span className={cn(!selectedOption && "text-[var(--color-text-tertiary)]")}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDownIcon
            className="h-size-icon-sm w-size-icon-sm text-[var(--color-text-tertiary)]"
            aria-hidden="true"
          />
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={4}
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              inputRef.current?.focus();
            }}
            className="z-50 w-[var(--radix-popover-trigger-width)] overflow-hidden rounded-sm border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] shadow-default-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
          >
            <div className="flex items-center gap-inline-xs border-b border-[var(--color-border-default)] px-inline-md">
              <SearchIcon
                className="h-size-icon-sm w-size-icon-sm shrink-0 text-[var(--color-text-tertiary)]"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                placeholder={searchPlaceholder}
                aria-controls={listId}
                aria-activedescendant={
                  filteredOptions[activeIndex] ? `${listId}-${activeIndex}` : undefined
                }
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleKeyDown}
                className="h-size-control-md w-full bg-transparent text-[var(--color-text-primary)] outline-none typography-label-md-base placeholder:text-[var(--color-text-tertiary)]"
              />
            </div>
            <div id={listId} role="listbox" className="max-h-72 overflow-y-auto p-stack-xxs">
              {filteredOptions.length === 0 ? (
                <p className="px-inline-md py-stack-xs typography-label-md-base text-[var(--color-text-tertiary)]">
                  {emptyText}
                </p>
              ) : (
                groupedEntries.map(([groupName, groupOptions]) => (
                  <div key={groupName || "__default__"}>
                    {groupName && (
                      <div className="px-inline-md py-stack-xxs typography-caption text-[var(--color-text-tertiary)]">
                        {groupName}
                      </div>
                    )}
                    {groupOptions.map((opt) => {
                      const index = filteredOptions.indexOf(opt);
                      const isSelected = opt.value === currentValue;
                      const isActive = index === activeIndex;
                      return (
                        <button
                          key={opt.value}
                          id={`${listId}-${index}`}
                          type="button"
                          role="option"
                          tabIndex={-1}
                          aria-selected={isSelected}
                          disabled={opt.disabled}
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={() => selectOption(opt)}
                          className={cn(
                            "flex w-full cursor-pointer select-none items-center justify-between gap-inline-sm rounded-xs px-inline-md py-stack-xs typography-label-md-base text-[var(--color-text-primary)] outline-none transition-colors",
                            isActive && "bg-[var(--color-bg-tertiary)]",
                            isSelected && "text-[var(--color-text-brand-default)] font-medium",
                            "disabled:pointer-events-none disabled:opacity-50",
                          )}
                        >
                          <span className="truncate">{opt.label}</span>
                          {isSelected && (
                            <CheckIcon
                              className="h-size-icon-sm w-size-icon-sm shrink-0"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
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

SearchableSelect.displayName = "SearchableSelect";
