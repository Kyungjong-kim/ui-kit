import { cva } from "class-variance-authority";
import type { ReactNode } from "react";
import type { DataItemsField, PageHeaderProps } from "../../components";
import { DataItemsTable, ListControl, PageHeader } from "../../components";
import { cn } from "../../utils/cn";

const dataItemsLayout = cva("flex w-full flex-col gap-stack-xxl");

export interface DataItemsLayoutProps<T> {
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
  /** DataItemsTable 카드 필드 정의 */
  fields: DataItemsField<T>[];
  /** DataItemsTable 아이템 데이터 */
  data: T[];
  /** 카드 그리드 최소 컬럼 폭(px) — DataItemsTable에 전달 */
  minCardWidth?: number;
  /** 빈 데이터 안내 문구 — DataItemsTable에 전달 */
  emptyMessage?: string;
  /** 로딩 중 헤더 스켈레톤 표시 */
  loading?: boolean;
  className?: string;
}

/**
 * DataItemsLayout — 카드형 목록 페이지의 레이아웃 골격.
 *
 * `PageHeader`(제목·액션) + `ListControl`(개수·검색·정렬·필터) + `DataItemsTable`(카드 그리드)을
 * 세로로 조합한다. 표 대신 라벨-값 카드로 아이템을 보여주는 목록형 페이지에 사용한다.
 */
export function DataItemsLayout<T>({
  title,
  leftLeadingIcon,
  headerActions,
  count,
  countUnit,
  search,
  sort,
  filter,
  fields,
  data,
  minCardWidth,
  emptyMessage,
  loading,
  className,
}: DataItemsLayoutProps<T>) {
  const hasControl = count != null || search != null || sort != null || filter != null;

  return (
    <div className={cn(dataItemsLayout(), className)}>
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
        <DataItemsTable
          fields={fields}
          data={data}
          minCardWidth={minCardWidth}
          emptyMessage={emptyMessage}
        />
      </div>
    </div>
  );
}

DataItemsLayout.displayName = "DataItemsLayout";
