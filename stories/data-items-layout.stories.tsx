import type { Meta, StoryObj } from "@storybook/react";
import type { DataItemsField } from "../src/components/composed/data-items-table";
import { Button } from "../src/components/primitives/button";
import { Input } from "../src/components/primitives/input";
import { DataItemsLayout } from "../src/templates/data-items-layout";

interface Server {
  id: string;
  name: string;
  status: string;
  region: string;
}

const fields: DataItemsField<Server>[] = [
  { key: "name", label: "이름" },
  { key: "status", label: "상태" },
  { key: "region", label: "리전" },
];

const data: Server[] = Array.from({ length: 6 }, (_, i) => ({
  id: String(i + 1),
  name: `server-${i + 1}`,
  status: i % 2 === 0 ? "실행 중" : "중지됨",
  region: i % 3 === 0 ? "ap-northeast-2" : "us-east-1",
}));

const meta: Meta<typeof DataItemsLayout<Server>> = {
  title: "Templates/DataItemsLayout",
  component: DataItemsLayout,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataItemsLayout<Server>>;

export const Basic: Story = {
  render: () => <DataItemsLayout title="서버 목록" fields={fields} data={data} />,
};

export const WithControls: Story = {
  render: () => (
    <DataItemsLayout
      title="서버 목록"
      count={data.length}
      fields={fields}
      data={data}
      search={<Input placeholder="검색" className="w-64" />}
      headerActions={<Button>서버 추가</Button>}
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <DataItemsLayout
      title="서버 목록"
      count={0}
      fields={fields}
      data={[]}
      emptyMessage="등록된 서버가 없습니다"
    />
  ),
};
