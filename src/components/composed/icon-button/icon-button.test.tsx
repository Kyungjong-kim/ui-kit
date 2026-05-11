import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { IconButton } from "./icon-button";

describe("IconButton", () => {
  it("버튼을 렌더한다", () => {
    render(<IconButton icon="x" aria-label="닫기" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("아이콘이 렌더된다", () => {
    const { container } = render(<IconButton icon="x" aria-label="닫기" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("onClick이 호출된다", async () => {
    const onClick = vi.fn();
    render(<IconButton icon="x" aria-label="닫기" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });

  it("disabled이면 비활성화된다", () => {
    render(<IconButton icon="x" aria-label="닫기" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shape=circle이면 rounded-full 클래스가 적용된다", () => {
    render(<IconButton icon="x" aria-label="닫기" shape="circle" />);
    expect(screen.getByRole("button").className).toMatch(/rounded-full/);
  });

  it("size=xs이면 h-6 w-6 클래스가 적용된다", () => {
    render(<IconButton icon="x" aria-label="닫기" size="xs" />);
    expect(screen.getByRole("button").className).toMatch(/h-6/);
  });
});
