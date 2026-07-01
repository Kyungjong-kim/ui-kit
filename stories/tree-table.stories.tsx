import type { Meta, StoryObj } from "@storybook/react";
import {
  TreeTable,
  type TreeTableColumn,
  type TreeTableNode,
} from "../src/components/composed/tree-table";

interface FileRow extends TreeTableNode {
  name: string;
  size: string;
  modified: string;
}

const columns: TreeTableColumn<FileRow>[] = [
  { key: "name", header: "이름" },
  { key: "size", header: "크기" },
  { key: "modified", header: "수정일" },
];

const data: FileRow[] = [
  {
    id: "src",
    name: "src",
    size: "-",
    modified: "2026-06-01",
    children: [
      {
        id: "components",
        name: "components",
        size: "-",
        modified: "2026-06-10",
        children: [
          { id: "table", name: "table.tsx", size: "3KB", modified: "2026-07-01" },
          { id: "tree", name: "tree-table.tsx", size: "5KB", modified: "2026-07-01" },
        ],
      },
      { id: "index", name: "index.ts", size: "1KB", modified: "2026-06-20" },
    ],
  },
  { id: "readme", name: "README.md", size: "2KB", modified: "2026-05-15" },
];

const meta: Meta<typeof TreeTable<FileRow>> = {
  title: "Organisms/Tables/TreeTable",
  component: TreeTable,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TreeTable<FileRow>>;

export const Default: Story = {
  args: { columns, data },
};

export const DefaultExpanded: Story = {
  args: { columns, data, defaultExpandedIds: ["src", "components"] },
};

export const Empty: Story = {
  args: { columns, data: [], emptyMessage: "파일이 없습니다" },
};
