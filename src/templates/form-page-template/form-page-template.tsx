import { cva } from "class-variance-authority";
import type { FormEvent, ReactNode } from "react";
import { Button, PageHeader, Text } from "../../components";
import { cn } from "../../utils/cn";

const formPageContainer = cva(["flex flex-col w-full min-h-0", "bg-[var(--color-bg-secondary)]"]);

export interface FormPageTemplateProps {
  /** 페이지 상단 헤더에 표시할 제목 */
  title: string;
  /** 제목 아래 보조 설명 (선택) */
  description?: ReactNode;
  /** 폼 본문 영역에 렌더할 섹션 콘텐츠 */
  children: ReactNode;
  /** 저장 버튼 클릭 시 호출되는 제출 핸들러 */
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  /** 취소 버튼 클릭 시 호출되는 핸들러 */
  onCancel?: () => void;
  /** 제출 진행 중 여부 — 저장 버튼 로딩 및 액션 비활성화 */
  isSubmitting?: boolean;
  /** 저장 버튼 라벨 (기본: "저장") */
  submitLabel?: string;
  /** 취소 버튼 라벨 (기본: "취소") */
  cancelLabel?: string;
  /** 추가 클래스 */
  className?: string;
}

/**
 * 폼 입력 페이지용 레이아웃 템플릿.
 *
 * 상단 `PageHeader`(제목·설명), 스크롤되는 폼 섹션 영역(children),
 * 하단 고정 액션 바(저장·취소 버튼)로 구성된다.
 * 생성·편집 등 단일 폼 화면의 뼈대로 사용한다.
 */
export function FormPageTemplate({
  title,
  description,
  children,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = "저장",
  cancelLabel = "취소",
  className,
}: FormPageTemplateProps) {
  return (
    <form onSubmit={onSubmit} className={cn(formPageContainer(), className)}>
      <PageHeader
        title={title}
        titleElement={
          <div className="flex flex-col gap-group-xxs min-w-0">
            <Text variant="typography-headline-sm" className="text-[var(--color-text-primary)]">
              {title}
            </Text>
            {description && (
              <Text
                variant="typography-body-sm-base"
                className="text-[var(--color-text-secondary)]"
              >
                {description}
              </Text>
            )}
          </div>
        }
      />

      <div className="flex-1 min-h-0 overflow-y-auto px-inline-xxl py-stack-xxl">
        <div className="flex flex-col gap-stack-xxl">{children}</div>
      </div>

      <div className="flex items-center justify-end gap-group-sm w-full px-inline-xxl py-stack-md border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)]">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
            {cancelLabel}
          </Button>
        )}
        <Button type="submit" variant="primary" loading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

FormPageTemplate.displayName = "FormPageTemplate";
