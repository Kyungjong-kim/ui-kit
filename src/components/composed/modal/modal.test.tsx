import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "./modal";

describe("Modal", () => {
  it("open=true이면 모달이 렌더된다", () => {
    render(<Modal open title="테스트 모달" />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("open=false이면 모달이 렌더되지 않는다", () => {
    render(<Modal open={false} title="테스트 모달" />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("타이틀이 렌더된다", () => {
    render(<Modal open title="테스트 타이틀" />);
    expect(screen.getByText("테스트 타이틀")).toBeInTheDocument();
  });

  it("content가 렌더된다", () => {
    render(<Modal open title="모달" content={<p>내용입니다</p>} />);
    expect(screen.getByText("내용입니다")).toBeInTheDocument();
  });

  it("닫기 버튼 클릭 시 onOpenChange(false)가 호출된다", async () => {
    const onOpenChange = vi.fn();
    render(<Modal open title="모달" onOpenChange={onOpenChange} />);
    const closeBtn = screen.getByRole("button");
    await userEvent.click(closeBtn);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("primaryAction이 렌더된다", () => {
    render(<Modal open title="모달" primaryAction={<button type="button">확인</button>} />);
    expect(screen.getByText("확인")).toBeInTheDocument();
  });
});
