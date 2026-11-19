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
        "inline-flex items-center gap-group-lg border-b border-[var(--color-border-default)]",
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
        "-mb-px inline-flex items-center justify-center whitespace-nowrap border-b-2 border-transparent px-inline-xs py-stack-sm typography-label-md-medium transition-colors duration-150",
        "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]",
        "focus-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:border-[var(--color-border-brand-default)] data-[state=active]:text-[var(--color-text-primary)]",
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
  return <TabsPrimitive.Content className={cn("mt-group-sm focus-ring", className)} {...props} />;
}
