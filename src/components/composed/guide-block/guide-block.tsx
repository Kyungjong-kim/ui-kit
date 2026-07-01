import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import type { IconColor, IconName } from "../../primitives/icon";
import { Icon } from "../../primitives/icon";
import { Text } from "../../primitives/text";

export type GuideBlockTone = "info" | "tip";

/** tone별 컨테이너 배경·테두리 클래스 */
const toneContainerMap: Record<GuideBlockTone, string> = {
  info: "bg-[var(--color-bg-info-subtle)] border-[var(--color-border-default)]",
  tip: "bg-[var(--color-bg-brand-subtle)] border-[var(--color-border-default)]",
};

/** tone별 기본 아이콘 */
const toneIconMap: Record<GuideBlockTone, IconName> = {
  info: "coloredCircleCaution",
  tip: "coloredBinoculars",
};

/** tone별 제목 텍스트 색상 */
const toneTitleColorMap: Record<GuideBlockTone, string> = {
  info: "text-[var(--color-text-info-default)]",
  tip: "text-[var(--color-text-brand-default)]",
};

export interface GuideBlockProps {
  /** 안내 제목 */
  title: ReactNode;
  /** 안내 설명 (선택) */
  description?: ReactNode;
  /** 톤 — info(정보) / tip(팁) */
  tone?: GuideBlockTone;
  /** 좌측 아이콘 — 미지정 시 tone별 기본 아이콘 사용 */
  icon?: IconName;
  /** 아이콘 색상 오버라이드 */
  iconColor?: IconColor;
  className?: string;
}

/**
 * GuideBlock — 아이콘 + 제목 + 설명으로 구성된 안내 블록.
 *
 * tone(info/tip)에 따라 배경·아이콘·제목 색상이 달라진다.
 * 아이콘은 tone별 기본값을 쓰거나 `icon` prop으로 교체한다.
 */
export function GuideBlock({
  title,
  description,
  tone = "info",
  icon,
  iconColor,
  className,
}: GuideBlockProps) {
  const resolvedIcon = icon ?? toneIconMap[tone];
  const shouldShowDescription = description != null && description !== "";

  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-group-sm rounded-md border p-4",
        toneContainerMap[tone],
        className,
      )}
    >
      <Icon name={resolvedIcon} size="md" color={iconColor} className="mt-0.5 shrink-0" />
      <div className="flex min-w-0 flex-col gap-group-xs">
        <Text variant="typography-body-md-medium" className={toneTitleColorMap[tone]}>
          {title}
        </Text>
        {shouldShowDescription && (
          <Text
            variant="typography-body-sm-base"
            className="whitespace-pre-line text-[var(--color-text-secondary)]"
          >
            {description}
          </Text>
        )}
      </div>
    </div>
  );
}

GuideBlock.displayName = "GuideBlock";
