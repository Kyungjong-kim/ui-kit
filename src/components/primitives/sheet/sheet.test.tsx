import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Sheet } from "./sheet";

describe("Sheet", () => {
  it("open=true일 때 title을 렌더한다", () => {
    render(
      <Sheet open title="사이드 패널" onOpenChange={() => {}}>
        <p>패널 내용</p>
      </Sheet>,
    );
    expect(screen.getByText("사이드 패널")).toBeInTheDocument();
  });

  it("open=false일 때 렌더되지 않는다", () => {
    render(
      <Sheet open={false} title="사이드 패널" onOpenChange={() => {}}>
        <p>패널 내용</p>
      </Sheet>,
    );
    expect(screen.queryByText("사이드 패널")).not.toBeInTheDocument();
  });

  it("children과 footer가 렌더된다", () => {
    render(
      <Sheet open title="패널" onOpenChange={() => {}} footer={<button type="button">저장</button>}>
        <p>본문</p>
      </Sheet>,
    );
    expect(screen.getByText("본문")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "저장" })).toBeInTheDocument();
  });

  it("showClose=true일 때 닫기 버튼이 렌더된다", () => {
    render(<Sheet open title="패널" onOpenChange={() => {}} />);
    expect(screen.getByRole("button", { name: "닫기" })).toBeInTheDocument();
  });

  it("showClose=false일 때 닫기 버튼이 없다", () => {
    render(<Sheet open title="패널" showClose={false} onOpenChange={() => {}} />);
    expect(screen.queryByRole("button", { name: "닫기" })).not.toBeInTheDocument();
  });

  it.each(["top", "right", "bottom", "left"] as const)("side=%s 가 정상 렌더된다", (side) => {
    render(<Sheet open side={side} title={`${side} 패널`} onOpenChange={() => {}} />);
    expect(screen.getByText(`${side} 패널`)).toBeInTheDocument();
  });
});
