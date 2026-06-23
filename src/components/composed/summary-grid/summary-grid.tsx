import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { TextSkeleton } from "../text-skeleton";

/**
 * SummaryGrid — 세로형 항목 다열 그리드.
 *
 * 라벨+값 셀을 격자로 배치한다. columns로 lg 이상에서의 열 수를 지정하며(기본 4),
 * 모바일에서는 항상 2열이다. loading 시 children 대신 스켈레톤 셀을 렌더한다.
 */
export interface SummaryGridProps {
  children: ReactNode;
  /** lg 이상에서의 열 수 (기본 4). 모바일은 항상 2열. */
  columns?: 2 | 3 | 4;
  /** 로딩 시 children 대신 스켈레톤 셀(라벨+값)을 렌더. */
  loading?: boolean;
  /** 로딩 시 스켈레톤 셀 수 (기본 = columns). */
  skeletonCount?: number;
  className?: string;
}

const COLUMN_CLASS = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
} as const;

export function SummaryGrid({
  children,
  columns = 4,
  loading = false,
  skeletonCount,
  className,
}: SummaryGridProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-x-4 gap-y-3", COLUMN_CLASS[columns], className)}>
      {loading
        ? Array.from({ length: skeletonCount ?? columns }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: 정적 스켈레톤 셀 — 순서 변경 없음
            <div key={i} className="flex flex-col gap-2">
              <TextSkeleton size="sm" width={50} />
              <TextSkeleton width={70} />
            </div>
          ))
        : children}
    </div>
  );
}

SummaryGrid.displayName = "SummaryGrid";
