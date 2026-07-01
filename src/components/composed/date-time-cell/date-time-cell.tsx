import { cn } from "../../../utils/cn";
import { Text } from "../../primitives/text";

/** 상대시간 계산에 쓰는 단위별 임계값(초)과 라벨 포맷터 */
const RELATIVE_THRESHOLDS: ReadonlyArray<{
  limit: number;
  divisor: number;
  suffix: string;
}> = [
  { limit: 60, divisor: 1, suffix: "초 전" },
  { limit: 3600, divisor: 60, suffix: "분 전" },
  { limit: 86400, divisor: 3600, suffix: "시간 전" },
  { limit: 2592000, divisor: 86400, suffix: "일 전" },
  { limit: 31536000, divisor: 2592000, suffix: "개월 전" },
];

/** 두 시각의 차이를 한국어 상대시간 문자열로 변환한다. */
function formatRelativeTime(target: Date, now: Date): string {
  const diffSeconds = Math.floor((now.getTime() - target.getTime()) / 1000);

  if (diffSeconds < 0) return "방금 전";
  if (diffSeconds < 5) return "방금 전";

  for (const { limit, divisor, suffix } of RELATIVE_THRESHOLDS) {
    if (diffSeconds < limit) {
      return `${Math.floor(diffSeconds / divisor)}${suffix}`;
    }
  }
  return `${Math.floor(diffSeconds / 31536000)}년 전`;
}

/** Date를 `YYYY-MM-DD` 문자열로 포맷한다. */
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Date를 `HH:mm` 문자열로 포맷한다. */
function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export interface DateTimeCellProps {
  /** 표시할 시각 — Date 또는 파싱 가능한 문자열/타임스탬프 */
  value: Date | string | number;
  /** 상대시간("3분 전")으로 표시할지 여부 */
  relative?: boolean;
  /** 시간(HH:mm)까지 함께 표시할지 여부 (relative=false일 때만 적용) */
  showTime?: boolean;
  /**
   * 상대시간 계산 기준 시각. 테스트 시 고정값을 주입한다.
   * 미지정 시 렌더 시점의 현재 시각을 사용한다.
   */
  now?: Date;
  className?: string;
}

/**
 * DateTimeCell — 테이블 셀용 날짜·시간 표시.
 *
 * `relative`이면 "3분 전" 같은 상대시간을 자체 계산해 보여준다.
 * 절대 표기 모드에서는 `YYYY-MM-DD`(옵션으로 `HH:mm`)를 렌더한다.
 * 잘못된 값이면 "-"를 표시한다.
 */
export function DateTimeCell({
  value,
  relative = false,
  showTime = false,
  now,
  className,
}: DateTimeCellProps) {
  const date = value instanceof Date ? value : new Date(value);
  const isValid = !Number.isNaN(date.getTime());

  if (!isValid) {
    return (
      <Text
        variant="typography-body-sm-base"
        className={cn("text-[var(--color-text-tertiary)] whitespace-nowrap", className)}
      >
        -
      </Text>
    );
  }

  if (relative) {
    const reference = now ?? new Date();
    return (
      <Text
        variant="typography-body-sm-base"
        className={cn("text-[var(--color-text-secondary)] whitespace-nowrap", className)}
        title={showTime ? `${formatDate(date)} ${formatTime(date)}` : formatDate(date)}
      >
        {formatRelativeTime(date, reference)}
      </Text>
    );
  }

  return (
    <span className={cn("inline-flex items-baseline gap-group-xs whitespace-nowrap", className)}>
      <Text variant="typography-body-sm-base" className="text-[var(--color-text-secondary)]">
        {formatDate(date)}
      </Text>
      {showTime && (
        <Text variant="typography-body-sm-base" className="text-[var(--color-text-tertiary)]">
          {formatTime(date)}
        </Text>
      )}
    </span>
  );
}

DateTimeCell.displayName = "DateTimeCell";
