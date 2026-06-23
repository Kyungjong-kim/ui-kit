import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

/**
 * Timeline — 날짜(라벨) 그룹 타임라인 레이아웃 (presentational, 도메인 비종속)
 *
 * 좌측 라벨 컬럼 + 세로 divider + 우측 항목 컬럼으로 구성된 그룹 카드를 세로로 나열한다.
 * 항목의 내용·구조는 renderItem 슬롯으로 소비처가 전적으로 결정한다.
 * (무한 스크롤·데이터 패칭·스켈레톤·빈 상태 등은 소비처 책임)
 *
 * 사용 예:
 * ```tsx
 * <Timeline
 *   groups={[{ id: "2026-06-12", label: "06.12", sublabel: "2026", items }]}
 *   getItemKey={(item) => item.id}
 *   renderItem={(item) => <div>{item.text}</div>}
 * />
 * ```
 */

export type TimelineGroup<T> = {
  id: string;
  /** 라벨 컬럼 상단 — 예: "06.12" */
  label: ReactNode;
  /** 라벨 컬럼 하단 보조 라벨 — 예: "2026" */
  sublabel?: ReactNode;
  items: T[];
};

export interface TimelineProps<T> {
  groups: TimelineGroup<T>[];
  renderItem: (item: T, index: number) => ReactNode;
  getItemKey: (item: T, index: number) => string | number;
  /** 라벨 컬럼 너비(px) — 기본 56 */
  labelWidth?: number;
  className?: string;
}

export function Timeline<T>({
  groups,
  renderItem,
  getItemKey,
  labelWidth = 56,
  className,
}: TimelineProps<T>) {
  return (
    <div data-slot="timeline" className={cn("flex flex-col gap-stack-md", className)}>
      {groups.map((group) => (
        <div
          key={group.id}
          className="flex gap-group-xl rounded-lg bg-[var(--color-bg-secondary)] px-inline-xxl py-stack-xl"
        >
          {/* 라벨 컬럼 — 우측 정렬 */}
          <div
            className="flex shrink-0 flex-col items-end text-right"
            style={{ width: labelWidth }}
          >
            <span className="typography-headline-sm text-[var(--color-text-primary)]">
              {group.label}
            </span>
            {group.sublabel != null && (
              <span className="typography-body-md-base text-[var(--color-text-tertiary)]">
                {group.sublabel}
              </span>
            )}
          </div>
          {/* 세로 divider */}
          <div className="w-px self-stretch bg-[var(--color-border-default)]" aria-hidden="true" />
          {/* 항목 컬럼 */}
          <ol className="flex min-w-0 flex-1 flex-col gap-group-lg">
            {group.items.map((item, index) => (
              <li key={getItemKey(item, index)}>{renderItem(item, index)}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

Timeline.displayName = "Timeline";
