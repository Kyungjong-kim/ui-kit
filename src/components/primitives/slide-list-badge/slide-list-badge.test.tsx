import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SlideListBadge } from "./slide-list-badge";

describe("SlideListBadge", () => {
  it("value를 렌더한다", () => {
    render(<SlideListBadge value={3} />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("문자열 value도 렌더한다", () => {
    render(<SlideListBadge value="A" />);
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("selected=true이면 selected 클래스가 적용된다", () => {
    render(<SlideListBadge value={1} selected />);
    expect(screen.getByText("1").className).toMatch(/bg-action-primary-default/);
  });

  it("selected=false(기본값)이면 unselected 클래스가 적용된다", () => {
    render(<SlideListBadge value={1} />);
    expect(screen.getByText("1").className).toMatch(/bg-surface-default/);
  });
});
