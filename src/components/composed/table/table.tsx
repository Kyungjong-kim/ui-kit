import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

/** 테이블 컬럼 정의. render로 셀 커스터마이징 가능. */
export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  render?: (row: T, rowIndex: number) => ReactNode;
  className?: string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  emptyMessage?: string;
  className?: string;
}

/** columns + data로 thead/tbody를 렌더하는 정적 테이블. 정렬·페이지네이션 없음. */
export function Table<T>({
  columns,
  data,
  emptyMessage = "데이터가 없습니다",
  className,
}: TableProps<T>) {
  const isEmpty = data.length === 0;

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border-default)]">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "px-4 py-3 text-left font-semibold text-[var(--color-text-secondary)]",
                  column.className,
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isEmpty ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-[var(--color-text-tertiary)]"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                // biome-ignore lint/suspicious/noArrayIndexKey: 정적 표시용 테이블(정렬·재정렬은 DataTable 담당)
                key={rowIndex}
                className="border-b border-[var(--color-border-default)] last:border-b-0"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn("px-4 py-3 text-[var(--color-text-primary)]", column.className)}
                  >
                    {column.render
                      ? column.render(row, rowIndex)
                      : ((row as Record<string, ReactNode>)[column.key] ?? null)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

Table.displayName = "Table";
