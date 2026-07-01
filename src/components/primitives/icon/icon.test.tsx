import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Icon } from "./icon";

describe("Icon", () => {
  it("renders with default size and no color", () => {
    const { container } = render(<Icon name="app" />);
    const span = container.querySelector("[data-icon='app']");
    expect(span).toBeTruthy();
  });

  it("applies numeric size in px", () => {
    const { container } = render(<Icon name="app" size={24} />);
    const span = container.querySelector("[data-icon='app']") as HTMLElement;
    expect(span.style.width).toBe("24px");
    expect(span.style.height).toBe("24px");
  });

  it("applies token size for named size", () => {
    const { container } = render(<Icon name="app" size="sm" />);
    const span = container.querySelector("[data-icon='app']") as HTMLElement;
    expect(span.style.width).toContain("token-size-icon-sm");
  });

  it("applies color token for named color", () => {
    const { container } = render(<Icon name="app" color="primary" />);
    const svg = container.querySelector("svg") as SVGElement;
    expect(svg.style.color).toContain("icon-primary");
  });

  it("passes through arbitrary string color", () => {
    const { container } = render(<Icon name="app" color="#ff0000" />);
    const svg = container.querySelector("svg") as SVGElement;
    expect(svg.style.color).toBe("rgb(255, 0, 0)");
  });

  it("sets aria-label via prop", () => {
    render(<Icon name="app" aria-label="앱 아이콘" />);
    expect(screen.queryByLabelText("앱 아이콘")).toBeTruthy();
  });

  it("applies className to wrapper span", () => {
    const { container } = render(<Icon name="app" className="test-class" />);
    const span = container.querySelector(".test-class");
    expect(span).toBeTruthy();
  });

  it("의미명 alias를 원본 아이콘으로 렌더한다", () => {
    const { container } = render(<Icon name="success" />);
    // success alias → coloredCircleCheck 원본으로 해석
    const span = container.querySelector("[data-icon='coloredCircleCheck']");
    expect(span).toBeTruthy();
    expect(container.querySelector("svg")).toBeTruthy();
  });

  it("alias와 원본 이름이 동일한 아이콘을 렌더한다", () => {
    const alias = render(<Icon name="close" />);
    const original = render(<Icon name="x" />);
    const aliasIcon = alias.container.querySelector("[data-icon]")?.getAttribute("data-icon");
    const originalIcon = original.container.querySelector("[data-icon]")?.getAttribute("data-icon");
    expect(aliasIcon).toBe(originalIcon);
    expect(aliasIcon).toBe("x");
  });

  it("원본 이름은 alias 도입 후에도 그대로 동작한다(회귀 방지)", () => {
    const { container } = render(<Icon name="gear" />);
    const span = container.querySelector("[data-icon='gear']");
    expect(span).toBeTruthy();
  });
});
