import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NavFlyout, type NavFlyoutItem } from "./nav-flyout";

const items: NavFlyoutItem[] = [
  { id: "profile", label: "프로필", icon: "user" },
  { id: "settings", label: "설정", icon: "gear" },
];

describe("NavFlyout", () => {
  it("트리거를 렌더한다", () => {
    render(<NavFlyout trigger={<button type="button">메뉴</button>} items={items} />);
    expect(screen.getByText("메뉴")).toBeInTheDocument();
  });

  it("트리거 클릭 시 항목을 표시한다", async () => {
    const user = userEvent.setup();
    render(<NavFlyout trigger={<button type="button">메뉴</button>} items={items} />);
    await user.click(screen.getByText("메뉴"));
    expect(screen.getByText("프로필")).toBeInTheDocument();
    expect(screen.getByText("설정")).toBeInTheDocument();
  });

  it("항목 클릭 시 onSelect를 호출한다", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <NavFlyout
        trigger={<button type="button">메뉴</button>}
        items={[{ id: "profile", label: "프로필", onSelect }]}
      />,
    );
    await user.click(screen.getByText("메뉴"));
    await user.click(screen.getByText("프로필"));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("controlled open이면 즉시 항목을 표시한다", () => {
    render(
      <NavFlyout
        trigger={<button type="button">메뉴</button>}
        items={items}
        open
        onOpenChange={() => {}}
      />,
    );
    expect(screen.getByText("프로필")).toBeInTheDocument();
  });

  it("disabled 항목은 onSelect를 호출하지 않는다", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <NavFlyout
        trigger={<button type="button">메뉴</button>}
        items={[{ id: "x", label: "비활성", onSelect, disabled: true }]}
        open
        onOpenChange={() => {}}
      />,
    );
    await user.click(screen.getByText("비활성"));
    expect(onSelect).not.toHaveBeenCalled();
  });
});
