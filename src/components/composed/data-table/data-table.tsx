import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowSelectionState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDownIcon, ChevronsUpDownIcon, ChevronUpIcon } from "lucide-react";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { cn } from "../../../utils/cn";
import { Checkbox } from "../../primitives/checkbox";
import { Pagination } from "../../primitives/pagination";
import { Skeleton } from "../../primitives/skeleton";
import { EmptyState } from "../empty-state";

/**
 * DataTable — TanStack Table 기반 데이터 테이블.
 *
 * - `enableSorting`: 헤더 클릭 정렬(오름/내림 토글).
 * - `pageSize`: 지정 시 클라이언트 페이지네이션 활성(하단 `Pagination`).
 * - `enableRowSelection`: 행 체크박스 선택(헤더 전체 선택 포함).
 * - `loading`: 스켈레톤 행 렌더. `data`가 비면 `emptyContent`(기본 `EmptyState`) 렌더.
 */

export interface DataTableProps<TData> {
  /** 행 데이터 배열 */
  data: TData[];
  /** TanStack 컬럼 정의 */
  columns: ColumnDef<TData, unknown>[];
  /** 행 고유 id 도출 — 생략 시 인덱스 사용 */
  getRowId?: (row: TData, index: number) => string;
  /** 헤더 클릭 정렬 활성 */
  enableSorting?: boolean;
  /** 페이지당 행 수 — 지정 시 페이지네이션 활성 */
  pageSize?: number;
  /** 행 체크박스 선택 활성 */
  enableRowSelection?: boolean;
  /** 선택된 행이 바뀔 때 호출 */
  onRowSelectionChange?: (selectedRows: TData[]) => void;
  /** 로딩 중 스켈레톤 행 표시 */
  loading?: boolean;
  /** 빈 데이터 시 렌더할 콘텐츠 — 생략 시 기본 EmptyState */
  emptyContent?: ReactNode;
  className?: string;
}

const SELECT_COLUMN_ID = "__select__";

export function DataTable<TData>({
  data,
  columns,
  getRowId,
  enableSorting = false,
  pageSize,
  enableRowSelection = false,
  onRowSelectionChange,
  loading = false,
  emptyContent,
  className,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const isPaginated = pageSize !== undefined;

  const resolvedColumns = useMemo<ColumnDef<TData, unknown>[]>(() => {
    if (!enableRowSelection) return columns;
    const selectionColumn: ColumnDef<TData, unknown> = {
      id: SELECT_COLUMN_ID,
      enableSorting: false,
      header: ({ table }) => (
        <Checkbox
          aria-label="전체 선택"
          checked={
            table.getIsAllRowsSelected()
              ? true
              : table.getIsSomeRowsSelected()
                ? "indeterminate"
                : false
          }
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          aria-label="행 선택"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
    };
    return [selectionColumn, ...columns];
  }, [columns, enableRowSelection]);

  const table = useReactTable({
    data,
    columns: resolvedColumns,
    getRowId,
    enableRowSelection,
    state: {
      ...(enableSorting ? { sorting } : {}),
      ...(isPaginated ? { pagination: { pageIndex, pageSize } } : {}),
      ...(enableRowSelection ? { rowSelection } : {}),
    },
    onSortingChange: enableSorting ? setSorting : undefined,
    onRowSelectionChange: enableRowSelection ? setRowSelection : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getPaginationRowModel: isPaginated ? getPaginationRowModel() : undefined,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: table 참조는 안정적이라 rowSelection을 명시해야 선택 변경 시 재실행된다
  useEffect(() => {
    if (!enableRowSelection || !onRowSelectionChange) return;
    onRowSelectionChange(table.getSelectedRowModel().rows.map((row) => row.original));
  }, [enableRowSelection, onRowSelectionChange, rowSelection, table]);

  const pageCount = table.getPageCount();
  const leafColumnCount = table.getAllLeafColumns().length;
  const rows = table.getRowModel().rows;
  const isEmpty = !loading && data.length === 0;
  const skeletonRowCount = pageSize ?? 3;

  return (
    <div className={cn("flex w-full flex-col gap-group-md", className)}>
      <div className="w-full overflow-x-auto rounded-lg border border-[var(--color-border-default)]">
        <table className="w-full border-collapse text-left">
          <thead className="bg-[var(--color-bg-secondary)]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = enableSorting && header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      aria-sort={
                        sortDir === "asc"
                          ? "ascending"
                          : sortDir === "desc"
                            ? "descending"
                            : undefined
                      }
                      className="typography-label-sm-medium border-b border-[var(--color-border-default)] px-inline-lg py-stack-md text-[var(--color-text-secondary)]"
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="inline-flex items-center gap-group-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[var(--color-border-focus)]"
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {sortDir === "asc" ? (
                            <ChevronUpIcon className="h-3.5 w-3.5" />
                          ) : sortDir === "desc" ? (
                            <ChevronDownIcon className="h-3.5 w-3.5" />
                          ) : (
                            <ChevronsUpDownIcon className="h-3.5 w-3.5 text-[var(--color-text-tertiary)]" />
                          )}
                        </button>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: skeletonRowCount }, (_, rowIdx) => (
                <tr
                  // biome-ignore lint/suspicious/noArrayIndexKey: 스켈레톤은 정적 플레이스홀더
                  key={`skeleton-${rowIdx}`}
                  className="border-b border-[var(--color-border-default)] last:border-b-0"
                >
                  {Array.from({ length: leafColumnCount }, (_, colIdx) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: 스켈레톤은 정적 플레이스홀더
                    <td key={`skeleton-${rowIdx}-${colIdx}`} className="px-inline-lg py-stack-md">
                      <Skeleton className="h-4 w-full" rounded="sm" />
                    </td>
                  ))}
                </tr>
              ))
            ) : isEmpty ? (
              <tr>
                <td colSpan={leafColumnCount} className="px-inline-lg py-stack-md">
                  {emptyContent ?? <EmptyState title="데이터가 없습니다" />}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  className="border-b border-[var(--color-border-default)] transition-colors last:border-b-0 hover:bg-[var(--color-bg-secondary)] data-[state=selected]:bg-[var(--color-bg-secondary)]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="typography-body-sm-base px-inline-lg py-stack-md text-[var(--color-text-primary)]"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isPaginated && pageCount > 1 && (
        <div className="flex justify-end">
          <Pagination
            currentPage={pageIndex + 1}
            totalPages={pageCount}
            onPageChange={(page) => setPageIndex(page - 1)}
          />
        </div>
      )}
    </div>
  );
}

DataTable.displayName = "DataTable";
