import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FavoriteButton } from "./favorite-button";

describe("FavoriteButton", () => {
  it("기본 aria-label로 버튼을 렌더한다", () => {
    render(<FavoriteButton />);
    expect(screen.getByRole("button", { name: "즐겨찾기" })).toBeInTheDocument();
  });

  it("uncontrolled: 클릭하면 aria-pressed가 토글된다", async () => {
    render(<FavoriteButton />);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "true");
  });

  it("defaultPressed=true이면 초기 상태가 눌림이다", () => {
    render(<FavoriteButton defaultPressed />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("controlled: pressed prop이 상태를 고정한다", async () => {
    render(<FavoriteButton pressed={false} />);
    const btn = screen.getByRole("button");
    await userEvent.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "false");
  });

  it("onPressedChange가 다음 상태로 호출된다", async () => {
    const onPressedChange = vi.fn();
    render(<FavoriteButton onPressedChange={onPressedChange} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });
});
