import type { ReactNode } from "react";
import { Modal } from "../../components";

export interface ModalPageTemplateProps {
  /** 열림 상태 (controlled) */
  open: boolean;
  /** 닫기 요청 콜백 */
  onClose: () => void;
  /** 헤더 타이틀 */
  title: string;
  /** 본문 콘텐츠 */
  children?: ReactNode;
  /** 하단 액션 슬롯 (버튼 등) */
  footer?: ReactNode;
}

/**
 * 모달 페이지 템플릿.
 *
 * Modal(composed)을 감싸 헤더(제목·닫기) + 본문 + 푸터(액션)의
 * 표준 레이아웃을 제공하는 페이지 래퍼다.
 * 확인·입력 폼 등 중앙 정렬 다이얼로그 화면 구성에 사용한다.
 */
export function ModalPageTemplate({
  open,
  onClose,
  title,
  children,
  footer,
}: ModalPageTemplateProps) {
  return (
    <Modal
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
      title={title}
      content={children}
      primaryAction={footer}
    />
  );
}

ModalPageTemplate.displayName = "ModalPageTemplate";
