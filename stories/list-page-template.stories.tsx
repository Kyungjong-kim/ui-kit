import type { Meta, StoryObj } from "@storybook/react";
import type { ColumnDef } from "@tanstack/react-table";
import { SelectButton } from "../src/components/composed/select-button";
import { Button } from "../src/components/primitives/button";
import { Input } from "../src/components/primitives/input";
import { ListPageTemplate } from "../src/templates/list-page-template";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const columns: ColumnDef<User, unknown>[] = [
  { accessorKey: "name", header: "이름" },
  { accessorKey: "email", header: "이메일" },
  { accessorKey: "role", header: "역할" },
];

const data: User[] = Array.from({ length: 8 }, (_, i) => ({
  id: String(i + 1),
  name: `사용자${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? "관리자" : i % 3 === 1 ? "편집자" : "뷰어",
}));

const meta: Meta<typeof ListPageTemplate<User>> = {
  title: "Templates/ListPageTemplate",
  component: ListPageTemplate,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ListPageTemplate<User>>;

export const Basic: Story = {
  render: () => (
    <ListPageTemplate
      title="사용자 목록"
      columns={columns}
      data={data}
      getRowId={(row) => row.id}
    />
  ),
};

export const WithControls: Story = {
  render: () => (
    <ListPageTemplate
      title="사용자 목록"
      count={data.length}
      columns={columns}
      data={data}
      getRowId={(row) => row.id}
      enableSorting
      pageSize={5}
      search={<Input placeholder="검색어를 입력하세요" className="w-64" />}
      filter={<SelectButton startIcon="list">필터</SelectButton>}
      sort={<SelectButton endIcon="chevronDownThickFalse">최신순</SelectButton>}
      headerActions={<Button>추가</Button>}
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <ListPageTemplate
      title="사용자 목록"
      count={0}
      columns={columns}
      data={[]}
      search={<Input placeholder="검색" className="w-64" />}
    />
  ),
};
