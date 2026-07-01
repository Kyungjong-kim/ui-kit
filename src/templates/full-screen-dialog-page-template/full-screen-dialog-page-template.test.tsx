import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FullScreenDialogPageTemplate } from "./full-screen-dialog-page-template";

describe("FullScreenDialogPageTemplate", () => {
  it("open=true이면 다이얼로그가 렌더된다", () => {
    render(<FullScreenDialogPageTemplate open onClose={() => {}} title="전체화면" />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("open=false이면 렌더되지 않는다", () => {
    render(<FullScreenDialogPageTemplate open={false} onClose={() => {}} title="전체화면" />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("타이틀과 본문이 렌더된다", () => {
    render(
      <FullScreenDialogPageTemplate open onClose={() => {}} title="문서 편집">
        <p>본문 영역</p>
      </FullScreenDialogPageTemplate>,
    );
    expect(screen.getByText("문서 편집")).toBeInTheDocument();
    expect(screen.getByText("본문 영역")).toBeInTheDocument();
  });

  it("headerActions와 footer가 렌더된다", () => {
    render(
      <FullScreenDialogPageTemplate
        open
        onClose={() => {}}
        title="문서"
        headerActions={<button type="button">저장</button>}
        footer={<button type="button">완료</button>}
      >
        본문
      </FullScreenDialogPageTemplate>,
    );
    expect(screen.getByText("저장")).toBeInTheDocument();
    expect(screen.getByText("완료")).toBeInTheDocument();
  });

  it("닫기 버튼 클릭 시 onClose가 호출된다", async () => {
    const onClose = vi.fn();
    render(<FullScreenDialogPageTemplate open onClose={onClose} title="전체화면" />);
    await userEvent.click(screen.getByRole("button", { name: "닫기" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
