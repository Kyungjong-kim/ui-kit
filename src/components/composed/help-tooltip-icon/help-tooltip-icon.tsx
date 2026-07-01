import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { Tooltip } from "../../primitives/tooltip";

type TooltipPassthrough = Pick<ComponentProps<typeof Tooltip>, "side" | "align" | "delayDuration">;

export interface HelpTooltipIconProps extends TooltipPassthrough {
  /** 툴팁에 표시할 도움말 내용 */
  content: ReactNode;
  /** 트리거 추가 클래스 */
  className?: string;
  /** 접근성 라벨 (기본: "도움말") */
  "aria-label"?: string;
}

/**
 * 도움말 물음표 아이콘.
 *
 * 물음표 버튼에 호버·포커스하면 Tooltip 으로 도움말을 표시한다.
 * 폼 필드·설정 항목 옆에서 부가 설명을 제공할 때 사용한다.
 */
export function HelpTooltipIcon({
  content,
  side = "top",
  align = "center",
  delayDuration,
  className,
  "aria-label": ariaLabel = "도움말",
}: HelpTooltipIconProps) {
  return (
    <Tooltip content={content} side={side} align={align} delayDuration={delayDuration}>
      <button
        type="button"
        aria-label={ariaLabel}
        className={cn(
          "inline-flex h-4 w-4 items-center justify-center rounded-full",
          "border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]",
          "typography-label-xs text-[var(--color-text-tertiary)]",
          "transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-secondary)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]",
          className,
        )}
      >
        ?
      </button>
    </Tooltip>
  );
}

HelpTooltipIcon.displayName = "HelpTooltipIcon";
