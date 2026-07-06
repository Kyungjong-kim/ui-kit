import type { ReactNode } from "react";

/** 예제 요소를 가로 정렬하는 래퍼. label 지정 시 좌측에 캡션 표시. */
export function Row({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {label && (
        <span className="min-w-20 text-xs font-medium text-[var(--color-text-tertiary)]">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}
