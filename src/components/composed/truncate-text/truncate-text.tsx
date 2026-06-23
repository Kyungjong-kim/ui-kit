import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "../../../utils/cn";
import { Tooltip } from "../../primitives/tooltip";

export interface TruncateTextProps {
  /** 표시 텍스트 (한 줄 말줄임). 문자열이면 툴팁 전체 내용으로도 사용 */
  children: ReactNode;
  /** 툴팁에 표시할 전체 내용 (미지정 시 children이 문자열일 때 그대로 사용) */
  title?: string;
  className?: string;
}

/**
 * TruncateText — 한 줄 말줄임(truncate) 텍스트 셀.
 *
 * 실제로 잘릴 때(`scrollWidth > clientWidth`)만 전체 내용을 툴팁으로 표시한다.
 * 잘리지 않거나 전체 내용을 알 수 없으면 툴팁 없이 말줄임만 적용한다.
 * 오버플로우 여부는 마운트·리사이즈 시 ResizeObserver로 감지한다.
 */
export function TruncateText({ children, title, className }: TruncateTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [overflow, setOverflow] = useState(false);
  const full = title ?? (typeof children === "string" ? children : undefined);

  // biome-ignore lint/correctness/useExhaustiveDependencies: children 변경 시 오버플로우 재측정 트리거(effect 내부에서 직접 참조하지 않음)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setOverflow(el.scrollWidth > el.clientWidth);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [children]);

  const node = (
    <span ref={ref} className={cn("block truncate", className)}>
      {children}
    </span>
  );

  // 전체 텍스트를 알 수 없거나(비문자열 children, title 미지정) 잘리지 않으면 말줄임만.
  if (!full || !overflow) return node;

  return (
    <Tooltip content={full} align="start">
      {node}
    </Tooltip>
  );
}

TruncateText.displayName = "TruncateText";
