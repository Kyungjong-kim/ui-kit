import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../../utils/cn";

export const Tabs = TabsPrimitive.Root;

export function TabsList({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        "inline-flex items-center rounded-sm bg-[var(--color-bg-tertiary)] p-stack-xxs gap-group-xxs",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-xs px-inline-md py-stack-xs typography-label-md-medium transition-all duration-150",
        "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:bg-[var(--color-bg-primary)] data-[state=active]:text-[var(--color-text-primary)] data-[state=active]:shadow-default-sm",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        "mt-group-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]",
        className,
      )}
      {...props}
    />
  );
}
