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

  it("색 토큰은 [var(--…)] 형태로 쓴다 (utility 형태 토큰 금지 규칙)", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>열기</PopoverTrigger>
        <PopoverContent>콘텐츠</PopoverContent>
      </Popover>,
    );
    await user.click(screen.getByText("열기"));
    const cls = screen.getByText("콘텐츠").className;
    expect(cls).not.toMatch(/bg-surface-default|text-text-primary|border-border-default/);
    expect(cls).toMatch(/bg-\[var\(--color-bg-primary\)\]/);
  });
});
