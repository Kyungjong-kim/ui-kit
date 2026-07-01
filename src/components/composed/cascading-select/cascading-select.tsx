import * as React from "react";
import { cn } from "../../../utils/cn";
import { Select, type SelectOption } from "../../primitives/select";

/** 단계(레벨) 정의 */
export interface CascadingLevel {
  /** 레벨 식별 키 (value 맵의 키로 사용) */
  key: string;
  /** 레벨 라벨 */
  label?: string;
  /** 플레이스홀더 */
  placeholder?: string;
  /**
   * 해당 레벨의 옵션 목록.
   * 상위 레벨에서 선택된 값들의 맵을 받아 종속 옵션을 계산한다.
   */
  options: (selected: Record<string, string>) => SelectOption[];
}

export interface CascadingSelectProps {
  /** 단계 정의 목록 (상위 → 하위 순서) */
  levels: CascadingLevel[];
  /** 선택 값 맵 (제어형) — { [levelKey]: value } */
  value?: Record<string, string>;
  /** 기본 선택 값 맵 (비제어형) */
  defaultValue?: Record<string, string>;
  /** 변경 콜백 — 하위 레벨은 자동 초기화된 맵을 전달 */
  onChange?: (value: Record<string, string>) => void;
  /** 사이즈 */
  size?: "sm" | "md" | "lg";
  /** 전체 비활성화 */
  disabled?: boolean;
  className?: string;
}

/**
 * CascadingSelect — 단계 종속 select.
 * 상위 단계 선택이 바뀌면 하위 단계 옵션이 갱신되고 하위 선택은 초기화된다.
 * value+onChange(제어) 또는 defaultValue(비제어)를 지원한다.
 */
export function CascadingSelect({
  levels,
  value,
  defaultValue,
  onChange,
  size = "md",
  disabled,
  className,
}: CascadingSelectProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<Record<string, string>>(defaultValue ?? {});
  const selected = isControlled ? value : internal;

  const handleSelect = (levelIndex: number, levelKey: string, next: string) => {
    // 현재 레벨 갱신 + 하위 레벨 전부 초기화
    const kept: Record<string, string> = {};
    for (let i = 0; i < levelIndex; i++) {
      const k = levels[i].key;
      if (selected[k] !== undefined) kept[k] = selected[k];
    }
    kept[levelKey] = next;
    if (!isControlled) setInternal(kept);
    onChange?.(kept);
  };

  return (
    <div className={cn("flex flex-col gap-group-md", className)}>
      {levels.map((level, index) => {
        const opts = level.options(selected);
        // 상위 레벨이 아직 선택되지 않았으면 비활성화
        const prevKey = index > 0 ? levels[index - 1].key : undefined;
        const prevUnset = prevKey !== undefined && !selected[prevKey];
        return (
          <Select
            key={level.key}
            label={level.label}
            placeholder={level.placeholder}
            options={opts}
            value={selected[level.key] ?? ""}
            onValueChange={(v) => handleSelect(index, level.key, v)}
            size={size}
            disabled={disabled || prevUnset}
          />
        );
      })}
    </div>
  );
}

CascadingSelect.displayName = "CascadingSelect";
