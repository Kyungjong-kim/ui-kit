import * as React from "react";
import { cn } from "../../../utils/cn";
import { Button } from "../../primitives/button";
import { Icon } from "../../primitives/icon";
import { Popover, PopoverContent, PopoverTrigger } from "../../primitives/popover";
import { DatePicker } from "../date-picker";

/** 기간 프리셋 키 */
export type PeriodPreset = "today" | "last7" | "last30" | "custom";

/** 기간 필터 값 — custom일 때만 start/end 사용 */
export interface PeriodValue {
  preset: PeriodPreset;
  start?: Date;
  end?: Date;
}

const PRESET_LABELS: Record<PeriodPreset, string> = {
  today: "오늘",
  last7: "최근 7일",
  last30: "최근 30일",
  custom: "사용자 지정",
};

const PRESET_ORDER: PeriodPreset[] = ["today", "last7", "last30", "custom"];

function formatDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
}

/** 트리거에 표시할 요약 텍스트 */
function summarize(value: PeriodValue): string {
  if (value.preset === "custom") {
    if (value.start && value.end) return `${formatDate(value.start)} – ${formatDate(value.end)}`;
    if (value.start) return `${formatDate(value.start)} –`;
    return PRESET_LABELS.custom;
  }
  return PRESET_LABELS[value.preset];
}

export interface PeriodFilterDropdownProps {
  /** 선택 값 (제어형) */
  value?: PeriodValue;
  /** 기본 값 (비제어형) */
  defaultValue?: PeriodValue;
  /** 변경 콜백 */
  onChange?: (value: PeriodValue) => void;
  /** 프리셋 라벨 오버라이드 */
  presetLabels?: Partial<Record<PeriodPreset, string>>;
  /** 노출할 프리셋 (기본: 전체) */
  presets?: PeriodPreset[];
  /** 전체 비활성화 */
  disabled?: boolean;
  className?: string;
}

/**
 * PeriodFilterDropdown — 기간 프리셋 필터.
 * 오늘/최근 7일/최근 30일 프리셋과 사용자 지정(시작·종료일) 범위를 Popover로 선택한다.
 * value+onChange(제어) 또는 defaultValue(비제어)를 지원한다.
 */
export function PeriodFilterDropdown({
  value,
  defaultValue = { preset: "today" },
  onChange,
  presetLabels,
  presets = PRESET_ORDER,
  disabled,
  className,
}: PeriodFilterDropdownProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<PeriodValue>(defaultValue);
  const current = isControlled ? value : internal;
  const [open, setOpen] = React.useState(false);

  const labelOf = (p: PeriodPreset) => presetLabels?.[p] ?? PRESET_LABELS[p];

  const commit = (next: PeriodValue) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const handlePreset = (preset: PeriodPreset) => {
    if (preset === "custom") {
      commit({ preset, start: current.start, end: current.end });
    } else {
      commit({ preset });
      setOpen(false);
    }
  };

  const handleOpenChange = (o: boolean) => {
    if (disabled) return;
    setOpen(o);
  };

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
            className,
          )}
        >
          <Icon
            name="clockCounterClockwise"
            size="sm"
            color={disabled ? "disabled" : "secondary"}
          />
          <span>{summarize(current)}</span>
          <Icon
            name="chevronDownThickFalse"
            size="sm"
            color={disabled ? "disabled" : "secondary"}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-inline-md">
        <div className="flex flex-col gap-group-xs">
          {presets.map((preset) => {
            const active = current.preset === preset;
            return (
              <button
                key={preset}
                type="button"
                onClick={() => handlePreset(preset)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xs px-inline-md py-stack-xs text-left",
                  "typography-label-md-base transition-colors",
                  active
                    ? "bg-[var(--color-bg-brand-subtle)] typography-label-md-medium text-[var(--color-text-brand-default)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]",
                )}
              >
                <span>{labelOf(preset)}</span>
                {active && <Icon name="checkThickTrue" size="xs" color="brandDefault" />}
              </button>
            );
          })}
        </div>

        {current.preset === "custom" && (
          <div className="mt-group-md flex flex-col gap-group-sm border-t border-[var(--color-border-default)] pt-group-md">
            <div className="flex flex-col gap-group-xxs">
              <span className="typography-label-sm-medium text-[var(--color-text-tertiary)]">
                시작일
              </span>
              <DatePicker
                value={current.start}
                placeholder="시작일 선택"
                maxDate={current.end}
                onChange={(d) => commit({ preset: "custom", start: d, end: current.end })}
              />
            </div>
            <div className="flex flex-col gap-group-xxs">
              <span className="typography-label-sm-medium text-[var(--color-text-tertiary)]">
                종료일
              </span>
              <DatePicker
                value={current.end}
                placeholder="종료일 선택"
                minDate={current.start}
                onChange={(d) => commit({ preset: "custom", start: current.start, end: d })}
              />
            </div>
            <Button
              variant="primary"
              size="sm"
              className="mt-group-xs w-full"
              disabled={!current.start || !current.end}
              onClick={() => setOpen(false)}
            >
              적용
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

PeriodFilterDropdown.displayName = "PeriodFilterDropdown";
