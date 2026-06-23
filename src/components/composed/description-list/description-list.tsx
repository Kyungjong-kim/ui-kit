import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../primitives/accordion";
import { TextSkeleton } from "../text-skeleton";

const CARD = "rounded-lg bg-[var(--color-bg-secondary)] px-inline-xxxl py-stack-xl";

export interface DescriptionListProps {
  children: ReactNode;
  /** 지정 시 접기/펼치기 아코디언 형태. 헤더 타이틀로 사용 */
  accordionTitle?: string;
  /** 아코디언 기본 펼침 여부 (기본 true) */
  defaultOpen?: boolean;
  /** 로딩 시 children 대신 라벨·값 형태 스켈레톤 행을 렌더 */
  loading?: boolean;
  /** 로딩 시 스켈레톤 행 수 (기본 4) */
  skeletonRows?: number;
  className?: string;
}

/**
 * DescriptionList — 설정값/정보 블록을 담는 카드 래퍼.
 *
 * `accordionTitle` 지정 시 접기/펼치기 아코디언, 미지정 시 평범한 카드.
 * 내부 행 구성(라벨·값 등)은 호출부가 children으로 구성한다.
 * `loading` 동안에는 라벨·값 형태의 스켈레톤 행을 렌더한다.
 */
export function DescriptionList({
  children,
  accordionTitle,
  defaultOpen = true,
  loading = false,
  skeletonRows = 4,
  className,
}: DescriptionListProps) {
  const content = loading ? <SkeletonRows rows={skeletonRows} /> : children;

  if (accordionTitle) {
    return (
      <div className={cn(CARD, className)}>
        <Accordion type="single" collapsible defaultValue={defaultOpen ? "item" : undefined}>
          <AccordionItem value="item">
            <AccordionTrigger>{accordionTitle}</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-stack-lg pt-stack-sm">{content}</div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }

  return <div className={cn(CARD, "flex flex-col gap-stack-lg", className)}>{content}</div>;
}

DescriptionList.displayName = "DescriptionList";

/** 라벨(좌 고정폭) + 값(우) 레이아웃을 따르는 스켈레톤 행 묶음. */
function SkeletonRows({ rows }: { rows: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: 정적 스켈레톤 행 — 안정 key 없음
        <div key={i} className="flex items-start gap-group-sm" data-testid="skeleton-row">
          <div className="w-[120px] shrink-0">
            <TextSkeleton width={100} />
          </div>
          <div className="min-w-0 flex-1">
            <TextSkeleton width={60} />
          </div>
        </div>
      ))}
    </>
  );
}
