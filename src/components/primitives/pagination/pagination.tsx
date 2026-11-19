import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";
import { useUiKitMessages } from "../../../locale";
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
  "inline-flex h-size-control-sm min-w-size-control-sm items-center justify-center rounded-xs px-inline-xs typography-label-md-medium tabular-nums",
  "text-[var(--color-text-secondary)] transition-colors",
  "hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]",
  "focus-ring",
  "disabled:pointer-events-none disabled:opacity-50",
);

// 이전·다음은 테두리 버튼으로 번호와 구분한다
const navItem = cn(
  itemBase,
  "border border-[var(--color-border-input-default)] hover:border-[var(--color-border-input-hover)]",
);

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
  previousLabel: previousLabelProp,
  nextLabel: nextLabelProp,
  ariaLabel: ariaLabelProp,
}: PaginationProps) {
  const t = useUiKitMessages();
  const previousLabel = previousLabelProp ?? t.pagination.previous;
  const nextLabel = nextLabelProp ?? t.pagination.next;
  const ariaLabel = ariaLabelProp ?? t.pagination.label;
  if (totalPages <= 0) return null;

  const safeCurrent = Math.min(Math.max(1, currentPage), totalPages);
  const pages = getPageRange(safeCurrent, totalPages, siblingCount);
  const isFirst = safeCurrent === 1;
  const isLast = safeCurrent === totalPages;

  return (
    <nav aria-label={ariaLabel} className={cn("flex items-center gap-group-xxs", className)}>
      <button
        type="button"
        onClick={() => onPageChange(safeCurrent - 1)}
        disabled={isFirst}
        aria-label={previousLabel}
        className={navItem}
      >
        <ChevronLeftIcon className="h-size-icon-sm w-size-icon-sm" />
      </button>

      {pages.map((page, idx) => {
        if (page === "ellipsis") {
          const prev = pages[idx - 1];
          const next = pages[idx + 1];
          return (
            <span
              key={`ellipsis-${prev ?? "start"}-${next ?? "end"}`}
              aria-hidden="true"
              className="inline-flex h-size-control-sm min-w-size-control-sm items-center justify-center text-[var(--color-text-tertiary)]"
            >
              <MoreHorizontalIcon className="h-size-icon-sm w-size-icon-sm" />
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
            aria-label={t.pagination.page(page)}
            className={cn(
              itemBase,
              isCurrent &&
                "bg-[var(--color-bg-brand-default)] text-[var(--color-interactive-primary-text)] hover:bg-[var(--color-bg-brand-hover)] hover:text-[var(--color-interactive-primary-text)]",
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
        className={navItem}
      >
        <ChevronRightIcon className="h-size-icon-sm w-size-icon-sm" />
      </button>
    </nav>
  );
}
