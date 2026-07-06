import type { ReactNode } from "react";
import { Dialog } from "../../primitives/dialog";

export type ModalProps = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  content?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  showCloseButton?: boolean;
};

export function Modal({
  open,
  onOpenChange,
  title,
  content,
  primaryAction,
  secondaryAction,
  showCloseButton = true,
}: ModalProps) {
  const hasActions = !!primaryAction || !!secondaryAction;
  const hasBothActions = !!primaryAction && !!secondaryAction;

  const footer = hasActions ? (
    hasBothActions ? (
      <div className="flex gap-3">
        {secondaryAction}
        {primaryAction}
      </div>
    ) : (
      (primaryAction ?? secondaryAction)
    )
  ) : undefined;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      showClose={showCloseButton}
      footer={footer}
    >
      {content}
    </Dialog>
  );
}

Modal.displayName = "Modal";
