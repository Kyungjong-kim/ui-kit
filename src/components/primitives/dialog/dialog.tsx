import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  showClose?: boolean;
}

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  maxWidth = "md",
  showClose = true,
}: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-md bg-[var(--color-bg-primary)] p-inline-xxl shadow-default-lg",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "w-full",
            {
              "max-w-sm": maxWidth === "sm",
              "max-w-md": maxWidth === "md",
              "max-w-lg": maxWidth === "lg",
              "max-w-xl": maxWidth === "xl",
            },
          )}
        >
          {(title || showClose) && (
            <div className="flex items-center justify-between mb-group-sm">
              {title && (
                <DialogPrimitive.Title className="typography-headline-sm text-[var(--color-text-primary)]">
                  {title}
                </DialogPrimitive.Title>
              )}
              {showClose && (
                <DialogPrimitive.Close
                  aria-label="닫기"
                  className="ml-auto rounded-xxs p-stack-xxs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--color-border-focus)]"
                >
                  <XIcon className="h-4 w-4" />
                </DialogPrimitive.Close>
              )}
            </div>
          )}
          {description && (
            <DialogPrimitive.Description className="mb-group-sm typography-body-md-base text-[var(--color-text-secondary)]">
              {description}
            </DialogPrimitive.Description>
          )}
          <div>{children}</div>
          {footer && <div className="mt-group-sm flex justify-end gap-group-sm">{footer}</div>}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export const DialogTrigger = DialogPrimitive.Trigger;
