import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

/**
 * SettingRow — 가로형 라벨↔값 행.
 *
 * 라벨(고정폭 120, secondary)을 왼쪽에, 값(primary)을 오른쪽에 배치한다.
 * 라벨 옆 보조 슬롯(tooltip)에는 도움말 아이콘 등 임의 ReactNode를 주입할 수 있다.
 * 값 영역에는 텍스트·폼 필드·테이블 등 어떤 ReactNode든 자유롭게 넣는다.
 */
export interface SettingRowProps {
  /** 라벨 (고정폭 120) */
  label: ReactNode;
  /** 라벨 옆 보조 슬롯 (도움말 아이콘 등) */
  tooltip?: ReactNode;
  /** 값 */
  children: ReactNode;
  className?: string;
}

export function SettingRow({ label, tooltip, children, className }: SettingRowProps) {
  return (
    <div className={cn("flex items-start gap-group-md", className)}>
      <span className="flex w-[120px] shrink-0 items-center gap-group-xs typography-body-md-base text-[var(--color-text-secondary)]">
        {label}
        {tooltip}
      </span>
      <div className="min-w-0 flex-1 typography-body-md-medium text-[var(--color-text-primary)]">
        {children}
      </div>
    </div>
  );
}

SettingRow.displayName = "SettingRow";
