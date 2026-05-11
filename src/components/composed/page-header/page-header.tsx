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
        "bg-surface-default flex items-top gap-group-xl w-full h-[48px] px-layout-container-margin-lg pt-stack-sm",
        roundedStyle && "rounded-t-md rounded-b-none",
      )}
    >
      <div className="flex w-full h-[32px] gap-group-sm items-center">
        {leftLeadingElement}
        {leftLeadingIcon && <Icon name={leftLeadingIcon} size="lg" />}
        <div className="min-w-0">
          {isLoading ? (
            <div className="w-[120px]">
              <TextSkeleton width={100} />
            </div>
          ) : (
            (titleElement ?? (
              <Text variant="typography-headline-sm" className="text-text-primary">
                {title}
              </Text>
            ))
          )}
        </div>
        {leftTrailingButton}
      </div>
      <div className="flex gap-group-sm">
        {rightLeadingButton}
        {rightTrailingButton}
      </div>
    </header>
  );
}

PageHeader.displayName = "PageHeader";
