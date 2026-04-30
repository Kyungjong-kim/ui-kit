import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "./switch";

describe("Switch", () => {
  it("label을 렌더한다", () => {
    render(<Switch label="알림 활성화" />);
    expect(screen.getByText("알림 활성화")).toBeInTheDocument();
  });

  it("클릭 시 onCheckedChange가 호출된다", async () => {
    const onCheckedChange = vi.fn();
    render(<Switch label="알림" onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("disabled 상태에서 클릭해도 변경되지 않는다", async () => {
    const onCheckedChange = vi.fn();
    render(<Switch label="알림" disabled onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByRole("switch"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});
