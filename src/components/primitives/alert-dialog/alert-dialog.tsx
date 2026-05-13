import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  children?: ReactNode;
  cancelText?: string;
  actionText?: string;
  destructive?: boolean;
  onCancel?: () => void;
  onAction?: () => void;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  cancelText = "취소",
  actionText = "확인",
  destructive = false,
  onCancel,
  onAction,
  maxWidth = "md",
}: AlertDialogProps) {
  return (
    <AlertDialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <AlertDialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[var(--color-bg-primary)] p-6 shadow-lg",
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
          <AlertDialogPrimitive.Title className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
            {title}
          </AlertDialogPrimitive.Title>
          {description && (
            <AlertDialogPrimitive.Description className="mb-4 text-sm text-[var(--color-text-secondary)]">
              {description}
            </AlertDialogPrimitive.Description>
          )}
          {children && <div className="mb-4">{children}</div>}
          <div className="mt-4 flex justify-end gap-2">
            <AlertDialogPrimitive.Cancel
              onClick={onCancel}
              className="inline-flex h-9 items-center justify-center rounded-md border border-[var(--color-interactive-secondary-border)] bg-[var(--color-interactive-secondary-bg)] px-4 text-sm font-medium text-[var(--color-interactive-secondary-text)] hover:bg-[var(--color-bg-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
            >
              {cancelText}
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action
              onClick={onAction}
              className={cn(
                "inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]",
                destructive
                  ? "bg-[var(--color-interactive-destructive-bg)] text-[var(--color-interactive-destructive-text)] hover:bg-[var(--color-interactive-destructive-bg-hover)]"
                  : "bg-[var(--color-interactive-primary-bg)] text-[var(--color-interactive-primary-text)] hover:bg-[var(--color-interactive-primary-bg-hover)]",
              )}
            >
              {actionText}
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}

export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
