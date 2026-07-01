import type { Meta, StoryObj } from "@storybook/react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../src/components/composed/data-table";

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

const data: User[] = [
  { id: "1", name: "김철수", email: "chulsoo@example.com", role: "관리자" },
  { id: "2", name: "이영희", email: "younghee@example.com", role: "편집자" },
  { id: "3", name: "박민수", email: "minsoo@example.com", role: "뷰어" },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Data Display/DataTable",
  component: DataTable,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

const manyUsers: User[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  name: `사용자${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? "관리자" : i % 3 === 1 ? "편집자" : "뷰어",
}));

export const Basic: Story = {
  render: () => <DataTable data={data} columns={columns} getRowId={(row) => row.id} />,
};

export const Sortable: Story = {
  render: () => (
    <DataTable data={data} columns={columns} getRowId={(row) => row.id} enableSorting />
  ),
};

export const Paginated: Story = {
  render: () => (
    <DataTable
      data={manyUsers}
      columns={columns}
      getRowId={(row) => row.id}
      enableSorting
      pageSize={5}
    />
  ),
};

export const Selectable: Story = {
  render: () => (
    <DataTable
      data={data}
      columns={columns}
      getRowId={(row) => row.id}
      enableRowSelection
      onRowSelectionChange={(rows) => console.log("selected:", rows)}
    />
  ),
};

export const Loading: Story = {
  render: () => <DataTable data={[]} columns={columns} loading pageSize={4} />,
};

export const Empty: Story = {
  render: () => <DataTable data={[]} columns={columns} />,
};
