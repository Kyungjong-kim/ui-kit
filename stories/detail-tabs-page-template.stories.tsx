import type { Meta, StoryObj } from "@storybook/react";
import { DescriptionList } from "../src/components/composed/description-list";
import { MetaItem } from "../src/components/composed/meta-item";
import { Table, type TableColumn } from "../src/components/composed/table";
import { Timeline } from "../src/components/composed/timeline";
import { Badge } from "../src/components/primitives/badge";
import { Button } from "../src/components/primitives/button";
import { Tag } from "../src/components/primitives/tag";
import { DetailTabsPageTemplate } from "../src/templates/detail-tabs-page-template";

interface Member {
  id: string;
  name: string;
  role: string;
  joined: string;
}

const memberColumns: TableColumn<Member>[] = [
  { key: "name", header: "이름" },
  {
    key: "role",
    header: "역할",
    render: (row) => (
      <Tag variant={row.role === "소유자" ? "info" : "default"} size="sm">
        {row.role}
      </Tag>
    ),
  },
  { key: "joined", header: "참여일" },
];

const members: Member[] = [
  { id: "1", name: "김철수", role: "소유자", joined: "2026-01-04" },
  { id: "2", name: "이영희", role: "편집자", joined: "2026-02-18" },
  { id: "3", name: "박민수", role: "뷰어", joined: "2026-03-22" },
  { id: "4", name: "정다은", role: "편집자", joined: "2026-05-09" },
];

interface Activity {
  id: string;
  actor: string;
  action: string;
  time: string;
}

const activityGroups = [
  {
    id: "2026-06-14",
    label: "06.14",
    sublabel: "2026",
    items: [
      { id: "a1", actor: "김철수", action: "프로젝트 설정을 변경했습니다.", time: "14:22" },
      { id: "a2", actor: "이영희", action: "구성원 3명을 초대했습니다.", time: "11:05" },
    ] as Activity[],
  },
  {
    id: "2026-06-12",
    label: "06.12",
    sublabel: "2026",
    items: [
      { id: "a3", actor: "박민수", action: "문서 2건을 업로드했습니다.", time: "16:40" },
    ] as Activity[],
  },
];

const tabs = [
  {
    label: "개요",
    value: "overview",
    content: (
      <div className="flex flex-col gap-stack-xxl pt-stack-md">
        <DescriptionList>
          <MetaItem label="프로젝트 ID" value="PRJ-2026-0142" />
          <MetaItem label="담당 팀" value="플랫폼" />
          <MetaItem
            label="상태"
            value={
              <Badge variant="success" size="sm">
                진행 중
              </Badge>
            }
          />
          <MetaItem label="생성일" value="2026-01-04" />
          <MetaItem label="최근 수정" value="2026-06-14 14:22" />
        </DescriptionList>
        <DescriptionList accordionTitle="추가 설정">
          <MetaItem label="가시성" value="비공개" />
          <MetaItem label="기본 브랜치" value="main" />
          <MetaItem label="스토리지 사용량" value="4.2 GB / 20 GB" />
        </DescriptionList>
      </div>
    ),
  },
  {
    label: "구성원",
    value: "members",
    content: (
      <div className="pt-stack-md">
        <Table columns={memberColumns} data={members} />
      </div>
    ),
  },
  {
    label: "활동 이력",
    value: "activity",
    content: (
      <div className="pt-stack-md">
        <Timeline
          groups={activityGroups}
          getItemKey={(item) => item.id}
          renderItem={(item) => (
            <div className="flex flex-col gap-group-xxs">
              <span className="typography-body-md-medium text-[var(--color-text-primary)]">
                <span className="text-[var(--color-text-secondary)]">{item.actor}</span>{" "}
                {item.action}
              </span>
              <span className="typography-body-sm-base text-[var(--color-text-tertiary)]">
                {item.time}
              </span>
            </div>
          )}
        />
      </div>
    ),
  },
];

const meta: Meta<typeof DetailTabsPageTemplate> = {
  title: "Templates/DetailTabsPageTemplate",
  component: DetailTabsPageTemplate,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DetailTabsPageTemplate>;

/**
 * 실제 "프로젝트 상세" 페이지 목업.
 * PageHeader(제목·편집 버튼) + Tabs(개요·구성원·활동 이력)로 구성.
 * 개요 탭은 DescriptionList+MetaItem+Badge, 구성원 탭은 Table+Tag,
 * 활동 이력 탭은 Timeline으로 각각 실제 콘텐츠를 채웠다.
 */
export const ProjectDetailPage: Story = {
  args: {
    title: "2026 리브랜딩",
    tabs,
    headerActions: <Button variant="secondary">편집</Button>,
  },
};
