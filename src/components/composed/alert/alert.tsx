import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../utils/cn";

/** Alert variant 별 상태 톤. */
export type AlertVariant = "info" | "success" | "warning" | "danger";

const alertVariants = cva("relative flex gap-3 rounded-lg border p-4 text-sm", {
  variants: {
    variant: {
      info: "border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]",
      success:
        "border-[var(--color-green-200)] bg-[var(--color-bg-success-subtle)] text-[var(--color-green-700)]",
      warning:
        "border-[var(--color-orange-200)] bg-[var(--color-bg-warning-subtle)] text-[var(--color-orange-700)]",
      danger:
        "border-[var(--color-red-200)] bg-[var(--color-bg-danger-subtle)] text-[var(--color-red-600)]",
    },
  },
  defaultVariants: { variant: "info" },
});

/** variant 별 아이콘 색상 토큰 맵. */
const iconColorMap: Record<AlertVariant, string> = {
  info: "text-[var(--color-text-tertiary)]",
  success: "text-[var(--color-text-success-default)]",
  warning: "text-[var(--color-text-warning-default)]",
  danger: "text-[var(--color-text-danger-default)]",
};

/** variant 별 기본 아이콘 SVG 맵. */
const iconMap: Record<AlertVariant, ReactNode> = {
  info: (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 11-2 0 1 1 0 012 0zm-1 3a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path
        fillRule="evenodd"
        d="M8.3 2.9a1.9 1.9 0 013.4 0l6.4 11.4A1.9 1.9 0 0116.4 17H3.6a1.9 1.9 0 01-1.7-2.7L8.3 2.9zM11 7a1 1 0 10-2 0v3a1 1 0 102 0V7zm-1 6a1 1 0 100 2 1 1 0 000-2z"
        clipRule="evenodd"
      />
    </svg>
  ),
  danger: (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.7 7.3a1 1 0 00-1.4 1.4L8.6 10l-1.3 1.3a1 1 0 101.4 1.4L10 11.4l1.3 1.3a1 1 0 001.4-1.4L11.4 10l1.3-1.3a1 1 0 00-1.4-1.4L10 8.6 8.7 7.3z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  /** 경고 제목. */
  title?: ReactNode;
  /** 상세 설명. */
  description?: ReactNode;
  /** variant 기본 아이콘을 대체할 커스텀 아이콘. `null`이면 아이콘 숨김. */
  icon?: ReactNode;
  /** 닫기 버튼 표시 여부. */
  dismissible?: boolean;
  /** 닫기 버튼 클릭 콜백. */
  onDismiss?: () => void;
}

/**
 * 인라인 경고 배너. variant(info/success/warning/danger)별 색·아이콘을 표시하고
 * 제목·설명과 선택적 닫기 버튼을 제공한다.
 */
export function Alert({
  className,
  variant = "info",
  title,
  description,
  icon,
  dismissible,
  onDismiss,
  children,
  ...props
}: AlertProps) {
  const resolvedVariant = variant ?? "info";
  const showIcon = icon !== null;
  const iconNode = icon ?? iconMap[resolvedVariant];

  return (
    <div className={cn(alertVariants({ variant }), className)} role="alert" {...props}>
      {showIcon && (
        <span className={cn("mt-0.5 shrink-0", iconColorMap[resolvedVariant])}>{iconNode}</span>
      )}
      <div className="flex-1 space-y-1">
        {title && <p className="font-semibold text-[var(--color-text-primary)]">{title}</p>}
        {description && <p>{description}</p>}
        {children}
      </div>
      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="닫기"
          className="-mr-1 -mt-1 shrink-0 rounded p-1 text-[var(--color-text-tertiary)] transition-colors hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-secondary)]"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-4 w-4">
            <path
              fillRule="evenodd"
              d="M4.3 4.3a1 1 0 011.4 0L10 8.6l4.3-4.3a1 1 0 111.4 1.4L11.4 10l4.3 4.3a1 1 0 01-1.4 1.4L10 11.4l-4.3 4.3a1 1 0 01-1.4-1.4L8.6 10 4.3 5.7a1 1 0 010-1.4z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

Alert.displayName = "Alert";
