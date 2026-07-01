import type { Meta, StoryObj } from "@storybook/react";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../src/components/primitives/button";
import { Input } from "../src/components/primitives/input";
import { BulkActionListPageTemplate } from "../src/templates/bulk-action-list-page-template";

interface User {
  id: string;
  name: string;
  email: string;
}

const columns: ColumnDef<User, unknown>[] = [
  { accessorKey: "name", header: "이름" },
  { accessorKey: "email", header: "이메일" },
];

const data: User[] = Array.from({ length: 6 }, (_, i) => ({
  id: String(i + 1),
  name: `사용자${i + 1}`,
  email: `user${i + 1}@example.com`,
}));

const meta: Meta<typeof BulkActionListPageTemplate<User>> = {
  title: "Templates/BulkActionListPageTemplate",
  component: BulkActionListPageTemplate,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BulkActionListPageTemplate<User>>;

export const Basic: Story = {
  render: () => (
    <BulkActionListPageTemplate
      title="사용자 관리"
      columns={columns}
      data={data}
      getRowId={(row) => row.id}
      bulkActions={(rows) => (
        <Button variant="secondary" onClick={() => console.log("삭제:", rows)}>
          삭제
        </Button>
      )}
    />
  ),
};

export const WithControls: Story = {
  render: () => (
    <BulkActionListPageTemplate
      title="사용자 관리"
      count={data.length}
      columns={columns}
      data={data}
      getRowId={(row) => row.id}
      enableSorting
      search={<Input placeholder="검색" className="w-64" />}
      headerActions={<Button>추가</Button>}
      bulkActions={(rows) => (
        <>
          <Button variant="secondary">내보내기</Button>
          <Button onClick={() => console.log("삭제:", rows)}>선택 삭제</Button>
        </>
      )}
    />
  ),
};
