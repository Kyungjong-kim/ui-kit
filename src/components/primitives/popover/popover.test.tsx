import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

describe("Popover", () => {
  it("renders trigger", () => {
    render(
      <Popover>
        <PopoverTrigger>열기</PopoverTrigger>
        <PopoverContent>콘텐츠</PopoverContent>
      </Popover>,
    );
    expect(screen.getByText("열기")).toBeTruthy();
  });

  it("shows content on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>열기</PopoverTrigger>
        <PopoverContent>팝오버 콘텐츠</PopoverContent>
      </Popover>,
    );
    await user.click(screen.getByText("열기"));
    expect(screen.getByText("팝오버 콘텐츠")).toBeTruthy();
  });
});
