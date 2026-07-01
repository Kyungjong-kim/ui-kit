import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ModalPageTemplate } from "./modal-page-template";

describe("ModalPageTemplate", () => {
  it("open=true이면 모달이 렌더된다", () => {
    render(<ModalPageTemplate open onClose={() => {}} title="모달" />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("open=false이면 렌더되지 않는다", () => {
    render(<ModalPageTemplate open={false} onClose={() => {}} title="모달" />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("타이틀과 본문이 렌더된다", () => {
    render(
      <ModalPageTemplate open onClose={() => {}} title="확인">
        <p>정말 삭제하시겠습니까?</p>
      </ModalPageTemplate>,
    );
    expect(screen.getByText("확인")).toBeInTheDocument();
    expect(screen.getByText("정말 삭제하시겠습니까?")).toBeInTheDocument();
  });

  it("footer 액션이 렌더된다", () => {
    render(
      <ModalPageTemplate
        open
        onClose={() => {}}
        title="확인"
        footer={<button type="button">삭제</button>}
      />,
    );
    expect(screen.getByText("삭제")).toBeInTheDocument();
  });

  it("닫기 버튼 클릭 시 onClose가 호출된다", async () => {
    const onClose = vi.fn();
    render(<ModalPageTemplate open onClose={onClose} title="모달" />);
    await userEvent.click(screen.getByRole("button", { name: "닫기" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
