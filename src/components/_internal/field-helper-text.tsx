import { AlertCircleIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface FieldHelperTextProps {
  id?: string;
  error?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

/** 폼 필드 안내·오류 문구(내부 전용). 오류일 때만 경고 아이콘을 앞에 붙여 색 외의 단서를 준다. */
export function FieldHelperText({ id, error, disabled, children }: FieldHelperTextProps) {
  const showError = error && !disabled;
  return (
    <p
      id={id}
      className={cn(
        "flex items-start gap-group-xxs typography-caption",
        disabled
          ? "text-[var(--color-text-disabled)]"
          : showError
            ? "text-[var(--color-text-danger-default)]"
            : "text-[var(--color-text-tertiary)]",
      )}
    >
      {showError && (
        <AlertCircleIcon
          aria-hidden="true"
          className="mt-px h-size-icon-xs w-size-icon-xs shrink-0"
        />
      )}
      {children}
    </p>
  );
}
