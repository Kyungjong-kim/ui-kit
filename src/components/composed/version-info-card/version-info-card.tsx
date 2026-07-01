import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface VersionInfoItem {
  /** 항목 라벨. */
  label: ReactNode;
  /** 항목 값. */
  value: ReactNode;
}

export interface VersionInfoCardProps extends HTMLAttributes<HTMLDivElement> {
  /** 버전 문자열 (예: "v2.4.1"). */
  version: ReactNode;
  /** 릴리스 일자. */
  releaseDate?: ReactNode;
  /** 변경 요약 텍스트. */
  summary?: ReactNode;
  /** 추가 라벨-값 항목. */
  items?: VersionInfoItem[];
}

/**
 * 버전 정보 카드. 버전·릴리스일·변경요약과 임의의 라벨-값 항목을 표시한다.
 */
export function VersionInfoCard({
  className,
  version,
  releaseDate,
  summary,
  items,
  ...props
}: VersionInfoCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] p-4",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-base font-semibold text-[var(--color-text-primary)]">{version}</span>
        {releaseDate && (
          <span className="text-xs text-[var(--color-text-tertiary)]">{releaseDate}</span>
        )}
      </div>
      {summary && <p className="text-sm text-[var(--color-text-secondary)]">{summary}</p>}
      {items && items.length > 0 && (
        <dl className="flex flex-col gap-1.5 border-t border-[var(--color-border-default)] pt-3">
          {items.map((item, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: 정적 라벨-값 목록(재정렬 없음)
            <div key={index} className="flex justify-between gap-3 text-sm">
              <dt className="text-[var(--color-text-tertiary)]">{item.label}</dt>
              <dd className="text-right font-medium text-[var(--color-text-primary)]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

VersionInfoCard.displayName = "VersionInfoCard";
