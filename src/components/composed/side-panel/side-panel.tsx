import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { Sheet, type SheetProps } from "../../primitives/sheet";

export interface SidePanelProps
  extends Pick<SheetProps, "open" | "onOpenChange" | "side" | "maxWidth" | "showClose"> {
  /** 헤더 타이틀 */
  title?: string;
  /** 스크롤되는 본문 콘텐츠 */
  children?: ReactNode;
  /** 하단 고정 푸터 */
  footer?: ReactNode;
  /** 본문 영역 추가 클래스 */
  className?: string;
}

/**
 * 측면 슬라이드 패널.
 *
 * Sheet 기반으로 측면에서 슬라이드되는 오버레이를 구성한다.
 * 상단 타이틀 헤더, 스크롤되는 본문, 하단 고정 푸터 슬롯을 제공한다.
 * 필터·상세보기·설정 등 컨텍스트 유지가 필요한 보조 화면에 사용한다.
 */
export function SidePanel({
  open,
  onOpenChange,
  side = "right",
  maxWidth = "sm",
  showClose = true,
  title,
  children,
  footer,
  className,
}: SidePanelProps) {
  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      side={side}
      maxWidth={maxWidth}
      showClose={showClose}
      title={title}
      className="flex flex-col"
      footer={footer}
    >
      <div className={cn("min-h-0 flex-1 overflow-y-auto", className)}>{children}</div>
    </Sheet>
  );
}

SidePanel.displayName = "SidePanel";
