import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../../utils/cn";
import type { IconName } from "../../primitives/icon";
import { Icon } from "../../primitives/icon";
import { Tabs, TabsList, TabsTrigger } from "../../primitives/tabs";
import type { TooltipProps } from "../../primitives/tooltip";
import { Tooltip } from "../../primitives/tooltip";

export type IconTabProps = Omit<ComponentProps<typeof TabsTrigger>, "children"> & {
  icon: IconName;
  label: string;
  tooltip?: ReactNode;
  tooltipSide?: TooltipProps["side"];
  tooltipAlign?: TooltipProps["align"];
};

export type IconTabsProps = ComponentProps<typeof Tabs> & {
  listClassName?: string;
};

export function IconTab({
  icon,
  label,
  className,
  tooltip,
  tooltipSide = "bottom",
  tooltipAlign = "center",
  ...props
}: IconTabProps) {
  const trigger = (
    <TabsTrigger
      className={cn(
        "[--icon-tab-color:var(--color-icon-disabled)] aria-[selected=true]:[--icon-tab-color:var(--color-icon-secondary)] disabled:[--icon-tab-color:var(--color-icon-disabled)]",
        "cursor-pointer",
        className,
      )}
      aria-label={label}
      {...props}
    >
      <Icon name={icon} size="sm" color="var(--icon-tab-color)" aria-hidden />
    </TabsTrigger>
  );

  if (!tooltip) return trigger;

  return (
    <Tooltip content={tooltip} side={tooltipSide} align={tooltipAlign}>
      {trigger}
    </Tooltip>
  );
}

export function IconTabs({ className, defaultValue, children, ...props }: IconTabsProps) {
  return (
    <Tabs className={className} defaultValue={defaultValue} {...props}>
      <TabsList>{children}</TabsList>
    </Tabs>
  );
}
