import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "../../primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

describe("DropdownMenu", () => {
  it("trigger가 렌더된다", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>메뉴 열기</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>편집</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(screen.getByRole("button", { name: "메뉴 열기" })).toBeInTheDocument();
  });

  it("trigger 클릭 시 메뉴 아이템이 표시된다", async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>메뉴 열기</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>편집</DropdownMenuItem>
          <DropdownMenuItem>삭제</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(await screen.findByText("편집")).toBeInTheDocument();
  });

  it("메뉴 패널은 select 계열과 같은 8px 라운드, 항목은 4px·tertiary hover (Warm Precision)", async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>메뉴 열기</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>편집</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await userEvent.click(screen.getByRole("button"));
    const item = await screen.findByRole("menuitem", { name: "편집" });
    expect(screen.getByRole("menu")).toHaveClass("rounded-sm", "p-stack-xs");
    expect(item).toHaveClass("rounded-xxs");
    expect(item.className).toMatch(/hover:bg-\[var\(--color-bg-tertiary\)\]/);
  });
});
