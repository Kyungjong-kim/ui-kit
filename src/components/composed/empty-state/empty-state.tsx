import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { Text } from "../../primitives/text";

export type EmptyStateButtonAction = {
  label: string;
  onClick?: () => void;
  buttonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onClick">;
};

export type EmptyStateProps = {
  className?: string;
  /** 일러스트 이미지 src (URL 또는 import된 이미지 경로) */
  illustSrc?: string;
  /** 일러스트 이미지 alt (기본값: 빈 문자열) */
  illustAlt?: string;
  title?: ReactNode;
  description?: ReactNode;
  primaryAction?: EmptyStateButtonAction;
  tertiaryAction?: EmptyStateButtonAction;
  ariaLabel?: string;
};

export function EmptyState({
  className,
  illustSrc,
  illustAlt = "",
  title,
  description,
  primaryAction,
  tertiaryAction,
  ariaLabel,
}: EmptyStateProps) {
  const shouldShowIllust = !!illustSrc;
  const shouldShowTitle = !!title;
  const shouldShowDescription = !!description;
  const buttonMode = tertiaryAction && primaryAction ? "two" : primaryAction ? "one" : "none";
  const shouldShowButtons = buttonMode !== "none";
  const shouldShowText = shouldShowTitle || shouldShowDescription;
  const contentGapClassName = shouldShowButtons && shouldShowText ? "gap-6" : "gap-3";

  const hasAnyContent =
    shouldShowIllust || shouldShowTitle || shouldShowDescription || shouldShowButtons;
  if (!hasAnyContent) return null;

  return (
    <section
      data-slot="empty-state"
      aria-label={ariaLabel}
      className={cn("flex flex-col items-center justify-center gap-3 py-16", className)}
    >
      {shouldShowIllust && (
        <div className="p-4 shrink-0" aria-hidden={illustAlt ? undefined : true}>
          <img
            src={illustSrc}
            alt={illustAlt}
            width={180}
            height={144}
            loading="lazy"
            decoding="async"
            className="block object-contain"
          />
        </div>
      )}

      {(shouldShowText || shouldShowButtons) && (
        <div className={cn("flex flex-col items-center text-center", contentGapClassName)}>
          {shouldShowText && (
            <div className="flex flex-col items-center gap-2">
              {shouldShowTitle && (
                <Text variant="typography-headline-xl" className="text-[var(--color-text-primary)]">
                  {title}
                </Text>
              )}
              {shouldShowDescription && (
                <Text
                  variant="typography-body-lg-medium"
                  className="text-[var(--color-text-secondary)] whitespace-pre-line text-center"
                >
                  {description}
                </Text>
              )}
            </div>
          )}

          {shouldShowButtons && (
            <>
              {buttonMode === "two" && primaryAction && tertiaryAction && (
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={tertiaryAction.onClick}
                    className="inline-flex items-center justify-center rounded-md h-11 px-6 text-base font-medium transition-colors bg-[var(--color-interactive-secondary-bg)] border border-[var(--color-interactive-secondary-border)] hover:bg-[var(--color-bg-secondary)] disabled:pointer-events-none disabled:opacity-50"
                    {...tertiaryAction.buttonProps}
                  >
                    {tertiaryAction.label}
                  </button>
                  <button
                    type="button"
                    onClick={primaryAction.onClick}
                    className="inline-flex items-center justify-center rounded-md h-11 px-6 text-base font-medium transition-colors bg-[var(--color-interactive-primary-bg)] text-white hover:bg-[var(--color-interactive-primary-bg-hover)] disabled:pointer-events-none disabled:opacity-50"
                    {...primaryAction.buttonProps}
                  >
                    {primaryAction.label}
                  </button>
                </div>
              )}
              {buttonMode === "one" && primaryAction && (
                <button
                  type="button"
                  onClick={primaryAction.onClick}
                  className="inline-flex items-center justify-center rounded-md h-11 px-6 text-base font-medium transition-colors bg-[var(--color-interactive-primary-bg)] text-white hover:bg-[var(--color-interactive-primary-bg-hover)] disabled:pointer-events-none disabled:opacity-50"
                  {...primaryAction.buttonProps}
                >
                  {primaryAction.label}
                </button>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}

EmptyState.displayName = "EmptyState";
