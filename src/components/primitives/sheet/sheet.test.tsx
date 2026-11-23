import { fireEvent, render, screen } from "@testing-library/react";
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

  it("title·닫기 버튼이 모두 없어도 숨김 제목으로 이름을 준다", () => {
    render(
      <Sheet open onOpenChange={() => {}} showClose={false}>
        <p>본문</p>
      </Sheet>,
    );
    expect(screen.getByRole("dialog", { name: "대화상자" })).toBeInTheDocument();
  });

  it("trigger 를 누르면 open 제어 없이도 열린다", () => {
    render(
      <Sheet title="설정" trigger={<button type="button">열기</button>}>
        <p>본문</p>
      </Sheet>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "열기" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("닫기 버튼은 Dialog 와 같은 focus-ring·hover 배경 (ring-offset 방식 아님)", () => {
    render(<Sheet open title="패널" onOpenChange={() => {}} />);
    const close = screen.getByRole("button", { name: "닫기" });
    expect(close).toHaveClass("focus-ring", "rounded-xs");
    expect(close.className).toMatch(/hover:bg-\[var\(--color-bg-tertiary\)\]/);
    expect(close.className).not.toMatch(/focus:ring/);
  });
});
