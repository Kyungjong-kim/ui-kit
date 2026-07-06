import type { ReactNode } from "react";
import { SidePanel } from "../../components";

export interface SidePanelPageTemplateProps {
  /** 열림 상태 (controlled) */
  open: boolean;
  /** 닫기 요청 콜백 */
  onClose: () => void;
  /** 헤더 타이틀 */
  title?: string;
  /** 스크롤되는 본문 콘텐츠 */
  children?: ReactNode;
  /** 하단 고정 푸터 (액션 버튼 등) */
  footer?: ReactNode;
}

/**
 * 측면 패널 페이지 템플릿.
 *
 * SidePanel(composed)을 감싸 헤더(제목·닫기) + 스크롤 본문 + 푸터(액션)의
 * 표준 레이아웃을 제공하는 페이지 래퍼다.
 * 필터·상세보기·설정 등 컨텍스트를 유지하는 보조 화면 구성에 사용한다.
 */
export function SidePanelPageTemplate({
  open,
  onClose,
  title,
  children,
  footer,
}: SidePanelPageTemplateProps) {
  return (
    <SidePanel
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
      title={title}
      footer={footer}
    >
      {children}
    </SidePanel>
  );
}

SidePanelPageTemplate.displayName = "SidePanelPageTemplate";
