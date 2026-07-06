import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  side?: ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>["side"];
  align?: ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>["align"];
  delayDuration?: number;
}

export function Tooltip({
  children,
  content,
  side = "top",
  align = "center",
  delayDuration = 300,
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            sideOffset={6}
            className={cn(
              "z-50 max-w-xs rounded-sm bg-[var(--color-bg-inverse)] px-inline-md py-stack-xs typography-label-xs text-[var(--color-text-inverse)] shadow-default-md",
              "animate-in fade-in-0 zoom-in-95",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-[var(--color-bg-inverse)]" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
