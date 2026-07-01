import type { Meta, StoryObj } from "@storybook/react";
import type { DataItemsField } from "../src/components/composed/data-items-table";
import { SelectButton } from "../src/components/composed/select-button";
import { Badge } from "../src/components/primitives/badge";
import { Button } from "../src/components/primitives/button";
import { Input } from "../src/components/primitives/input";
import { DataItemsLayout } from "../src/templates/data-items-layout";

interface Server {
  id: string;
  name: string;
  status: "실행 중" | "중지됨" | "오류";
  region: string;
  cpu: string;
  memory: string;
}

const STATUS_VARIANT = {
  "실행 중": "success",
  중지됨: "default",
  오류: "danger",
} as const;

const fields: DataItemsField<Server>[] = [
  { key: "name", label: "인스턴스" },
  {
    key: "status",
    label: "상태",
    render: (item) => (
      <Badge variant={STATUS_VARIANT[item.status]} size="sm">
        {item.status}
      </Badge>
    ),
  },
  { key: "region", label: "리전" },
  { key: "cpu", label: "CPU" },
  { key: "memory", label: "메모리" },
];

const REGIONS = ["ap-northeast-2", "us-east-1", "eu-west-1"];
const STATUSES: Server["status"][] = ["실행 중", "중지됨", "오류"];

const data: Server[] = Array.from({ length: 9 }, (_, i) => ({
  id: String(i + 1),
  name: `web-node-${String(i + 1).padStart(2, "0")}`,
  status: STATUSES[i % STATUSES.length],
  region: REGIONS[i % REGIONS.length],
  cpu: `${20 + i * 7}%`,
  memory: `${30 + i * 5}%`,
}));

const meta: Meta<typeof DataItemsLayout<Server>> = {
  title: "Templates/DataItemsLayout",
  component: DataItemsLayout,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataItemsLayout<Server>>;

/**
 * 실제 "인스턴스 현황" 페이지 목업.
 * PageHeader(제목·추가 버튼) + 필터 컨트롤(검색·리전·정렬) +
 * DataItemsTable(라벨-값 카드 그리드, 상태 Badge 셀)을 조합한 완성 화면.
 */
export const InstanceOverviewPage: Story = {
  render: () => (
    <div className="p-8">
      <DataItemsLayout
        title="인스턴스 현황"
        count={data.length}
        fields={fields}
        data={data}
        minCardWidth={280}
        search={<Input placeholder="인스턴스 이름 검색" className="w-72" />}
        filter={<SelectButton startIcon="list">전체 리전</SelectButton>}
        sort={<SelectButton endIcon="chevronDownThickFalse">이름순</SelectButton>}
        headerActions={<Button>인스턴스 추가</Button>}
      />
    </div>
  ),
};

/** 등록된 인스턴스가 없는 빈 상태 화면. */
export const EmptyState: Story = {
  render: () => (
    <div className="p-8">
      <DataItemsLayout
        title="인스턴스 현황"
        count={0}
        fields={fields}
        data={[]}
        emptyMessage="등록된 인스턴스가 없습니다"
        search={<Input placeholder="인스턴스 이름 검색" className="w-72" />}
        headerActions={<Button>인스턴스 추가</Button>}
      />
    </div>
  ),
};
