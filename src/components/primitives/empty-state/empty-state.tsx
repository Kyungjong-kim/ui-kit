import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { Button } from "../button";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  actionText,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-12 px-6 text-center",
        className,
      )}
    >
      {icon && (
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)]">
          {icon}
        </div>
      )}
      <div className="space-y-1.5">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">{title}</h3>
        {description && (
          <p className="text-sm text-[var(--color-text-secondary)] max-w-sm">{description}</p>
        )}
      </div>
      {actionText && onAction && <Button onClick={onAction}>{actionText}</Button>}
    </div>
  );
}
