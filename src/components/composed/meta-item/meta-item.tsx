import { Fragment, type ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { Text } from "../../primitives/text";

export interface MetaItemProps {
  /** 좌측 회색 라벨 */
  label: string;
  /** 우측 값 (텍스트/숫자 또는 Badge 등 ReactNode) */
  value: ReactNode;
  /** 사이즈 — md(기본) / sm */
  size?: "sm" | "md";
  className?: string;
}

/**
 * MetaItem — 라벨·값 쌍 메타 정보.
 *
 * 좌측 라벨(tertiary) + 우측 값(secondary, medium). 값이 문자열/숫자가 아니면
 * (Badge 등) 그대로 렌더한다.
 */
export function MetaItem({ label, value, size = "md", className }: MetaItemProps) {
  const isPlain = typeof value === "string" || typeof value === "number";
  const labelVariant = size === "sm" ? "typography-body-sm-base" : "typography-body-md-base";
  const valueVariant = size === "sm" ? "typography-body-sm-medium" : "typography-body-md-medium";

  return (
    <div className={cn("flex items-center gap-group-xs whitespace-nowrap", className)}>
      <Text variant={labelVariant} className="text-[var(--color-text-tertiary)]">
        {label}
      </Text>
      {isPlain ? (
        <Text variant={valueVariant} className="text-[var(--color-text-secondary)]">
          {value}
        </Text>
      ) : (
        value
      )}
    </div>
  );
}

MetaItem.displayName = "MetaItem";

export interface MetaInfoProps {
  /** 메타 항목들 — 사이에 세로 divider가 들어간다 */
  items: ReactNode[];
  className?: string;
}

/**
 * MetaInfo — 인라인 메타 항목들을 세로 구분선으로 나눈 행.
 *
 * 항목 사이에 세로 divider를 넣는다. 각 항목 내용은 호출부가 구성한다.
 */
export function MetaInfo({ items, className }: MetaInfoProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-group-md typography-body-sm-base text-[var(--color-text-tertiary)]",
        className,
      )}
    >
      {items.map((item, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: 정적 메타 항목 목록 — 안정 key 없음
        <Fragment key={index}>
          {index > 0 && (
            <span className="h-3 w-px bg-[var(--color-border-default)]" aria-hidden="true" />
          )}
          <span className="flex items-center gap-group-xs">{item}</span>
        </Fragment>
      ))}
    </div>
  );
}

MetaInfo.displayName = "MetaInfo";
