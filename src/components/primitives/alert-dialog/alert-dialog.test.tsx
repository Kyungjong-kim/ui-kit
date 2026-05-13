import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AlertDialog } from "./alert-dialog";

describe("AlertDialog", () => {
  it("open=true일 때 title을 렌더한다", () => {
    render(<AlertDialog open title="삭제 확인" onOpenChange={() => {}} />);
    expect(screen.getByText("삭제 확인")).toBeInTheDocument();
  });

  it("open=false일 때 렌더되지 않는다", () => {
    render(<AlertDialog open={false} title="삭제 확인" onOpenChange={() => {}} />);
    expect(screen.queryByText("삭제 확인")).not.toBeInTheDocument();
  });

  it("description과 children이 렌더된다", () => {
    render(
      <AlertDialog open title="확인" description="설명입니다" onOpenChange={() => {}}>
        <p>추가 내용</p>
      </AlertDialog>,
    );
    expect(screen.getByText("설명입니다")).toBeInTheDocument();
    expect(screen.getByText("추가 내용")).toBeInTheDocument();
  });

  it("기본 cancel/action 버튼 텍스트를 보여준다", () => {
    render(<AlertDialog open title="확인" onOpenChange={() => {}} />);
    expect(screen.getByRole("button", { name: "취소" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument();
  });

  it("커스텀 cancelText·actionText를 적용한다", () => {
    render(
      <AlertDialog
        open
        title="확인"
        cancelText="아니오"
        actionText="삭제"
        destructive
        onOpenChange={() => {}}
      />,
    );
    expect(screen.getByRole("button", { name: "아니오" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "삭제" })).toBeInTheDocument();
  });

  it("action 클릭 시 onAction이 호출된다", async () => {
    const onAction = vi.fn();
    render(<AlertDialog open title="확인" onAction={onAction} onOpenChange={() => {}} />);
    await userEvent.click(screen.getByRole("button", { name: "확인" }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("cancel 클릭 시 onCancel이 호출된다", async () => {
    const onCancel = vi.fn();
    render(<AlertDialog open title="확인" onCancel={onCancel} onOpenChange={() => {}} />);
    await userEvent.click(screen.getByRole("button", { name: "취소" }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
