import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

const sheetVariants = cva(
  cn(
    "fixed z-50 bg-[var(--color-bg-primary)] p-6 shadow-lg",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:duration-200 data-[state=open]:duration-300",
  ),
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b border-[var(--color-border-default)] data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        right:
          "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l border-[var(--color-border-default)] data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
        bottom:
          "inset-x-0 bottom-0 border-t border-[var(--color-border-default)] data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r border-[var(--color-border-default)] data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
      },
    },
    defaultVariants: { side: "right" },
  },
);

export interface SheetProps extends VariantProps<typeof sheetVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  showClose?: boolean;
  className?: string;
}

export function Sheet({
  open,
  onOpenChange,
  side = "right",
  title,
  description,
  children,
  footer,
  showClose = true,
  className,
}: SheetProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className={cn(sheetVariants({ side }), className)}>
          {(title || showClose) && (
            <div className="flex items-center justify-between mb-4">
              {title ? (
                <DialogPrimitive.Title className="text-base font-semibold text-[var(--color-text-primary)]">
                  {title}
                </DialogPrimitive.Title>
              ) : (
                <DialogPrimitive.Title className="sr-only">Sheet</DialogPrimitive.Title>
              )}
              {showClose && (
                <DialogPrimitive.Close
                  aria-label="닫기"
                  className="ml-auto rounded-sm p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)]"
                >
                  <XIcon className="h-4 w-4" />
                </DialogPrimitive.Close>
              )}
            </div>
          )}
          {description && (
            <DialogPrimitive.Description className="mb-4 text-sm text-[var(--color-text-secondary)]">
              {description}
            </DialogPrimitive.Description>
          )}
          <div>{children}</div>
          {footer && <div className="mt-4 flex justify-end gap-2">{footer}</div>}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export const SheetTrigger = DialogPrimitive.Trigger;
