import * as React from "react";
import { cn } from "../../../utils/cn";
import { Slider } from "../../primitives/slider";

export interface SliderFieldProps {
  /** 라벨 (상단 좌측) */
  label?: string;
  /** 선택 값 (제어형) — 단일 또는 범위 */
  value?: number | number[];
  /** 기본 값 (비제어형) */
  defaultValue?: number | number[];
  /** 변경 콜백 */
  onChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  /** 슬라이더 사이즈 */
  size?: "sm" | "md";
  disabled?: boolean;
  /** 하단 헬퍼 텍스트 */
  helperText?: string;
  /** 현재 값 표시 (기본 true) */
  showValue?: boolean;
  /** 값 포맷터 (예: (v) => `${v}%`) */
  formatValue?: (value: number) => string;
  /** 하단 min/max 경계 라벨 표시 */
  showBounds?: boolean;
  className?: string;
}

function toArray(value?: number | number[]): number[] | undefined {
  if (value == null) return undefined;
  return Array.isArray(value) ? value : [value];
}

/**
 * SliderField — 라벨 + Slider + 값 표시를 묶은 폼 필드.
 * 단일/범위 값, 포맷터, min/max 경계 라벨을 지원한다.
 * value+onChange(제어) 또는 defaultValue(비제어)를 지원한다.
 */
export function SliderField({
  label,
  value,
  defaultValue = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  size = "md",
  disabled,
  helperText,
  showValue = true,
  formatValue,
  showBounds,
  className,
}: SliderFieldProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<number[]>(toArray(defaultValue) ?? [min]);
  const current = isControlled ? (toArray(value) ?? [min]) : internal;

  const handleChange = (next: number[]) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const format = (v: number) => (formatValue ? formatValue(v) : String(v));
  const displayValue = current.map(format).join(" – ");

  return (
    <div className={cn("flex flex-col gap-group-xs", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span
              className={cn(
                "typography-label-md-medium",
                disabled ? "text-[var(--color-text-disabled)]" : "text-[var(--color-text-primary)]",
              )}
            >
              {label}
            </span>
          )}
          {showValue && (
            <span
              className={cn(
                "typography-label-md-medium tabular-nums",
                disabled
                  ? "text-[var(--color-text-disabled)]"
                  : "text-[var(--color-text-brand-default)]",
              )}
            >
              {displayValue}
            </span>
          )}
        </div>
      )}

      <Slider
        value={isControlled ? current : undefined}
        defaultValue={isControlled ? undefined : internal}
        onValueChange={handleChange}
        min={min}
        max={max}
        step={step}
        size={size}
        disabled={disabled}
        aria-label={label}
      />

      {showBounds && (
        <div className="flex items-center justify-between typography-caption text-[var(--color-text-tertiary)]">
          <span>{format(min)}</span>
          <span>{format(max)}</span>
        </div>
      )}

      {helperText && (
        <p
          className={cn(
            "typography-caption",
            disabled ? "text-[var(--color-text-disabled)]" : "text-[var(--color-text-tertiary)]",
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

SliderField.displayName = "SliderField";
