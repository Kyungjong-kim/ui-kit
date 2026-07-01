import type { Meta, StoryObj } from "@storybook/react";
import type { ColumnDef } from "@tanstack/react-table";
import { SelectButton } from "../src/components/composed/select-button";
import { Badge } from "../src/components/primitives/badge";
import { Button } from "../src/components/primitives/button";
import { Input } from "../src/components/primitives/input";
import { BulkActionListPageTemplate } from "../src/templates/bulk-action-list-page-template";

interface Document {
  id: string;
  title: string;
  owner: string;
  size: string;
  status: "게시됨" | "초안" | "보관됨";
  updatedAt: string;
}

const STATUS_VARIANT = {
  게시됨: "success",
  초안: "warning",
  보관됨: "default",
} as const;

const columns: ColumnDef<Document, unknown>[] = [
  { accessorKey: "title", header: "문서명" },
  { accessorKey: "owner", header: "소유자" },
  { accessorKey: "size", header: "크기" },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => (
      <Badge variant={STATUS_VARIANT[row.original.status]} size="sm">
        {row.original.status}
      </Badge>
    ),
  },
  { accessorKey: "updatedAt", header: "수정일" },
];

const OWNERS = ["김철수", "이영희", "박민수", "정다은"];
const STATUSES: Document["status"][] = ["게시됨", "초안", "보관됨"];

const data: Document[] = Array.from({ length: 14 }, (_, i) => ({
  id: String(i + 1),
  title: `분기 보고서 ${i + 1}.pdf`,
  owner: OWNERS[i % OWNERS.length],
  size: `${((i + 1) * 1.3).toFixed(1)} MB`,
  status: STATUSES[i % STATUSES.length],
  updatedAt: `2026-06-${String((i % 28) + 1).padStart(2, "0")}`,
}));

const meta: Meta<typeof BulkActionListPageTemplate<Document>> = {
  title: "Templates/BulkActionListPageTemplate",
  component: BulkActionListPageTemplate,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BulkActionListPageTemplate<Document>>;

/**
 * 실제 "문서 관리" 페이지 목업.
 * 행 선택 체크박스 + 1개 이상 선택 시 나타나는 일괄 액션 바(내보내기·보관·삭제)를
 * 갖춘 완성 화면. 상단 체크박스를 클릭하면 선택 개수와 액션 바가 활성화된다.
 */
export const DocumentManagementPage: Story = {
  render: () => (
    <div className="px-inline-xxl py-stack-xxl">
      <BulkActionListPageTemplate
        title="문서 관리"
        count={data.length}
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        enableSorting
        pageSize={8}
        search={<Input placeholder="문서명 검색" className="w-72" />}
        sort={<SelectButton endIcon="chevronDownThickFalse">수정일순</SelectButton>}
        headerActions={<Button>문서 업로드</Button>}
        bulkActions={(rows) => (
          <>
            <Button variant="secondary" onClick={() => console.log("내보내기:", rows)}>
              내보내기
            </Button>
            <Button variant="secondary" onClick={() => console.log("보관:", rows)}>
              보관
            </Button>
            <Button variant="destructive" onClick={() => console.log("삭제:", rows)}>
              선택 삭제
            </Button>
          </>
        )}
      />
    </div>
  ),
};
