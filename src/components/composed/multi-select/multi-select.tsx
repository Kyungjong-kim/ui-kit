import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";
import { cn } from "../../../utils/cn";
import { Icon } from "../../primitives/icon";
import { Input } from "../../primitives/input";
import { Spinner } from "../../primitives/spinner";
import { Tag } from "../../primitives/tag";
import { IconButton } from "../icon-button";

export interface MultiSelectOption {
  value: string;
  label: string;
  /** 우측 보조 텍스트(tertiary). 지정 시 count보다 우선 표시 */
  meta?: string;
  /** 우측 카운트(예: 인원수). 지정 시 "{count} {countUnit}" 표시 */
  count?: number;
  /** 제목 아래 2번째 줄 상세 설명(tertiary, 말줄임). 검색 매칭 비포함. */
  description?: string;
  /** 옵션 단위 비활성화 — 클릭 불가 + 회색 처리 */
  disabled?: boolean;
}

/** 검색어 일치 부분을 brand 색으로 강조 */
function highlightMatch(label: string, query: string): React.ReactNode {
  const q = query.trim();
  if (!q) return label;
  const idx = label.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return label;
  return (
    <>
      {label.slice(0, idx)}
      <span className="text-[var(--color-text-brand-default)]">
        {label.slice(idx, idx + q.length)}
      </span>
      {label.slice(idx + q.length)}
    </>
  );
}

/** 체크박스 비주얼 — 선택/indeterminate/disabled */
function CheckVisual({
  checked,
  indeterminate,
  disabled,
}: {
  checked: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
}) {
  const active = checked || indeterminate;
  return (
    <span
      aria-hidden
      className={cn(
        "flex h-size-control-xxxs w-size-control-xxxs shrink-0 items-center justify-center rounded-xxs border",
        disabled
          ? "bg-[var(--color-bg-disabled)] border-[var(--color-border-disabled)]"
          : active
            ? "bg-[var(--color-bg-brand-default)] border-[var(--color-bg-brand-default)]"
            : "bg-[var(--color-bg-primary)] border-[var(--color-border-strong)]",
      )}
    >
      {indeterminate ? (
        <Icon name="minus" size="xs" color={disabled ? "disabled" : "inverse"} />
      ) : checked ? (
        <Icon name="checkThickTrue" size="xs" color={disabled ? "disabled" : "inverse"} />
      ) : null}
    </span>
  );
}

export interface MultiSelectProps {
  /** 옵션 목록 */
  options: MultiSelectOption[];
  /** 선택된 값들 */
  value: string[];
  /** 변경 콜백 */
  onValueChange: (value: string[]) => void;
  /** 라벨 (상단) */
  label?: string;
  /** 헬퍼 텍스트 (하단) */
  helperText?: string;
  /** 플레이스홀더 (선택 없을 때) */
  placeholder?: string;
  /** 상태 — default / error */
  state?: "default" | "error";
  /** 비활성화 */
  disabled?: boolean;
  /** 사이즈 */
  size?: "md" | "lg";
  /** 우측 trash 아이콘 표시 (전체 클리어) */
  showClearAll?: boolean;
  /** 드롭다운 상단 검색 input 표시 (기본 true) */
  searchable?: boolean;
  /** 옵션 비동기 로딩 중 — 드롭다운에 스피너 표시 */
  isLoading?: boolean;
  /** 검색 input placeholder */
  searchPlaceholder?: string;
  /** 옵션 카운트 단위 (예: "items") */
  countUnit?: string;
  /** 검색 결과 없음 제목 */
  emptyText?: string;
  /** 검색 결과 없음 보조 문구 */
  emptySubText?: string;
  /** "전체" 마스터 체크박스 노출 (검색 전). 선택 가능 항목 일괄 선택/해제 + indeterminate. */
  showSelectAll?: boolean;
  /** "전체" 행 라벨 (기본 "Select all") */
  selectAllLabel?: string;
  /** "전체" 행 우측 텍스트. 호출부가 계산해 전달. */
  selectAllMeta?: React.ReactNode;
  /** 전체 삭제 버튼 aria-label */
  clearAllLabel?: string;
  className?: string;
  id?: string;
}

