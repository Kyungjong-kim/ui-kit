import type { ColumnDef } from "@tanstack/react-table";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { BulkActionListPageTemplate } from "./bulk-action-list-page-template";

interface Row {
  id: string;
  name: string;
}

const columns: ColumnDef<Row, unknown>[] = [{ accessorKey: "name", header: "이름" }];
const data: Row[] = [
  { id: "1", name: "김철수" },
  { id: "2", name: "이영희" },
];

describe("BulkActionListPageTemplate", () => {
  it("제목과 데이터 행을 렌더한다", () => {
    render(
      <BulkActionListPageTemplate
        title="사용자 목록"
        columns={columns}
        data={data}
        bulkActions={() => <button type="button">삭제</button>}
      />,
    );
    expect(screen.getByText("사용자 목록")).toBeInTheDocument();
    expect(screen.getByText("김철수")).toBeInTheDocument();
  });

  it("선택 전에는 일괄 액션 바를 렌더하지 않는다", () => {
    render(
      <BulkActionListPageTemplate
        title="목록"
        columns={columns}
        data={data}
        bulkActions={() => <button type="button">삭제</button>}
      />,
    );
    expect(screen.queryByText("삭제")).not.toBeInTheDocument();
  });

  it("행 선택 시 선택 개수와 일괄 액션을 렌더한다", async () => {
    const user = userEvent.setup();
    render(
      <BulkActionListPageTemplate
        title="목록"
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        bulkActions={(rows) => <button type="button">{rows.length}건 삭제</button>}
      />,
    );
    const checkboxes = screen.getAllByRole("checkbox");
    // checkboxes[0] = 전체 선택 헤더, 이후 = 행별 선택
    await user.click(checkboxes[1]);
    expect(screen.getByText(/선택됨/)).toBeInTheDocument();
    expect(screen.getByText("1건 삭제")).toBeInTheDocument();
  });

  it("전체 선택 시 모든 행이 선택 개수에 반영된다", async () => {
    const user = userEvent.setup();
    render(
      <BulkActionListPageTemplate
        title="목록"
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        bulkActions={(rows) => <button type="button">{rows.length}건 삭제</button>}
      />,
    );
    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]);
    expect(screen.getByText("2건 삭제")).toBeInTheDocument();
  });

  it("selectionUnit으로 선택 라벨 접미사를 바꾼다", async () => {
    const user = userEvent.setup();
    render(
      <BulkActionListPageTemplate
        title="목록"
        columns={columns}
        data={data}
        getRowId={(row) => row.id}
        selectionUnit="개 항목 선택"
        bulkActions={() => <button type="button">삭제</button>}
      />,
    );
    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[1]);
    expect(screen.getByText(/개 항목 선택/)).toBeInTheDocument();
  });
});
