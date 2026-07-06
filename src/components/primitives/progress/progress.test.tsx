import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Progress } from "./progress";

describe("Progress", () => {
  it("progressbar role로 렌더된다", () => {
    render(<Progress value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("value가 aria-valuenow에 반영된다", () => {
    render(<Progress value={75} max={100} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "75");
  });

  it("value 없이 렌더하면 indeterminate 상태가 된다", () => {
    render(<Progress />);
    const bar = screen.getByRole("progressbar");
    expect(bar).not.toHaveAttribute("aria-valuenow");
  });

  it("size=sm 클래스가 적용된다", () => {
    render(<Progress value={50} size="sm" />);
    expect(screen.getByRole("progressbar").className).toMatch(/h-stack-xxs/);
  });

  it("size=md 클래스가 적용된다", () => {
    render(<Progress value={50} size="md" />);
    expect(screen.getByRole("progressbar").className).toMatch(/h-stack-xs/);
  });
});
