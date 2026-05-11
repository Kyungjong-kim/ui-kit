import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import type { IconName } from "../../primitives/icon";
import { Icon } from "../../primitives/icon";
import { Text } from "../../primitives/text";
import { TextSkeleton } from "../text-skeleton";

export interface PageHeaderProps {
  leftLeadingElement?: ReactNode;
  leftLeadingIcon?: IconName;
  leftTrailingButton?: ReactNode;
  title: string;
  titleElement?: ReactNode;
  rightLeadingButton?: ReactNode;
  rightTrailingButton?: ReactNode;
  roundedStyle?: boolean;
  isLoading?: boolean;
}

export function PageHeader({
  leftLeadingElement,
  leftLeadingIcon,
  leftTrailingButton,
  title,
  titleElement,
  rightLeadingButton,
  rightTrailingButton,
  roundedStyle,
  isLoading,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "bg-[var(--color-bg-primary)] flex items-start gap-6 w-full h-[48px] px-6 pt-2",
        roundedStyle && "rounded-t-md rounded-b-none",
      )}
    >
      <div className="flex w-full h-[32px] gap-2 items-center">
        {leftLeadingElement}
        {leftLeadingIcon && <Icon name={leftLeadingIcon} size="lg" />}
        <div className="min-w-0">
          {isLoading ? (
            <div className="w-[120px]">
              <TextSkeleton width={100} />
            </div>
          ) : (
            (titleElement ?? (
              <Text variant="typography-headline-sm" className="text-[var(--color-text-primary)]">
                {title}
              </Text>
            ))
          )}
        </div>
        {leftTrailingButton}
      </div>
      <div className="flex gap-2">
        {rightLeadingButton}
        {rightTrailingButton}
      </div>
    </header>
  );
}

PageHeader.displayName = "PageHeader";
