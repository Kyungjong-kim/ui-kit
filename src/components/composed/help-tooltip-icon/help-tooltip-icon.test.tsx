import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { HelpTooltipIcon } from "./help-tooltip-icon";

describe("HelpTooltipIcon", () => {
  it("트리거 버튼을 렌더한다", () => {
    render(<HelpTooltipIcon content="도움말 내용" />);
    expect(screen.getByRole("button", { name: "도움말" })).toBeInTheDocument();
  });

  it("물음표 글리프를 표시한다", () => {
    render(<HelpTooltipIcon content="설명" />);
    expect(screen.getByRole("button").textContent).toBe("?");
  });

  it("custom aria-label을 반영한다", () => {
    render(<HelpTooltipIcon content="설명" aria-label="필드 도움말" />);
    expect(screen.getByRole("button", { name: "필드 도움말" })).toBeInTheDocument();
  });

  it("포커스 시 툴팁 내용이 표시된다", async () => {
    render(<HelpTooltipIcon content="포커스 도움말" delayDuration={0} />);
    await userEvent.tab();
    expect(await screen.findAllByText("포커스 도움말")).not.toHaveLength(0);
  });
});
