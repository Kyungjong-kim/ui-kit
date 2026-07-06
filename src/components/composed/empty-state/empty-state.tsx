import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import type { ButtonProps } from "../../primitives/button";
import { Button } from "../../primitives/button";
import { Text } from "../../primitives/text";

export type EmptyStateButtonAction = {
  label: string;
  onClick?: () => void;
  buttonProps?: Omit<ButtonProps, "children" | "onClick">;
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
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={tertiaryAction.onClick}
                    {...tertiaryAction.buttonProps}
                  >
                    {tertiaryAction.label}
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={primaryAction.onClick}
                    {...primaryAction.buttonProps}
                  >
                    {primaryAction.label}
                  </Button>
                </div>
              )}
              {buttonMode === "one" && primaryAction && (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={primaryAction.onClick}
                  {...primaryAction.buttonProps}
                >
                  {primaryAction.label}
                </Button>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}

EmptyState.displayName = "EmptyState";
