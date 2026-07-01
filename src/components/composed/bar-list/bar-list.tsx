import { cn } from "../../../utils/cn";
import { Text } from "../../primitives/text";

/**
 * BarList — 라벨+값 가로 막대 리스트.
 *
 * 각 항목의 값을 최댓값(또는 지정 max) 대비 비율로 환산해 라벨 뒤 배경 막대로 표시한다.
 * 순위형 지표(상위 요청 경로·모델별 호출 수 등)를 순수 CSS 막대로 나열할 때 사용.
 */

export type BarListTone = "brand" | "blue" | "green" | "orange" | "red" | "neutral";

export interface BarListItem {
  /** 항목 라벨 */
  label: string;
  /** 항목 값 (음수는 0으로 클램프) */
  value: number;
}

export interface BarListProps {
  /** 표시할 항목 목록 */
  items: BarListItem[];
  /** 막대 색 톤 (기본 brand) */
  tone?: BarListTone;
  /** 비율 기준 최댓값 — 생략 시 items 중 최댓값 사용 */
  max?: number;
  /** 값 표시 포맷터 — 기본 그대로 문자열화 */
  valueFormatter?: (value: number) => string;
  className?: string;
}

const BAR_COLOR: Record<BarListTone, string> = {
  brand: "bg-[var(--color-brand-400)]",
  blue: "bg-[var(--color-blue-400)]",
  green: "bg-[var(--color-green-400)]",
  orange: "bg-[var(--color-orange-400)]",
  red: "bg-[var(--color-red-400)]",
  neutral: "bg-[var(--color-neutral-400)]",
};

function clampNonNegative(value: number): number {
  return value < 0 ? 0 : value;
}

export function BarList({ items, tone = "brand", max, valueFormatter, className }: BarListProps) {
  const safeValues = items.map((item) => clampNonNegative(item.value));
  const resolvedMax = max ?? Math.max(0, ...safeValues);
  const formatValue = valueFormatter ?? ((value: number) => String(value));

  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {items.map((item, index) => {
        const value = safeValues[index];
        const ratio = resolvedMax > 0 ? Math.min(100, (value / resolvedMax) * 100) : 0;
        return (
          <li key={item.label} className="relative flex items-center overflow-hidden rounded-md">
            <div
              className={cn("absolute inset-y-0 left-0 rounded-md opacity-20", BAR_COLOR[tone])}
              style={{ width: `${ratio}%` }}
            />
            <div className="relative flex w-full items-center justify-between px-3 py-1.5">
              <Text
                variant="typography-label-sm-medium"
                className="truncate text-[var(--color-text-primary)]"
              >
                {item.label}
              </Text>
              <Text
                variant="typography-label-sm-base"
                className="tabular-nums text-[var(--color-text-secondary)]"
              >
                {formatValue(item.value)}
              </Text>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

BarList.displayName = "BarList";
