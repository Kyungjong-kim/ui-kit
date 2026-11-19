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

  it("max 를 넘거나 음수인 value 는 범위로 잘라 aria-valuenow 를 유지한다", () => {
    const { rerender } = render(<Progress value={150} max={100} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
    rerender(<Progress value={-5} max={100} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });

  it("max 가 0 이하면 100 을 최대값으로 쓴다", () => {
    render(<Progress value={40} max={0} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
    expect(bar).toHaveAttribute("aria-valuenow", "40");
  });

  it("label 을 progressbar 의 접근 가능한 이름으로 연결한다", () => {
    render(<Progress value={30} label="업로드" />);
    expect(screen.getByRole("progressbar", { name: "업로드" })).toBeInTheDocument();
  });
});
