import * as Label from "@radix-ui/react-label";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { useId, useState } from "react";
import { cn } from "../../../utils/cn";
import { joinIds } from "../../../utils/join-ids";

export interface SliderProps {
  value?: number | number[];
  defaultValue?: number | number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: "sm" | "md";
  label?: string;
  helperText?: string;
  showValue?: boolean;
  className?: string;
  /** 보이는 label 없이 쓸 때 thumb 의 접근 가능한 이름 (label 이 있으면 label 우선) */
  "aria-label"?: string;
  /** thumb 에 추가로 연결할 설명 요소 id */
  "aria-describedby"?: string;
}

function toArray(value?: number | number[]): number[] | undefined {
  if (value == null) return undefined;
  return Array.isArray(value) ? value : [value];
}

export function Slider({
  value,
  defaultValue = 0,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  size = "md",
  label,
  helperText,
  showValue,
  className,
  "aria-label": ariaLabel,
  "aria-describedby": describedBy,
}: SliderProps) {
  const generatedId = useId();
  const helperId = `${generatedId}-helper`;
  const valueArray = toArray(value);
  const defaultArray = toArray(defaultValue);
  // 비제어일 때 표시 값이 첫 값에 고정되지 않도록 Radix 의 변경을 따라간다
  const [internalArray, setInternalArray] = useState<number[]>(defaultArray ?? [min]);
  const displayValue = (valueArray ?? internalArray).join(" – ");

  function handleValueChange(next: number[]) {
    if (!valueArray) setInternalArray(next);
    onValueChange?.(next);
  }

  return (
    <div className="flex flex-col gap-group-xs">
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <Label.Root
              htmlFor={generatedId}
              className="typography-label-md-medium text-[var(--color-text-primary)]"
            >
              {label}
            </Label.Root>
          )}
          {showValue && (
            <span className="typography-label-sm-base text-[var(--color-text-tertiary)]">
              {displayValue}
            </span>
          )}
        </div>
      )}
      <SliderPrimitive.Root
        id={generatedId}
        value={valueArray}
        defaultValue={valueArray ? undefined : defaultArray}
        onValueChange={handleValueChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
          className,
        )}
      >
        <SliderPrimitive.Track
          className={cn(
            "relative w-full grow overflow-hidden rounded-full bg-[var(--color-bg-tertiary)]",
            size === "sm" ? "h-stack-xxs" : "h-stack-xs",
          )}
        >
          <SliderPrimitive.Range className="absolute h-full bg-[var(--color-bg-brand-default)]" />
        </SliderPrimitive.Track>
        {(valueArray ?? defaultArray ?? [min]).map((_, index) => (
          <SliderPrimitive.Thumb
            // biome-ignore lint/suspicious/noArrayIndexKey: thumb 개수는 value 길이로 고정
            key={index}
            className={cn(
              "block shrink-0 cursor-grab rounded-full border-2 border-[var(--color-bg-brand-default)] bg-[var(--color-bg-primary)] shadow-default-md transition-transform",
              "hover:scale-110 active:scale-105 active:cursor-grabbing",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-border-focus)]",
              "disabled:pointer-events-none",
              size === "sm" ? "size-4" : "size-5",
            )}
            aria-label={label ?? ariaLabel}
            aria-describedby={joinIds(describedBy, helperText && helperId)}
          />
        ))}
      </SliderPrimitive.Root>
      {helperText && (
        <p id={helperId} className="typography-caption text-[var(--color-text-tertiary)]">
          {helperText}
        </p>
      )}
    </div>
  );
}

Slider.displayName = "Slider";
