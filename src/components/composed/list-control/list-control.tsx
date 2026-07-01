import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { Text } from "../../primitives/text";

export interface ListControlProps {
  /** 총 개수 — 지정 시 "총 N건" 형태로 표시한다 */
  count?: number;
  /** 개수 라벨 접미사 (기본값: "건") */
  countUnit?: string;
  /** 검색 입력 슬롯 (좌측) */
  search?: ReactNode;
  /** 정렬 컨트롤 슬롯 (우측) */
  sort?: ReactNode;
  /** 필터 컨트롤 슬롯 (우측) */
  filter?: ReactNode;
  className?: string;
}

/**
 * ListControl — 목록 상단 컨트롤 바.
 *
 * 좌측에 총 개수 + 검색 슬롯, 우측에 정렬·필터 슬롯을 배치한다.
 * 각 슬롯은 호출부가 원하는 컴포넌트(Input·Select 등)를 주입한다.
 */
export function ListControl({
  count,
  countUnit = "건",
  search,
  sort,
  filter,
  className,
}: ListControlProps) {
  const shouldShowCount = typeof count === "number";
  const shouldShowActions = sort != null || filter != null;

  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-group-md", className)}>
      <div className="flex min-w-0 items-center gap-group-md">
        {shouldShowCount && (
          <Text
            variant="typography-body-sm-medium"
            className="whitespace-nowrap text-[var(--color-text-secondary)]"
          >
            총{" "}
            <Text
              as="span"
              variant="typography-body-sm-bold"
              className="text-[var(--color-text-primary)]"
            >
              {count.toLocaleString()}
            </Text>
            {countUnit}
          </Text>
        )}
        {search != null && <div className="min-w-0">{search}</div>}
      </div>

      {shouldShowActions && (
        <div className="flex items-center gap-group-sm">
          {filter}
          {sort}
        </div>
      )}
    </div>
  );
}

ListControl.displayName = "ListControl";
