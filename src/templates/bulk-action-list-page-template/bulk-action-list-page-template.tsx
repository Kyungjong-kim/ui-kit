import type { ColumnDef } from "@tanstack/react-table";
import { cva } from "class-variance-authority";
import { type ReactNode, useState } from "react";
import type { PageHeaderProps } from "../../components";
import { DataTable, ListControl, PageHeader, Text } from "../../components";
import { cn } from "../../utils/cn";

const bulkActionBar = cva(
  "flex items-center justify-between gap-group-md rounded-md border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] px-inline-md py-stack-xs",
);

export interface BulkActionListPageTemplateProps<TData> {
  /** 페이지 제목 — PageHeader에 전달 */
  title: string;
  /** 제목 좌측 리딩 아이콘 (선택) */
  leftLeadingIcon?: PageHeaderProps["leftLeadingIcon"];
  /** 헤더 우측 액션 버튼 슬롯 (선택) */
  headerActions?: ReactNode;
  /** 총 개수 — ListControl의 "총 N건" 표시에 사용 */
  count?: number;
  /** 개수 라벨 접미사 (기본값: "건") */
  countUnit?: string;
  /** 검색 입력 슬롯 (ListControl 좌측) */
  search?: ReactNode;
  /** 정렬 컨트롤 슬롯 (ListControl 우측) */
  sort?: ReactNode;
  /** 필터 컨트롤 슬롯 (ListControl 우측) */
  filter?: ReactNode;
  /** DataTable 컬럼 정의 */
  columns: ColumnDef<TData, unknown>[];
  /** DataTable 행 데이터 */
  data: TData[];
  /** 행 고유 id 도출 — DataTable에 전달 */
  getRowId?: (row: TData, index: number) => string;
  /** 헤더 클릭 정렬 활성 */
  enableSorting?: boolean;
  /** 페이지당 행 수 — 지정 시 페이지네이션 활성 */
  pageSize?: number;
  /** 로딩 중 스켈레톤 표시 */
  loading?: boolean;
  /** 빈 데이터 시 렌더할 콘텐츠 — DataTable에 전달 */
  emptyContent?: ReactNode;
  /**
   * 일괄 액션 바 슬롯 — 선택된 행 배열을 받아 액션 버튼을 렌더한다.
   * 1개 이상 선택 시 표시된다.
   */
  bulkActions: (selectedRows: TData[]) => ReactNode;
  /** 선택 개수 라벨 접미사 (기본값: "개 선택됨") */
  selectionUnit?: string;
  className?: string;
}

/**
 * BulkActionListPageTemplate — 행 선택 + 일괄 액션이 있는 목록형 페이지 골격.
 *
 * `ListPageTemplate` 패턴에 행 선택(`DataTable enableRowSelection`)을 추가하고,
 * 1개 이상 선택되면 선택 개수와 `bulkActions` 슬롯 버튼을 담은 액션 바를 노출한다.
 * 선택 상태는 내부에서 관리하며, `bulkActions`는 선택된 행 배열을 인자로 받는다.
 */
export function BulkActionListPageTemplate<TData>({
  title,
  leftLeadingIcon,
  headerActions,
  count,
  countUnit,
  search,
  sort,
  filter,
  columns,
  data,
  getRowId,
  enableSorting,
  pageSize,
  loading,
  emptyContent,
  bulkActions,
  selectionUnit = "개 선택됨",
  className,
}: BulkActionListPageTemplateProps<TData>) {
  const [selectedRows, setSelectedRows] = useState<TData[]>([]);
  const hasControl = count != null || search != null || sort != null || filter != null;
  const hasSelection = selectedRows.length > 0;

  return (
    <div className={cn("flex w-full flex-col gap-stack-xxl", className)}>
      <PageHeader
        title={title}
        leftLeadingIcon={leftLeadingIcon}
        rightTrailingButton={headerActions}
        isLoading={loading}
      />
      <div className="flex flex-col gap-stack-md">
        {hasControl && (
          <ListControl
            count={count}
            countUnit={countUnit}
            search={search}
            sort={sort}
            filter={filter}
          />
        )}
        {hasSelection && (
          <div className={bulkActionBar()}>
            <Text
              variant="typography-body-sm-medium"
              className="whitespace-nowrap text-[var(--color-text-secondary)]"
            >
              <Text
                as="span"
                variant="typography-body-sm-bold"
                className="text-[var(--color-text-primary)]"
              >
                {selectedRows.length.toLocaleString()}
              </Text>
              {selectionUnit}
            </Text>
            <div className="flex items-center gap-group-sm">{bulkActions(selectedRows)}</div>
          </div>
        )}
        <DataTable
          columns={columns}
          data={data}
          getRowId={getRowId}
          enableSorting={enableSorting}
          pageSize={pageSize}
          loading={loading}
          emptyContent={emptyContent}
          enableRowSelection
          onRowSelectionChange={setSelectedRows}
        />
      </div>
    </div>
  );
}

BulkActionListPageTemplate.displayName = "BulkActionListPageTemplate";
