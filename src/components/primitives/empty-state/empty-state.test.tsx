import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  it("title을 렌더한다", () => {
    render(<EmptyState title="데이터가 없습니다" />);
    expect(screen.getByText("데이터가 없습니다")).toBeInTheDocument();
  });

  it("description이 있으면 렌더한다", () => {
    render(<EmptyState title="오류" description="요청을 처리할 수 없습니다." />);
    expect(screen.getByText("요청을 처리할 수 없습니다.")).toBeInTheDocument();
  });

  it("action 버튼 클릭 시 onAction이 호출된다", async () => {
    const onAction = vi.fn();
    render(<EmptyState title="오류" actionText="다시 시도" onAction={onAction} />);
    await userEvent.click(screen.getByRole("button", { name: "다시 시도" }));
    expect(onAction).toHaveBeenCalled();
  });
});
