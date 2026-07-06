import * as React from "react";
import { cn } from "../../../utils/cn";
import { Input } from "../../primitives/input";
import { Tag } from "../../primitives/tag";
import { IconButton } from "../icon-button";

/**
 * TagInput — 자유 입력 태그 컴포넌트
 *
 * 입력 필드 + `+` 버튼으로 태그를 추가하고, 아래에 칩 목록(개별 ×)·"Clear all (N)"을 표시한다.
 * - Enter 또는 `+` 클릭으로 추가 (IME 조합 중 Enter는 무시)
 * - trim·중복 차단, maxLength(글자수)·maxTags(개수)·pattern(허용 문자) 검증 → 인라인 helperText 에러
 * - maxTags 도달 시 입력 비활성 + placeholder 변경
 *
 * 제어 컴포넌트 — value(string[]) / onChange 필수.
 */
export interface TagInputProps {
  /** 현재 태그 목록 */
  value: string[];
  /** 태그 변경 콜백 */
  onChange: (tags: string[]) => void;
  /** 라벨 텍스트 */
  label?: string;
  /** 라벨 위치 — inline(좌측, 기본) / top(상단) */
  labelPosition?: "inline" | "top";
  /** 입력 placeholder */
  placeholder?: string;
  /** maxTags 도달 시 placeholder (미지정 시 placeholder 유지) */
  disabledPlaceholder?: string;
  /** 태그 최대 개수 — 도달 시 입력 비활성 */
  maxTags?: number;
  /** 태그당 최대 글자 수 — 초과 입력 차단 */
  maxLength?: number;
  /**
   * 허용 "문자 집합" 정규식 — 입력 중 위반 문자를 실시간 차단(예: `/^[\w-]*$/`).
   * 입력 단계마다 부분 문자열을 검증하므로 길이·형식 정규식은 부적합.
   * g·y 플래그는 내부에서 제거해 테스트한다(lastIndex 상태성 회피).
   */
  pattern?: RegExp;
  /** 기본 안내 문구(에러 없을 때) */
  helperText?: string;
  /** maxLength 초과 에러 문구 */
  maxLengthError?: string;
  /** pattern 위반 에러 문구 */
  patternError?: string;
  /** 중복 추가 에러 문구 — string 또는 `(tag) => string` 동적 보간 함수 */
  duplicateError?: string | ((tag: string) => string);
  /** 전체 비활성화 */
  disabled?: boolean;
  /** "Clear all (N)" 노출 (기본 true) */
  showClearAll?: boolean;
  /** 우측 `+` 추가 버튼 노출 (기본 true). false 시 Enter 만으로 추가 */
  showAddButton?: boolean;
  /** `+` 추가 버튼 aria-label */
  addButtonLabel?: string;
  /** "Clear all (N)" 라벨 생성 함수 */
  clearAllLabel?: (count: number) => string;
  className?: string;
  id?: string;
}

const normalizeTag = (raw: string) => raw.trim();

// g·y 플래그가 있는 정규식은 .test() 가 lastIndex 를 누적해 결과가 번갈아 틀어진다.
// 매 호출 새 정규식(플래그 제거)으로 테스트해 상태성을 제거한다.
const matchesPattern = (pattern: RegExp, s: string) =>
  new RegExp(pattern.source, pattern.flags.replace(/[gy]/g, "")).test(s);

export function TagInput({
  value,
  onChange,
  label,
  labelPosition = "inline",
  placeholder = "Type and press Enter or +",
  disabledPlaceholder,
  maxTags,
  maxLength,
  pattern,
  helperText,
  maxLengthError,
  patternError = "Contains an unsupported character.",
  duplicateError = "Already added.",
  disabled = false,
  showClearAll = true,
  showAddButton = true,
  addButtonLabel = "추가",
  clearAllLabel = (count) => `전체 삭제 (${count})`,
  className,
  id,
}: TagInputProps) {
  const [input, setInput] = React.useState("");
  const [error, setError] = React.useState("");
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  const tags = value;
  const isMaxReached = maxTags !== undefined && tags.length >= maxTags;
  const inputDisabled = disabled || isMaxReached;
  const canAdd = !inputDisabled && normalizeTag(input).length > 0;

  const resolvedMaxLengthError =
    maxLengthError ??
    (maxLength !== undefined ? `Up to ${maxLength} characters.` : "Input length exceeded.");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (maxLength !== undefined && next.length > maxLength) {
      setError(resolvedMaxLengthError);
      return;
    }
    if (pattern && !matchesPattern(pattern, next)) {
      setError(patternError);
      return;
    }
    setError("");
    setInput(next);
  };

  const addTag = () => {
    if (inputDisabled) return;
    const normalized = normalizeTag(input);
    if (!normalized) return;
    if (tags.includes(normalized)) {
      const msg =
        typeof duplicateError === "function" ? duplicateError(normalized) : duplicateError;
      setError(msg);
      return;
    }
    setError("");
    onChange([...tags, normalized]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    // IME 조합 중 Enter는 무시 (조합 종료용 Enter가 중복 추가되는 버그 방지)
    if (e.nativeEvent.isComposing || e.keyCode === 229) return;
    e.preventDefault();
    addTag();
  };

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    onChange([]);
    setInput("");
    setError("");
  };

  const resolvedPlaceholder =
    isMaxReached && disabledPlaceholder ? disabledPlaceholder : placeholder;
  const showInlineLabel = !!label && labelPosition === "inline";
  const showTopLabel = !!label && labelPosition === "top";

  return (
    <div className={cn("flex flex-col gap-group-xs", className)}>
      {showTopLabel && (
        <label
          htmlFor={inputId}
          className={cn(
            "typography-label-md-medium",
            inputDisabled
              ? "text-[var(--color-text-disabled)]"
              : "text-[var(--color-text-primary)]",
          )}
        >
          {label}
        </label>
      )}
      <div className="flex items-start gap-group-sm">
        {showInlineLabel && (
          <label
            htmlFor={inputId}
            className={cn(
              "flex h-size-control-md shrink-0 items-center typography-label-md-medium",
              inputDisabled
                ? "text-[var(--color-text-disabled)]"
                : "text-[var(--color-text-primary)]",
            )}
          >
            {label}
          </label>
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-group-sm">
          <Input
            id={inputId}
            className="w-full"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={resolvedPlaceholder}
            disabled={inputDisabled}
            error={!!error}
            helperText={error || helperText}
          />

          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-group-xs">
              {tags.map((tag, i) => (
                <Tag key={tag} size="sm" onRemove={disabled ? undefined : () => removeTag(i)}>
                  {tag}
                </Tag>
              ))}
              {showClearAll && !disabled && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="ml-auto shrink-0 cursor-pointer typography-label-sm-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                >
                  {clearAllLabel(tags.length)}
                </button>
              )}
            </div>
          )}
        </div>

        {showAddButton && (
          <IconButton
            icon="plus"
            size="md"
            variant="primary"
            appearance="filled"
            disabled={!canAdd}
            onClick={addTag}
            aria-label={addButtonLabel}
          />
        )}
      </div>
    </div>
  );
}

TagInput.displayName = "TagInput";
