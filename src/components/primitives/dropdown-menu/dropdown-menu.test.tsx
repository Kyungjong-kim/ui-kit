import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./dropdown-menu";
import { Button } from "../../primitives/button";

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
});
