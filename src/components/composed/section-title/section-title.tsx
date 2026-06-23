import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { Text } from "../../primitives/text";
import { IconButton } from "../icon-button";

export interface SectionTitleProps {
  /** 섹션 타이틀 */
  title: string;
  /** 타이틀 옆 보조 아이콘 노드 (보통 info 아이콘 또는 Tooltip trigger) */
  infoIcon?: ReactNode;
  /** 타이틀 아래 보조 설명 */
  description?: string;
  /** 우측 액션 영역 — default 타입에서 사용 */
  actions?: ReactNode;
  /** 모달 헤더로 사용 시 — 전달하면 우측에 X 닫기 버튼 노출 */
  onClose?: () => void;
  /** 타입 — default(기본) / modal(닫기 버튼만) */
  type?: "default" | "modal";
  className?: string;
}

/**
 * SectionTitle — 페이지 내 섹션 헤더.
 *
 * 좌측에 타이틀 + 선택적 보조 아이콘 + 보조 설명, 우측에 액션 영역.
 * `type="modal"` 또는 `onClose` 전달 시 우측에 닫기(X) 버튼을 노출한다.
 */
export function SectionTitle({
  title,
  infoIcon,
  description,
  actions,
  onClose,
  type = "default",
  className,
}: SectionTitleProps) {
  const isModal = type === "modal" || !!onClose;

  return (
    <div className={cn("flex w-full items-center gap-group-lg", className)}>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-group-xs">
        <div className="flex items-center gap-group-xs">
          <Text
            as="h2"
            variant="typography-headline-lg"
            className="text-[var(--color-text-primary)]"
          >
            {title}
          </Text>
          {infoIcon && <span className="inline-flex items-center">{infoIcon}</span>}
        </div>
        {description && (
          <Text
            variant="typography-body-md-base"
            className="whitespace-nowrap text-[var(--color-text-secondary)]"
          >
            {description}
          </Text>
        )}
      </div>

      {isModal ? (
        <IconButton
          icon="x"
          variant="secondary"
          appearance="ghost"
          shape="circle"
          size="sm"
          aria-label="닫기"
          onClick={onClose}
        />
      ) : (
        actions && <div className="flex shrink-0 items-center gap-group-sm">{actions}</div>
      )}
    </div>
  );
}

SectionTitle.displayName = "SectionTitle";
