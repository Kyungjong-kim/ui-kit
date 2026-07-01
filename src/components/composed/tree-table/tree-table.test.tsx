import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TreeTable, type TreeTableColumn, type TreeTableNode } from "./tree-table";

interface Row extends TreeTableNode {
  name: string;
  size: string;
}

const columns: TreeTableColumn<Row>[] = [
  { key: "name", header: "이름" },
  { key: "size", header: "크기" },
];

const data: Row[] = [
  {
    id: "1",
    name: "폴더 A",
    size: "-",
    children: [
      { id: "1-1", name: "파일 1", size: "10KB" },
      { id: "1-2", name: "파일 2", size: "20KB" },
    ],
  },
  { id: "2", name: "파일 B", size: "5KB" },
];

describe("TreeTable", () => {
  it("최상위 행을 렌더한다", () => {
    render(<TreeTable columns={columns} data={data} />);
    expect(screen.getByText("폴더 A")).toBeInTheDocument();
    expect(screen.getByText("파일 B")).toBeInTheDocument();
  });

  it("기본적으로 자식은 접혀 있다", () => {
    render(<TreeTable columns={columns} data={data} />);
    expect(screen.queryByText("파일 1")).not.toBeInTheDocument();
  });

  it("토글 버튼 클릭 시 자식을 펼친다", async () => {
    render(<TreeTable columns={columns} data={data} />);
    await userEvent.click(screen.getByRole("button", { name: "펼치기" }));
    expect(screen.getByText("파일 1")).toBeInTheDocument();
    expect(screen.getByText("파일 2")).toBeInTheDocument();
  });

  it("defaultExpandedIds로 초기 펼침 상태를 지정한다", () => {
    render(<TreeTable columns={columns} data={data} defaultExpandedIds={["1"]} />);
    expect(screen.getByText("파일 1")).toBeInTheDocument();
  });

  it("data가 비면 빈 상태 메시지를 렌더한다", () => {
    render(<TreeTable columns={columns} data={[]} emptyMessage="항목 없음" />);
    expect(screen.getByText("항목 없음")).toBeInTheDocument();
  });
});
