import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RefreshButton } from "./refresh-button";

describe("RefreshButton", () => {
  it("기본 aria-label로 버튼을 렌더한다", () => {
    render(<RefreshButton />);
    expect(screen.getByRole("button", { name: "새로고침" })).toBeInTheDocument();
  });

  it("onClick이 호출된다", async () => {
    const onClick = vi.fn();
    render(<RefreshButton onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalled();
  });

  it("loading=true이면 비활성화되고 aria-busy가 설정된다", () => {
    render(<RefreshButton loading />);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-busy", "true");
  });

  it("loading=true이면 아이콘 회전 클래스가 적용된다", () => {
    render(<RefreshButton loading />);
    expect(screen.getByRole("button").className).toMatch(/animate-spin/);
  });

  it("disabled이면 클릭해도 onClick이 호출되지 않는다", async () => {
    const onClick = vi.fn();
    render(<RefreshButton disabled onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});
