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

  it("size=xs이면 control-xxs 크기 클래스가 적용된다", () => {
    render(<IconButton icon="x" aria-label="닫기" size="xs" />);
    expect(screen.getByRole("button").className).toMatch(/h-size-control-xxs/);
  });

  it("기본(secondary)·ghost 아이콘은 흰색이 아니라 보이는 색을 쓴다", () => {
    const { container, rerender } = render(<IconButton icon="x" aria-label="닫기" />);
    expect((container.querySelector("svg") as SVGElement).style.color).toBe(
      "var(--color-icon-secondary)",
    );
    rerender(<IconButton icon="x" variant="ghost" aria-label="닫기" />);
    expect((container.querySelector("svg") as SVGElement).style.color).toBe(
      "var(--color-icon-secondary)",
    );
  });

  it("primary 는 노랑 위라 어두운 아이콘, danger 는 흰 아이콘", () => {
    const { container, rerender } = render(
      <IconButton icon="x" variant="primary" aria-label="추가" />,
    );
    expect((container.querySelector("svg") as SVGElement).style.color).toBe(
      "var(--color-interactive-primary-text)",
    );
    rerender(<IconButton icon="x" variant="danger" aria-label="삭제" />);
    expect((container.querySelector("svg") as SVGElement).style.color).toBe(
      "var(--color-text-on-strong)",
    );
  });

  it("square 는 필드와 같은 6px, outline 은 입력 테두리 토큰", () => {
    render(<IconButton icon="x" appearance="outline" aria-label="설정" />);
    const cls = screen.getByRole("button").className;
    expect(cls).toMatch(/rounded-xs/);
    expect(cls).toMatch(/color-border-input-default/);
    expect(cls).not.toMatch(/text-white/);
  });
});
