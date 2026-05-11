import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LogoOnlyHeader } from "./logo-only-header";

describe("LogoOnlyHeader", () => {
  it("header 요소를 렌더한다", () => {
    render(<LogoOnlyHeader />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("logoIcon과 onClick이 전달되면 클릭 시 호출된다", async () => {
    const onClick = vi.fn();
    const { container } = render(<LogoOnlyHeader logoIcon="globe" onClick={onClick} />);
    const svg = container.querySelector("svg");
    if (svg) await userEvent.click(svg);
    expect(onClick).toHaveBeenCalled();
  });

  it("logoIcon 없으면 아이콘을 렌더하지 않는다", () => {
    const { container } = render(<LogoOnlyHeader />);
    expect(container.querySelector("svg")).toBeNull();
  });
});