export function MultiSelect({
  options,
  value,
  onValueChange,
  label,
  helperText,
  placeholder = "Select",
  state = "default",
  disabled,
  size = "md",
  showClearAll = true,
  searchable = true,
  isLoading = false,
  searchPlaceholder = "Search",
  countUnit,
  emptyText = "No results found.",
  emptySubText = "Try a different keyword.",
  showSelectAll = false,
  selectAllLabel = "Select all",
  selectAllMeta,
  clearAllLabel = "Clear all",
  className,
  id,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const generatedId = React.useId();
  const triggerId = id ?? generatedId;
  const helperId = helperText ? `${triggerId}-helper` : undefined;
  const listboxId = `${triggerId}-listbox`;
  const currentState = disabled ? "disabled" : state;
  const hasValue = value.length > 0;

  const handleRemove = (v: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    onValueChange(value.filter((it) => it !== v));
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange([]);
  };

  const toggle = (v: string) => {
    if (value.includes(v)) onValueChange(value.filter((it) => it !== v));
    else onValueChange([...value, v]);
  };

  const labelMap = React.useMemo(
    () => Object.fromEntries(options.map((o) => [o.value, o.label])),
    [options],
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q === "") return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  // "전체" 마스터 — 선택 가능(!disabled) 항목 기준
  const selectableValues = React.useMemo(
    () => options.filter((o) => !o.disabled).map((o) => o.value),
    [options],
  );
  const selectedSelectableCount = selectableValues.filter((v) => value.includes(v)).length;
  const allSelected =
    selectableValues.length > 0 && selectedSelectableCount === selectableValues.length;
  const someSelected = selectedSelectableCount > 0 && !allSelected;
  const isSearching = query.trim() !== "";

  const handleSelectAll = () => {
    if (allSelected) {
      const selectableSet = new Set(selectableValues);
      onValueChange(value.filter((v) => !selectableSet.has(v)));
    } else {
      onValueChange(Array.from(new Set([...value, ...selectableValues])));
    }
  };

  const renderOption = (opt: MultiSelectOption) => {
    const selected = value.includes(opt.value);
    const optDisabled = !!opt.disabled;
    return (
      <button
        key={opt.value}
        type="button"
        role="option"
        aria-selected={selected}
        disabled={optDisabled}
        onClick={() => toggle(opt.value)}
        className={cn(
          "flex min-h-size-control-sm w-full items-center justify-between gap-group-sm",
          "rounded-xs px-inline-md py-stack-xs",
          optDisabled
            ? "cursor-not-allowed"
            : "cursor-pointer hover:bg-[var(--color-bg-secondary)]",
        )}
      >
        <span className="flex min-w-0 items-center gap-group-sm">
          <CheckVisual checked={selected} disabled={optDisabled} />
          <span className="flex min-w-0 flex-col gap-group-xxs text-left">
            <span
              className={cn(
                "min-w-0 truncate",
                optDisabled
                  ? "typography-label-md-base text-[var(--color-text-disabled)]"
                  : selected
                    ? "typography-label-md-medium text-[var(--color-text-primary)]"
                    : "typography-label-md-base text-[var(--color-text-secondary)]",
              )}
            >
              {highlightMatch(opt.label, query)}
            </span>
            {opt.description && (
              <span
                title={opt.description}
                className="min-w-0 truncate typography-body-sm-base text-[var(--color-text-tertiary)]"
              >
                {opt.description}
              </span>
            )}
          </span>
        </span>
        {opt.meta ? (
          <span className="shrink-0 truncate typography-body-md-base text-[var(--color-text-tertiary)]">
            {opt.meta}
          </span>
        ) : opt.count !== undefined ? (
          <span className="shrink-0 typography-body-md-base text-[var(--color-text-tertiary)]">
            {opt.count}
            {countUnit ? ` ${countUnit}` : ""}
          </span>
        ) : null}
      </button>
    );
  };

  return (
    <div className={cn("flex flex-col gap-group-xs", className)}>
      {label && (
        <span
          id={`${triggerId}-label`}
          className={cn("typography-label-md-medium", {
            "text-[var(--color-text-primary)]":
              currentState !== "disabled" && currentState !== "error",
            "text-[var(--color-text-disabled)]": currentState === "disabled",
            "text-[var(--color-text-danger-default)]": currentState === "error",
          })}
        >
          {label}
        </span>
      )}

      <div className="flex items-center gap-group-sm">
        <PopoverPrimitive.Root
          open={open}
          onOpenChange={(o) => {
            if (disabled) return;
            setOpen(o);
            if (!o) setQuery("");
          }}
        >
          <PopoverPrimitive.Trigger asChild>
            {/* 트리거 — 칩(button) 중첩을 피하려 div(role=combobox). 키보드 토글은 onKeyDown으로 보완. */}
            <div
              id={triggerId}
              role="combobox"
              aria-describedby={helperId}
              aria-labelledby={label ? `${triggerId}-label` : undefined}
              aria-controls={open ? listboxId : undefined}
              aria-expanded={open}
              aria-haspopup="listbox"
              aria-disabled={disabled || undefined}
              tabIndex={disabled ? undefined : 0}
              data-size={size}
              onKeyDown={(e) => {
                if (disabled) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (open) setQuery("");
                  setOpen(!open);
                }
              }}
              className={cn(
                "group flex w-full items-center justify-between gap-group-sm",
                "border bg-[var(--color-bg-primary)] transition-colors outline-none",
                currentState === "disabled" ? "cursor-not-allowed" : "cursor-pointer",
                "data-[size=md]:min-h-size-control-md data-[size=md]:px-inline-md data-[size=md]:py-stack-xs data-[size=md]:rounded-xs",
                "data-[size=lg]:min-h-size-control-lg data-[size=lg]:px-inline-lg data-[size=lg]:py-stack-sm data-[size=lg]:rounded-sm",
                "border-[var(--color-border-default)]",
                "focus-within:border-[var(--color-border-focus)]",
                "data-[state=open]:border-[var(--color-border-focus)]",
                currentState === "error" &&
                  "border-[var(--color-border-danger-default)] focus-within:border-[var(--color-border-danger-default)]",
                currentState === "disabled" &&
                  "bg-[var(--color-bg-disabled)] border-[var(--color-border-disabled)]",
              )}
            >
              {/* 칩 영역 — 최대 3줄 후 내부 스크롤 (sm 태그 20px × 3줄 + gap 4px × 2 = 68px) */}
              <div className="flex min-w-0 max-h-[68px] flex-1 flex-wrap content-start items-center gap-group-xs overflow-y-auto">
                {hasValue ? (
                  value.map((v) => (
                    <Tag key={v} size="sm" onRemove={disabled ? undefined : () => handleRemove(v)}>
                      {labelMap[v] ?? v}
                    </Tag>
                  ))
                ) : (
                  <span
                    className={cn(
                      "typography-label-md-base",
                      disabled
                        ? "text-[var(--color-text-disabled)]"
                        : "text-[var(--color-text-tertiary)]",
                    )}
                  >
                    {placeholder}
                  </span>
                )}
              </div>
              <span aria-hidden className="inline-flex shrink-0 items-center">
                <Icon
                  name={open ? "chevronUpThickFalse" : "chevronDownThickFalse"}
                  size="sm"
                  color={disabled ? "disabled" : "secondary"}
                />
              </span>
            </div>
          </PopoverPrimitive.Trigger>

          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              align="start"
              sideOffset={4}
              onOpenAutoFocus={(e) => e.preventDefault()}
              className={cn(
                "z-50 flex w-[var(--radix-popover-trigger-width)] flex-col gap-group-md",
                "rounded-sm border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] shadow-default-md",
                "px-inline-sm py-stack-md",
              )}
            >
              {searchable && (
                <Input
                  className="w-full"
                  value={query}
                  placeholder={searchPlaceholder}
                  aria-label={searchPlaceholder}
                  onChange={(e) => setQuery(e.target.value)}
                />
              )}

              {isLoading ? (
                <div className="flex items-center justify-center py-stack-xl">
                  <Spinner size="sm" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="px-inline-md py-stack-md text-center">
                  <p className="typography-body-sm-base text-[var(--color-text-secondary)]">
                    {emptyText}
                  </p>
                  {emptySubText && (
                    <p className="typography-body-sm-base text-[var(--color-text-secondary)]">
                      {emptySubText}
                    </p>
                  )}
                </div>
              ) : (
                <>
                  {showSelectAll && !isSearching && (
                    <>
                      {/* biome-ignore lint/a11y/useSemanticElements: tri-state(mixed) 전체선택 토글 — 옵션 목록과 시각·동작 정합 위해 버튼(role=checkbox)로 구현, native input[type=checkbox] 부적합 */}
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={allSelected ? "true" : someSelected ? "mixed" : "false"}
                        onClick={handleSelectAll}
                        className="flex min-h-size-control-sm w-full cursor-pointer items-center justify-between gap-group-sm rounded-xs px-inline-md py-stack-xs hover:bg-[var(--color-bg-secondary)]"
                      >
                        <span className="flex min-w-0 items-center gap-group-sm">
                          <CheckVisual checked={allSelected} indeterminate={someSelected} />
                          <span className="truncate typography-label-md-medium text-[var(--color-text-primary)]">
                            {selectAllLabel}
                          </span>
                        </span>
                        {selectAllMeta && (
                          <span className="shrink-0 typography-body-md-base text-[var(--color-text-tertiary)]">
                            {selectAllMeta}
                          </span>
                        )}
                      </button>
                      <div className="h-px bg-[var(--color-border-default)]" />
                    </>
                  )}
                  <div
                    id={listboxId}
                    role="listbox"
                    aria-multiselectable="true"
                    aria-labelledby={label ? `${triggerId}-label` : undefined}
                    aria-label={label ? undefined : "선택 항목 목록"}
                    className="flex max-h-[280px] flex-col gap-group-xs overflow-y-auto"
                  >
                    {filtered.map(renderOption)}
                  </div>
                </>
              )}
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>

        {showClearAll && !disabled && (
          <IconButton
            icon="trash"
            size="sm"
            variant="tertiary"
            appearance="ghost"
            aria-label={clearAllLabel}
            disabled={!hasValue}
            tabIndex={-1}
            onClick={handleClearAll}
          />
        )}
      </div>

      {helperText && (
        <p
          id={helperId}
          className={cn("typography-caption", {
            "text-[var(--color-text-tertiary)]":
              currentState !== "error" && currentState !== "disabled",
            "text-[var(--color-text-disabled)]": currentState === "disabled",
            "text-[var(--color-text-danger-default)]": currentState === "error",
          })}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

MultiSelect.displayName = "MultiSelect";
