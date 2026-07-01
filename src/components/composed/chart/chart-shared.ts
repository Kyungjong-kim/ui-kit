import type { CSSProperties } from "react";

/**
 * 차트 공통 상수·유틸 — Line/Bar/Donut 등 recharts 기반 차트가 공유한다.
 *
 * 색은 DS core 색 토큰을 직접 참조한다(차트 시리즈 색은 의미색이 아닌 구분색이라
 * semantic 계층을 거치지 않는다). SVG fill/stroke에 CSS 변수를 그대로 넘긴다.
 */

/** 시리즈 구분 색 팔레트(순서대로 순환) */
export const CHART_SERIES_COLORS = [
  "var(--color-brand-500)",
  "var(--color-blue-500)",
  "var(--color-green-500)",
  "var(--color-orange-500)",
  "var(--color-red-500)",
  "var(--color-brand-300)",
  "var(--color-blue-300)",
  "var(--color-green-300)",
] as const;

/** 축·그리드·툴팁 공통 색 */
export const CHART_GRID_COLOR = "var(--color-border-default)";
export const CHART_AXIS_COLOR = "var(--color-text-tertiary)";
export const CHART_TOOLTIP_BG = "var(--color-bg-primary)";
export const CHART_TOOLTIP_BORDER = "var(--color-border-default)";

/** index 기반 시리즈 색 도출(팔레트 순환) */
export function seriesColor(index: number): string {
  return CHART_SERIES_COLORS[index % CHART_SERIES_COLORS.length];
}

/** 툴팁 컨테이너 공통 스타일(recharts contentStyle) */
export const CHART_TOOLTIP_STYLE: CSSProperties = {
  backgroundColor: CHART_TOOLTIP_BG,
  border: `1px solid ${CHART_TOOLTIP_BORDER}`,
  borderRadius: "8px",
  fontSize: "12px",
  color: "var(--color-text-primary)",
};

/** 단일/다중 시리즈 키 정의 */
export interface ChartSeries {
  /** 데이터 객체의 값 키 */
  dataKey: string;
  /** 범례·툴팁 표시명 — 생략 시 dataKey */
  name?: string;
  /** 색 오버라이드 — 생략 시 팔레트 순환 */
  color?: string;
}
