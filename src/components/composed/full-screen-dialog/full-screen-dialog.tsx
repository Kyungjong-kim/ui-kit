import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface FullScreenDialogProps {
  /** 열림 상태 (controlled) */
  open?: boolean;
  /** 열림 상태 변경 콜백 */
  onOpenChange?: (open: boolean) => void;
  /** 헤더 타이틀 */
  title?: string;
  /** 헤더 우측 영역 (닫기 버튼 왼쪽에 배치되는 액션 슬롯) */
  headerActions?: ReactNode;
  /** 스크롤되는 본문 콘텐츠 */
  children?: ReactNode;
  /** 하단 고정 푸터 */
  footer?: ReactNode;
  /** 닫기 버튼 표시 여부 */
  showClose?: boolean;
  /** 본문 영역 추가 클래스 */
  className?: string;
}

/**
 * 전체화면 다이얼로그.
 *
 * Radix Dialog 기반으로 뷰포트 전체를 덮는 레이아웃을 구성한다.
 * 상단 고정 헤더(타이틀 + 액션 + 닫기), 스크롤되는 본문, 하단 고정 푸터로 나뉜다.
 * 긴 폼·문서 뷰어 등 화면 전체가 필요한 오버레이에 사용한다.
 */
export function FullScreenDialog({
  open,
  onOpenChange,
  title,
  headerActions,
  children,
  footer,
  showClose = true,
  className,
}: FullScreenDialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-0 z-50 flex flex-col bg-[var(--color-bg-primary)]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          )}
        >
          <div className="flex items-center gap-group-md border-b border-[var(--color-border-default)] px-inline-xxl py-stack-md">
            {title ? (
              <DialogPrimitive.Title className="typography-headline-md text-[var(--color-text-primary)]">
                {title}
              </DialogPrimitive.Title>
            ) : (
              <DialogPrimitive.Title className="sr-only">전체화면 다이얼로그</DialogPrimitive.Title>
            )}
            <div className="ml-auto flex items-center gap-group-sm">
              {headerActions}
              {showClose && (
                <DialogPrimitive.Close
                  aria-label="닫기"
                  className="rounded-xs p-stack-xxs text-[var(--color-text-tertiary)] transition-colors hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
                >
                  <XIcon className="h-size-icon-sm w-size-icon-sm" />
                </DialogPrimitive.Close>
              )}
            </div>
          </div>
          <div className={cn("flex-1 overflow-y-auto px-inline-xxl py-stack-xl", className)}>
            {children}
          </div>
          {footer && (
            <div className="flex justify-end gap-group-sm border-t border-[var(--color-border-default)] px-inline-xxl py-stack-md">
              {footer}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

FullScreenDialog.displayName = "FullScreenDialog";
