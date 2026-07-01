import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../utils/cn";

/** 상태 점 색상 톤. */
export type DotBadgeTone = "success" | "warning" | "danger" | "neutral" | "info";

/** tone 별 점 배경 색상 토큰 맵. */
const dotColorMap: Record<DotBadgeTone, string> = {
  success: "bg-[var(--color-bg-success-default)]",
  warning: "bg-[var(--color-bg-warning-default)]",
  danger: "bg-[var(--color-bg-danger-default)]",
  neutral: "bg-[var(--color-neutral-400)]",
  info: "bg-[var(--color-bg-brand-default)]",
};

export interface DotBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** 점 색상 톤. */
  tone?: DotBadgeTone;
  /** 점 옆 라벨 텍스트. */
  label?: ReactNode;
}

/**
 * 상태 점 배지. tone별 색 dot과 선택적 라벨 텍스트를 인라인으로 표시한다.
 */
export function DotBadge({ className, tone = "neutral", label, ...props }: DotBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-secondary)]",
        className,
      )}
      {...props}
    >
      <span className={cn("h-2 w-2 shrink-0 rounded-full", dotColorMap[tone])} aria-hidden="true" />
      {label}
    </span>
  );
}

DotBadge.displayName = "DotBadge";
