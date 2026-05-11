import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Chip } from "./chip";

describe("Chip", () => {
  it("텍스트를 렌더한다", () => {
    render(<Chip>태그</Chip>);
    expect(screen.getByText("태그")).toBeInTheDocument();
  });

  it("button 요소를 렌더한다", () => {
    render(<Chip>태그</Chip>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("onClick이 호출된다", async () => {
    const onClick = vi.fn();
    render(<Chip onClick={onClick}>태그</Chip>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });

  it("subDescription이 렌더된다", () => {
    render(<Chip subDescription="설명">태그</Chip>);
    expect(screen.getByText("설명")).toBeInTheDocument();
  });

  it("variant 클래스가 적용된다", () => {
    render(<Chip variant="secondary">태그</Chip>);
    expect(screen.getByRole("button").className).toMatch(/bg-transparent/);
  });
});
