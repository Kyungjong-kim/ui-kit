import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FullScreenDialog } from "./full-screen-dialog";

describe("FullScreenDialog", () => {
  it("open=true이면 다이얼로그가 렌더된다", () => {
    render(<FullScreenDialog open title="전체화면" />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("open=false이면 렌더되지 않는다", () => {
    render(<FullScreenDialog open={false} title="전체화면" />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("타이틀과 본문이 렌더된다", () => {
    render(
      <FullScreenDialog open title="제목">
        <p>본문 내용</p>
      </FullScreenDialog>,
    );
    expect(screen.getByText("제목")).toBeInTheDocument();
    expect(screen.getByText("본문 내용")).toBeInTheDocument();
  });

  it("닫기 버튼 클릭 시 onOpenChange(false)가 호출된다", async () => {
    const onOpenChange = vi.fn();
    render(<FullScreenDialog open title="제목" onOpenChange={onOpenChange} />);
    await userEvent.click(screen.getByRole("button", { name: "닫기" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("footer가 렌더된다", () => {
    render(
      <FullScreenDialog open title="제목" footer={<button type="button">저장</button>}>
        본문
      </FullScreenDialog>,
    );
    expect(screen.getByText("저장")).toBeInTheDocument();
  });
});
