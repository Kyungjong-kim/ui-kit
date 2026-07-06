import { cva } from "class-variance-authority";
import type { ReactNode } from "react";
import { PageHeader, Tabs, TabsContent, TabsList, TabsTrigger } from "../../components";
import { cn } from "../../utils/cn";

const detailPageContainer = cva(["flex flex-col w-full min-h-0", "bg-[var(--color-bg-secondary)]"]);

export interface DetailTabsPageTab {
  /** 탭 버튼에 표시할 라벨 */
  label: string;
  /** 탭을 식별하는 고유 값 */
  value: string;
  /** 탭 선택 시 표시할 콘텐츠 */
  content: ReactNode;
}

export interface DetailTabsPageTemplateProps {
  /** 페이지 상단 헤더에 표시할 제목 */
  title: string;
  /** 탭 정의 목록 */
  tabs: DetailTabsPageTab[];
  /** 초기 활성 탭 값 (기본: 첫 번째 탭) */
  defaultTab?: string;
  /** 헤더 우측에 렌더할 액션 슬롯 */
  headerActions?: ReactNode;
  /** 추가 클래스 */
  className?: string;
}

/**
 * 탭 기반 상세 페이지용 레이아웃 템플릿.
 *
 * 상단 `PageHeader`(제목·우측 액션 슬롯), 탭 목록(`Tabs`),
 * 탭별 콘텐츠 영역으로 구성된다.
 * 하나의 리소스를 여러 탭으로 나눠 보여주는 상세 화면의 뼈대로 사용한다.
 */
export function DetailTabsPageTemplate({
  title,
  tabs,
  defaultTab,
  headerActions,
  className,
}: DetailTabsPageTemplateProps) {
  const initialTab = defaultTab ?? tabs[0]?.value;

  return (
    <div className={cn(detailPageContainer(), className)}>
      <PageHeader title={title} rightTrailingButton={headerActions} />

      <Tabs defaultValue={initialTab} className="flex flex-col flex-1 min-h-0">
        <div className="px-inline-xxl pt-stack-sm">
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto px-inline-xxl pb-stack-lg">
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.content}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}

DetailTabsPageTemplate.displayName = "DetailTabsPageTemplate";
