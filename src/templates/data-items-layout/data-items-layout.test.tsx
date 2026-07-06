import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { DataItemsField } from "../../components";
import { DataItemsLayout } from "./data-items-layout";

interface Item {
  id: string;
  name: string;
  role: string;
}

const fields: DataItemsField<Item>[] = [
  { key: "name", label: "이름" },
  { key: "role", label: "역할" },
];
const data: Item[] = [
  { id: "1", name: "김철수", role: "관리자" },
  { id: "2", name: "이영희", role: "편집자" },
];

describe("DataItemsLayout", () => {
  it("제목과 카드 아이템을 렌더한다", () => {
    render(<DataItemsLayout title="멤버 목록" fields={fields} data={data} />);
    expect(screen.getByText("멤버 목록")).toBeInTheDocument();
    expect(screen.getByText("김철수")).toBeInTheDocument();
    expect(screen.getByText("관리자")).toBeInTheDocument();
  });

  it("count 지정 시 ListControl에 개수를 표시한다", () => {
    render(<DataItemsLayout title="목록" count={2} fields={fields} data={data} />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("검색·필터 슬롯을 렌더한다", () => {
    render(
      <DataItemsLayout
        title="목록"
        fields={fields}
        data={data}
        search={<input data-testid="search" />}
        filter={<button type="button">필터</button>}
      />,
    );
    expect(screen.getByTestId("search")).toBeInTheDocument();
    expect(screen.getByText("필터")).toBeInTheDocument();
  });

  it("빈 데이터 시 emptyMessage를 렌더한다", () => {
    render(
      <DataItemsLayout title="목록" fields={fields} data={[]} emptyMessage="항목이 없습니다" />,
    );
    expect(screen.getByText("항목이 없습니다")).toBeInTheDocument();
  });
});
