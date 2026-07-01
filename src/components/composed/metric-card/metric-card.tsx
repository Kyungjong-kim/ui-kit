import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../utils/cn";

/** 추세 방향. */
export type MetricTrendDirection = "up" | "down" | "neutral";

/** 추세 방향별 색상 토큰 맵. */
const trendColorMap: Record<MetricTrendDirection, string> = {
  up: "text-[var(--color-text-success-default)]",
  down: "text-[var(--color-text-danger-default)]",
  neutral: "text-[var(--color-text-tertiary)]",
};

/** 추세 방향별 화살표 아이콘 맵. */
const trendIconMap: Record<MetricTrendDirection, ReactNode> = {
  up: (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
      <path d="M8 3l4.5 5.5H9.5V13h-3V8.5H3.5L8 3z" />
    </svg>
  ),
  down: (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
      <path d="M8 13L3.5 7.5h3V3h3v4.5h3L8 13z" />
    </svg>
  ),
  neutral: (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="h-3.5 w-3.5">
      <path d="M3 7.25h10v1.5H3z" />
    </svg>
  ),
};

export interface MetricTrend {
  /** 추세 방향. */
  direction: MetricTrendDirection;
  /** 증감 값 (예: "12%", "+3"). */
  value: ReactNode;
}

export interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  /** 지표 라벨. */
  label: ReactNode;
  /** 큰 수치 값. */
  value: ReactNode;
  /** 값 뒤에 붙는 단위 (예: "명", "%"). */
  unit?: ReactNode;
  /** 증감 추세 (화살표 + 값). */
  trend?: MetricTrend;
}

/**
 * 컴팩트한 지표 카드. 라벨·큰 수치·단위·추세(증감 화살표+값)를 한 줄 흐름으로 표시한다.
 */
export function MetricCard({ className, label, value, unit, trend, ...props }: MetricCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] p-4",
        className,
      )}
      {...props}
    >
      <span className="text-xs font-medium text-[var(--color-text-tertiary)]">{label}</span>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-semibold leading-none text-[var(--color-text-primary)]">
          {value}
        </span>
        {unit && (
          <span className="text-sm font-medium text-[var(--color-text-tertiary)]">{unit}</span>
        )}
        {trend && (
          <span
            className={cn(
              "ml-auto flex items-center gap-0.5 text-xs font-medium",
              trendColorMap[trend.direction],
            )}
          >
            {trendIconMap[trend.direction]}
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}

MetricCard.displayName = "MetricCard";
