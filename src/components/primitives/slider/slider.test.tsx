import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Slider } from "./slider";

describe("Slider", () => {
  it("label을 렌더한다", () => {
    render(<Slider label="볼륨" defaultValue={50} />);
    expect(screen.getByText("볼륨")).toBeInTheDocument();
  });

  it("single 값의 thumb를 1개 렌더한다", () => {
    render(<Slider defaultValue={30} />);
    expect(screen.getAllByRole("slider")).toHaveLength(1);
  });

  it("range 값의 thumb를 2개 렌더한다", () => {
    render(<Slider defaultValue={[20, 80]} />);
    expect(screen.getAllByRole("slider")).toHaveLength(2);
  });

  it("showValue가 현재 값을 표시한다", () => {
    render(<Slider value={[20, 80]} showValue />);
    expect(screen.getByText("20 – 80")).toBeInTheDocument();
  });

  it("disabled 상태가 적용된다", () => {
    const { container } = render(<Slider defaultValue={50} disabled />);
    expect(container.querySelector("[data-disabled]")).toBeInTheDocument();
  });

  it("min/max를 aria 속성에 반영한다", () => {
    render(<Slider defaultValue={5} min={0} max={10} />);
    const thumb = screen.getByRole("slider");
    expect(thumb).toHaveAttribute("aria-valuemin", "0");
    expect(thumb).toHaveAttribute("aria-valuemax", "10");
  });

  it("helperText를 렌더한다", () => {
    render(<Slider defaultValue={50} helperText="0~100 범위" />);
    expect(screen.getByText("0~100 범위")).toBeInTheDocument();
  });
});
