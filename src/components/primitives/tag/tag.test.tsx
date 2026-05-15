import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tag } from "./tag";

describe("Tag", () => {
  it("텍스트를 렌더한다", () => {
    render(<Tag>레이블</Tag>);
    expect(screen.getByText("레이블")).toBeInTheDocument();
  });

  it("variant 클래스가 적용된다", () => {
    render(<Tag variant="success">성공</Tag>);
    expect(screen.getByText("성공").className).toMatch(/bg-/);
  });

  it("onRemove 없으면 제거 버튼이 없다", () => {
    render(<Tag>태그</Tag>);
    expect(screen.queryByRole("button", { name: "제거" })).not.toBeInTheDocument();
  });

  it("onRemove 전달 시 제거 버튼이 렌더된다", () => {
    render(<Tag onRemove={vi.fn()}>태그</Tag>);
    expect(screen.getByRole("button", { name: "제거" })).toBeInTheDocument();
  });

  it("제거 버튼 클릭 시 onRemove가 호출된다", async () => {
    const onRemove = vi.fn();
    render(<Tag onRemove={onRemove}>태그</Tag>);
    await userEvent.click(screen.getByRole("button", { name: "제거" }));
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it("size=sm 클래스가 적용된다", () => {
    render(<Tag size="sm">소형</Tag>);
    expect(screen.getByText("소형").className).toMatch(/typography-label-xs/);
  });
});
