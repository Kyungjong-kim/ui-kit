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
});
