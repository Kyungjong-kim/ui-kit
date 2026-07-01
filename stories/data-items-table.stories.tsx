import type { Meta, StoryObj } from "@storybook/react";
import { type DataItemsField, DataItemsTable } from "../src/components/primitives/data-items-table";

interface Server {
  name: string;
  status: string;
  region: string;
  cpu: string;
}

const fields: DataItemsField<Server>[] = [
  { key: "name", label: "서버명" },
  { key: "region", label: "리전" },
  { key: "cpu", label: "CPU" },
];

const data: Server[] = [
  { name: "web-01", status: "running", region: "ap-northeast-2", cpu: "12%" },
  { name: "web-02", status: "running", region: "ap-northeast-2", cpu: "34%" },
  { name: "db-01", status: "stopped", region: "us-east-1", cpu: "0%" },
];

const meta: Meta<typeof DataItemsTable<Server>> = {
  title: "Data Display/DataItemsTable",
  component: DataItemsTable,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataItemsTable<Server>>;

export const Default: Story = {
  args: { fields, data },
};

export const WithStatusBadge: Story = {
  args: {
    fields: [
      ...fields,
      {
        key: "status",
        label: "상태",
        render: (item) => (
          <span
            className={
              item.status === "running"
                ? "text-[var(--color-text-success-default)]"
                : "text-[var(--color-text-tertiary)]"
            }
          >
            {item.status}
          </span>
        ),
      },
    ],
    data,
  },
};

export const Empty: Story = {
  args: { fields, data: [], emptyMessage: "서버가 없습니다" },
};
