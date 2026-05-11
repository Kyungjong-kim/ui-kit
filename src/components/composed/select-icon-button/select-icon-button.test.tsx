import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SelectIconButton } from "./select-icon-button";

describe("SelectIconButton", () => {
  it("버튼을 렌더한다", () => {
    render(<SelectIconButton icon="x" aria-label="닫기" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("초기 aria-pressed는 false이다", () => {
    render(<SelectIconButton icon="x" aria-label="닫기" />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  it("클릭하면 선택 상태가 토글된다", async () => {
    render(<SelectIconButton icon="x" aria-label="닫기" />);
    const btn = screen.getByRole("button");
    await userEvent.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "true");
  });

  it("onChange가 호출된다", async () => {
    const onChange = vi.fn();
    render(<SelectIconButton icon="x" aria-label="닫기" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("disabled이면 비활성화된다", () => {
    render(<SelectIconButton icon="x" aria-label="닫기" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
