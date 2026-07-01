import type { Meta, StoryObj } from "@storybook/react";
import type { ColumnDef } from "@tanstack/react-table";
import { SelectButton } from "../src/components/composed/select-button";
import { Badge } from "../src/components/primitives/badge";
import { Button } from "../src/components/primitives/button";
import { Input } from "../src/components/primitives/input";
import { Select } from "../src/components/primitives/select";
import { Tag } from "../src/components/primitives/tag";
import { ListPageTemplate } from "../src/templates/list-page-template";

interface Member {
  id: string;
  name: string;
  email: string;
  team: string;
  role: "관리자" | "편집자" | "뷰어";
  status: "활성" | "대기" | "정지";
  lastActive: string;
}

const STATUS_VARIANT = {
  활성: "success",
  대기: "warning",
  정지: "danger",
} as const;

const ROLE_VARIANT = {
  관리자: "info",
  편집자: "default",
  뷰어: "default",
} as const;

const columns: ColumnDef<Member, unknown>[] = [
  { accessorKey: "name", header: "이름" },
  { accessorKey: "email", header: "이메일" },
  { accessorKey: "team", header: "팀" },
  {
    accessorKey: "role",
    header: "역할",
    cell: ({ row }) => (
      <Tag variant={ROLE_VARIANT[row.original.role]} size="sm">
        {row.original.role}
      </Tag>
    ),
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => (
      <Badge variant={STATUS_VARIANT[row.original.status]} size="sm">
        {row.original.status}
      </Badge>
    ),
  },
  { accessorKey: "lastActive", header: "최근 활동" },
];

const TEAMS = ["플랫폼", "프론트엔드", "백엔드", "디자인", "QA"];
const ROLES: Member["role"][] = ["관리자", "편집자", "뷰어"];
const STATUSES: Member["status"][] = ["활성", "대기", "정지"];

const data: Member[] = Array.from({ length: 23 }, (_, i) => ({
  id: String(i + 1),
  name: `구성원 ${i + 1}`,
  email: `member${i + 1}@genon.ai`,
  team: TEAMS[i % TEAMS.length],
  role: ROLES[i % ROLES.length],
  status: STATUSES[i % STATUSES.length],
  lastActive: `2026-06-${String((i % 28) + 1).padStart(2, "0")}`,
}));

const teamOptions = [
  { value: "all", label: "전체 팀" },
  ...TEAMS.map((t) => ({ value: t, label: t })),
];

const meta: Meta<typeof ListPageTemplate<Member>> = {
  title: "Templates/ListPageTemplate",
  component: ListPageTemplate,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ListPageTemplate<Member>>;

/**
 * 실제 "구성원 관리" 페이지 목업.
 * PageHeader(제목·추가 버튼) + 필터 컨트롤(검색·팀 Select·정렬·필터) +
 * DataTable(상태 Badge·역할 Tag 셀, 정렬, 페이지네이션)을 조합한 완성 화면.
 */
export const MemberManagementPage: Story = {
  render: () => (
    <div className="px-inline-xxl py-stack-xxl">
      <ListPageTemplate
        title="구성원 관리"
        count={data.length}
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        enableSorting
        pageSize={8}
        search={<Input placeholder="이름·이메일 검색" className="w-72" />}
        filter={
          <Select
            options={teamOptions}
            value="all"
            onValueChange={() => {}}
            placeholder="팀 선택"
            className="w-40"
          />
        }
        sort={<SelectButton endIcon="chevronDownThickFalse">최근 활동순</SelectButton>}
        headerActions={<Button>구성원 추가</Button>}
      />
    </div>
  ),
};

/** 검색 결과가 없는 빈 상태 화면. */
export const EmptyState: Story = {
  render: () => (
    <div className="px-inline-xxl py-stack-xxl">
      <ListPageTemplate
        title="구성원 관리"
        count={0}
        columns={columns}
        data={[]}
        search={<Input placeholder="이름·이메일 검색" className="w-72" />}
        headerActions={<Button>구성원 추가</Button>}
      />
    </div>
  ),
};

/** 데이터 로딩 중 스켈레톤 화면. */
export const Loading: Story = {
  render: () => (
    <div className="px-inline-xxl py-stack-xxl">
      <ListPageTemplate
        title="구성원 관리"
        count={data.length}
        columns={columns}
        data={data}
        loading
        search={<Input placeholder="이름·이메일 검색" className="w-72" />}
        headerActions={<Button>구성원 추가</Button>}
      />
    </div>
  ),
};
