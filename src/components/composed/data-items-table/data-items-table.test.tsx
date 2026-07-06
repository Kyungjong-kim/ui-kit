import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { type DataItemsField, DataItemsTable } from "./data-items-table";

interface Item {
  name: string;
  role: string;
}

const fields: DataItemsField<Item>[] = [
  { key: "name", label: "이름" },
  { key: "role", label: "역할" },
];

const data: Item[] = [
  { name: "홍길동", role: "관리자" },
  { name: "김철수", role: "사용자" },
];

describe("DataItemsTable", () => {
  it("각 아이템의 라벨과 값을 렌더한다", () => {
    render(<DataItemsTable fields={fields} data={data} />);
    expect(screen.getAllByText("이름")).toHaveLength(2);
    expect(screen.getByText("홍길동")).toBeInTheDocument();
    expect(screen.getByText("관리자")).toBeInTheDocument();
  });

  it("render 함수로 값을 커스터마이징한다", () => {
    const custom: DataItemsField<Item>[] = [
      { key: "role", label: "역할", render: (item) => `[${item.role}]` },
    ];
    render(<DataItemsTable fields={custom} data={data} />);
    expect(screen.getByText("[관리자]")).toBeInTheDocument();
  });

  it("data가 비면 기본 빈 상태 메시지를 렌더한다", () => {
    render(<DataItemsTable fields={fields} data={[]} />);
    expect(screen.getByText("데이터가 없습니다")).toBeInTheDocument();
  });

  it("emptyMessage로 빈 상태 문구를 재정의한다", () => {
    render(<DataItemsTable fields={fields} data={[]} emptyMessage="항목이 없습니다" />);
    expect(screen.getByText("항목이 없습니다")).toBeInTheDocument();
  });
});
