import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

/** 카드형 아이템의 라벨-값 필드 정의. render로 값 커스터마이징 가능. */
export interface DataItemsField<T> {
  key: string;
  label: ReactNode;
  render?: (item: T, index: number) => ReactNode;
}

export interface DataItemsTableProps<T> {
  fields: DataItemsField<T>[];
  data: T[];
  /** 카드 그리드 최소 컬럼 폭(px). 반응형 auto-fill 기준. */
  minCardWidth?: number;
  emptyMessage?: string;
  className?: string;
}

/** 각 행을 라벨-값 쌍 카드로 렌더하는 반응형 아이템 목록형 테이블. */
export function DataItemsTable<T>({
  fields,
  data,
  minCardWidth = 260,
  emptyMessage = "데이터가 없습니다",
  className,
}: DataItemsTableProps<T>) {
  if (data.length === 0) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-lg border border-[var(--color-border-default)] px-4 py-8 text-center text-sm text-[var(--color-text-tertiary)]",
          className,
        )}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={cn("grid gap-4", className)}
      style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${minCardWidth}px, 1fr))` }}
    >
      {data.map((item, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: 정적 카드 목록(재정렬 없음)
          key={index}
          className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] p-4"
        >
          <dl className="grid grid-cols-[minmax(0,auto)_1fr] gap-x-4 gap-y-2 text-sm">
            {fields.map((field) => (
              <div key={field.key} className="contents">
                <dt className="font-medium text-[var(--color-text-secondary)]">{field.label}</dt>
                <dd className="text-right text-[var(--color-text-primary)]">
                  {field.render
                    ? field.render(item, index)
                    : ((item as Record<string, ReactNode>)[field.key] ?? null)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

DataItemsTable.displayName = "DataItemsTable";
