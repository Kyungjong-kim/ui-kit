import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ResetButton } from "./reset-button";

describe("ResetButton", () => {
  it("기본 라벨 '초기화'로 렌더한다", () => {
    render(<ResetButton />);
    expect(screen.getByRole("button", { name: /초기화/ })).toBeInTheDocument();
  });

  it("custom label을 렌더한다", () => {
    render(<ResetButton label="되돌리기" />);
    expect(screen.getByText("되돌리기")).toBeInTheDocument();
  });

  it("아이콘이 렌더된다", () => {
    const { container } = render(<ResetButton />);
    expect(container.querySelector("[data-icon]")).toBeInTheDocument();
  });

  it("onClick이 호출된다", async () => {
    const onClick = vi.fn();
    render(<ResetButton onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });

  it("loading=true이면 비활성화된다", () => {
    render(<ResetButton loading />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
