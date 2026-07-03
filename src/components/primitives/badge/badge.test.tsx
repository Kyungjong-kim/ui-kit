import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

describe("Badge", () => {
  it("텍스트를 렌더한다", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("variant=success 클래스가 적용된다", () => {
    render(<Badge variant="success">Active</Badge>);
    expect(screen.getByText("Active").className).toMatch(/color-text-success-strong/);
  });

  it("variant=info가 렌더된다", () => {
    render(<Badge variant="info">정보</Badge>);
    expect(screen.getByText("정보")).toBeInTheDocument();
  });

  it("size=sm 클래스가 적용된다", () => {
    render(<Badge size="sm">Small</Badge>);
    expect(screen.getByText("Small").className).toMatch(/typography-label-xs/);
  });

  it("size=md 클래스가 적용된다 (기본값)", () => {
    render(<Badge>Medium</Badge>);
    expect(screen.getByText("Medium").className).toMatch(/typography-label-sm-medium/);
  });

  it("appearance 미지정 시 subtle 스타일을 유지한다 (기존 호환)", () => {
    render(<Badge variant="success">Active</Badge>);
    const cls = screen.getByText("Active").className;
    expect(cls).toMatch(/color-bg-success-subtle/);
    expect(cls).not.toMatch(/color-text-inverse/);
  });

  it("appearance=solid이 진한 배경과 대비 텍스트를 적용한다", () => {
    render(
      <Badge variant="success" appearance="solid">
        Active
      </Badge>,
    );
    const cls = screen.getByText("Active").className;
    expect(cls).toMatch(/color-bg-success-default/);
    expect(cls).toMatch(/color-text-inverse/);
  });
});
