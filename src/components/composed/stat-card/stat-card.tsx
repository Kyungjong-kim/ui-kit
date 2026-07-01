import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../utils/cn";
import type { IconName } from "../../primitives/icon";
import { Icon } from "../../primitives/icon";
import { Text } from "../../primitives/text";

/**
 * StatCard — 단일 지표 카드. 라벨·상태·수치·증감·진행바를 순수 수치/라벨로 표시한다.
 *
 * tone 으로 상태 태그 색·증감 색·진행바 색이 일괄 결정된다.
 * - success(정상) / warning(주의) / danger(오류) / neutral(변동 없음)
 */

export type StatCardTone = "success" | "warning" | "danger" | "neutral";

export interface StatCardDelta {
  /** 증감 방향 — up: 증가, down: 감소, none: 변동 없음 */
  direction: "up" | "down" | "none";
  /** 증감 표시 텍스트 (예: '+10') */
  text: string;
}

const statusPill = cva(
  ["inline-flex items-center rounded-full px-2 py-0.5", "typography-label-xs"],
  {
    variants: {
      tone: {
        success: [
          "bg-[var(--color-bg-success-subtle)]",
          "text-[var(--color-text-success-default)]",
        ],
        warning: [
          "bg-[var(--color-bg-warning-subtle)]",
          "text-[var(--color-text-warning-default)]",
        ],
        danger: ["bg-[var(--color-bg-danger-subtle)]", "text-[var(--color-text-danger-default)]"],
        neutral: ["bg-[var(--color-bg-tertiary)]", "text-[var(--color-text-tertiary)]"],
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

type StatCardToneVariants = VariantProps<typeof statusPill>;

export interface StatCardProps extends StatCardToneVariants {
  /** 지표 라벨명 */
  label: string;
  /** 톤 — 태그·증감·진행바 색을 결정 */
  tone: StatCardTone;
  /** 상태 태그 문구 (예: '정상', '주의') */
  statusLabel: string;
  /** 대표 수치 */
  value: string | number;
  /** 수치 단위 (예: '건', '%') */
  unit?: string;
  /** 증감 정보 — 생략 시 증감 행 미표시 */
  delta?: StatCardDelta;
  /** 증감 캡션 — 기본 '직전 기간 대비' */
  deltaCaption?: string;
  /** 진행바 채움 비율 0~100 — 생략 시 진행바 미표시 */
  progress?: number;
  className?: string;
}

const DELTA_COLOR: Record<StatCardTone, string> = {
  success: "text-[var(--color-text-success-default)]",
  warning: "text-[var(--color-text-warning-default)]",
  danger: "text-[var(--color-text-danger-default)]",
  neutral: "text-[var(--color-text-tertiary)]",
};

const BAR_COLOR: Record<StatCardTone, string> = {
  success: "bg-[var(--color-bg-success-default)]",
  warning: "bg-[var(--color-bg-warning-default)]",
  danger: "bg-[var(--color-bg-danger-default)]",
  neutral: "bg-[var(--color-text-tertiary)]",
};

const DELTA_ICON: Record<StatCardDelta["direction"], IconName> = {
  up: "arrowUpThickFalse",
  down: "arrowDownThickFalse",
  none: "point",
};

export function StatCard({
  label,
  tone,
  statusLabel,
  value,
  unit,
  delta,
  deltaCaption = "직전 기간 대비",
  progress,
  className,
}: StatCardProps) {
  return (
    <section
      aria-label={label}
      className={cn(
        "flex flex-col gap-2 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-5 py-4 shadow-default-sm",
        className,
      )}
    >
      {/* 라벨 + 상태 태그 */}
      <div className="flex w-full items-center justify-between">
        <Text variant="typography-label-sm-base" className="text-[var(--color-text-secondary)]">
          {label}
        </Text>
        <span className={statusPill({ tone })}>{statusLabel}</span>
      </div>

      {/* 수치 + 단위 */}
      <div className="flex items-end gap-1 pb-1">
        <Text
          variant="typography-display-sm"
          className={
            tone === "danger"
              ? "text-[var(--color-text-danger-default)]"
              : "text-[var(--color-text-primary)]"
          }
        >
          {value}
        </Text>
        {unit && (
          <Text
            variant="typography-label-lg-base"
            className="pb-1 text-[var(--color-text-tertiary)]"
          >
            {unit}
          </Text>
        )}
      </div>

      {/* 증감 */}
      {delta && (
        <div className="flex items-center gap-2 pb-1">
          <span className={cn("flex items-center gap-1", DELTA_COLOR[tone])}>
            <Icon name={DELTA_ICON[delta.direction]} size={12} color="currentColor" />
            <Text variant="typography-label-sm-medium">{delta.text}</Text>
          </span>
          <Text variant="typography-label-sm-base" className="text-[var(--color-text-tertiary)]">
            {deltaCaption}
          </Text>
        </div>
      )}

      {/* 진행바 */}
      {progress !== undefined && (
        <div
          role="progressbar"
          aria-label={label}
          aria-valuenow={Math.round(Math.min(100, Math.max(0, progress)))}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-[4px] w-full overflow-hidden rounded-full bg-[var(--color-bg-tertiary)]"
        >
          <div
            className={cn("h-full rounded-full", BAR_COLOR[tone])}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </section>
  );
}

StatCard.displayName = "StatCard";
