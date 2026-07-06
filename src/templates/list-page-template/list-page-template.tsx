import type { ColumnDef } from "@tanstack/react-table";
import { cva } from "class-variance-authority";
import type { ReactNode } from "react";
import type { PageHeaderProps } from "../../components";
import { DataTable, ListControl, PageHeader } from "../../components";
import { cn } from "../../utils/cn";

const listPageTemplate = cva("flex w-full flex-col gap-stack-xxl");

export interface ListPageTemplateProps<TData> {
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
  className?: string;
}

/**
 * ListPageTemplate — 목록형 페이지의 레이아웃 골격.
 *
 * `PageHeader`(제목·액션) + `ListControl`(개수·검색·정렬·필터) + `DataTable`(목록)을
 * 세로로 조합한다. 필터·검색·정렬·액션은 슬롯 props로 주입하고, 컬럼·데이터는
 * `DataTable`에 그대로 전달한다.
 */
export function ListPageTemplate<TData>({
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
  className,
}: ListPageTemplateProps<TData>) {
  const hasControl = count != null || search != null || sort != null || filter != null;

  return (
    <div className={cn(listPageTemplate(), className)}>
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
        <DataTable
          columns={columns}
          data={data}
          getRowId={getRowId}
          enableSorting={enableSorting}
          pageSize={pageSize}
          loading={loading}
          emptyContent={emptyContent}
        />
      </div>
    </div>
  );
}

ListPageTemplate.displayName = "ListPageTemplate";
