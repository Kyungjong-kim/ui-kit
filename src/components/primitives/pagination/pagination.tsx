import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";
import { cn } from "../../../utils/cn";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
  previousLabel?: string;
  nextLabel?: string;
  ariaLabel?: string;
}

function getPageRange(
  current: number,
  total: number,
  siblingCount: number,
): (number | "ellipsis")[] {
  const minSlotsForEllipsis = siblingCount * 2 + 5;
  if (total <= minSlotsForEllipsis) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const left = Math.max(2, current - siblingCount);
  const right = Math.min(total - 1, current + siblingCount);

  const pages: (number | "ellipsis")[] = [1];
  if (left > 2) pages.push("ellipsis");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("ellipsis");
  pages.push(total);

  return pages;
}

const itemBase = cn(
  "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm font-medium",
  "text-[var(--color-text-secondary)]",
  "hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]",
  "disabled:pointer-events-none disabled:opacity-50",
);

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
  previousLabel = "이전",
  nextLabel = "다음",
  ariaLabel = "페이지 네비게이션",
}: PaginationProps) {
  if (totalPages <= 0) return null;

  const safeCurrent = Math.min(Math.max(1, currentPage), totalPages);
  const pages = getPageRange(safeCurrent, totalPages, siblingCount);
  const isFirst = safeCurrent === 1;
  const isLast = safeCurrent === totalPages;

  return (
    <nav aria-label={ariaLabel} className={cn("flex items-center gap-1", className)}>
      <button
        type="button"
        onClick={() => onPageChange(safeCurrent - 1)}
        disabled={isFirst}
        aria-label={previousLabel}
        className={itemBase}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>

      {pages.map((page, idx) => {
        if (page === "ellipsis") {
          const prev = pages[idx - 1];
          const next = pages[idx + 1];
          return (
            <span
              key={`ellipsis-${prev ?? "start"}-${next ?? "end"}`}
              aria-hidden="true"
              className="inline-flex h-9 min-w-9 items-center justify-center text-[var(--color-text-tertiary)]"
            >
              <MoreHorizontalIcon className="h-4 w-4" />
            </span>
          );
        }
        const isCurrent = page === safeCurrent;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={isCurrent ? "page" : undefined}
            aria-label={`${page} 페이지`}
            className={cn(
              itemBase,
              isCurrent &&
                "bg-[var(--color-bg-brand-default)] text-[var(--color-text-inverse)] hover:bg-[var(--color-bg-brand-hover)] hover:text-[var(--color-text-inverse)]",
            )}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(safeCurrent + 1)}
        disabled={isLast}
        aria-label={nextLabel}
        className={itemBase}
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </nav>
  );
}
