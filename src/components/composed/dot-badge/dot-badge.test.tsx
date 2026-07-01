import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DotBadge } from "./dot-badge";

describe("DotBadge", () => {
  it("label을 렌더한다", () => {
    render(<DotBadge tone="success" label="온라인" />);
    expect(screen.getByText("온라인")).toBeInTheDocument();
  });

  it("tone에 맞는 점 색상 클래스를 적용한다", () => {
    const { container } = render(<DotBadge tone="danger" label="오프라인" />);
    const dot = container.querySelector("span > span");
    expect(dot?.className).toMatch(/danger/);
  });

  it("label 없이도 점만 렌더한다", () => {
    const { container } = render(<DotBadge tone="warning" />);
    const dot = container.querySelector("span > span");
    expect(dot).toBeInTheDocument();
    expect(dot?.className).toMatch(/warning/);
  });

  it("neutral tone은 기본값으로 적용된다", () => {
    const { container } = render(<DotBadge label="대기" />);
    const dot = container.querySelector("span > span");
    expect(dot?.className).toMatch(/neutral-400/);
  });
});
