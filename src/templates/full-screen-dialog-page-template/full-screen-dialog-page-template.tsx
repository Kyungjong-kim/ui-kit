import type { ReactNode } from "react";
import { FullScreenDialog } from "../../components";

export interface FullScreenDialogPageTemplateProps {
  /** 열림 상태 (controlled) */
  open: boolean;
  /** 닫기 요청 콜백 */
  onClose: () => void;
  /** 상단바 타이틀 */
  title?: string;
  /** 상단바 우측 액션 슬롯 (닫기 버튼 왼쪽) */
  headerActions?: ReactNode;
  /** 스크롤되는 본문 콘텐츠 */
  children?: ReactNode;
  /** 하단 고정 푸터 (액션 등) */
  footer?: ReactNode;
}

/**
 * 전체화면 다이얼로그 페이지 템플릿.
 *
 * FullScreenDialog(composed)를 감싸 상단바(제목·액션·닫기) + 스크롤 본문 +
 * 푸터의 전체화면 표준 레이아웃을 제공하는 페이지 래퍼다.
 * 긴 폼·문서 뷰어 등 화면 전체가 필요한 오버레이 화면 구성에 사용한다.
 */
export function FullScreenDialogPageTemplate({
  open,
  onClose,
  title,
  headerActions,
  children,
  footer,
}: FullScreenDialogPageTemplateProps) {
  return (
    <FullScreenDialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
      title={title}
      headerActions={headerActions}
      footer={footer}
    >
      {children}
    </FullScreenDialog>
  );
}

FullScreenDialogPageTemplate.displayName = "FullScreenDialogPageTemplate";
