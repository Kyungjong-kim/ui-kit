import type { Meta, StoryObj } from "@storybook/react";
import { Table, type TableColumn } from "../src/components/primitives/table";

interface User {
  name: string;
  email: string;
  role: string;
}

const columns: TableColumn<User>[] = [
  { key: "name", header: "이름" },
  { key: "email", header: "이메일" },
  { key: "role", header: "역할" },
];

const data: User[] = [
  { name: "홍길동", email: "hong@example.com", role: "관리자" },
  { name: "김철수", email: "kim@example.com", role: "사용자" },
  { name: "이영희", email: "lee@example.com", role: "사용자" },
];

const meta: Meta<typeof Table<User>> = {
  title: "Data Display/Table",
  component: Table,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table<User>>;

export const Default: Story = {
  args: { columns, data },
};

export const WithCustomRender: Story = {
  args: {
    columns: [
      ...columns.slice(0, 2),
      {
        key: "role",
        header: "역할",
        render: (row) => (
          <span className="rounded-full bg-[var(--color-bg-brand-subtle)] px-2 py-0.5 text-xs text-[var(--color-text-brand-default)]">
            {row.role}
          </span>
        ),
      },
    ],
    data,
  },
};

export const Empty: Story = {
  args: { columns, data: [], emptyMessage: "표시할 사용자가 없습니다" },
};
