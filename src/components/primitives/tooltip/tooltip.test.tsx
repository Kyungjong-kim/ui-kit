import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "../../primitives/button";
import { Tooltip } from "./tooltip";

describe("Tooltip", () => {
  it("trigger 자식을 렌더한다", () => {
    render(
      <Tooltip content="도움말">
        <Button>hover me</Button>
      </Tooltip>,
    );
    expect(screen.getByRole("button", { name: "hover me" })).toBeInTheDocument();
  });

  it("hover 시 content가 나타난다", async () => {
    render(
      <Tooltip content="도움말 텍스트">
        <Button>hover me</Button>
      </Tooltip>,
    );
    await userEvent.hover(screen.getByRole("button"));
    const tooltips = await screen.findAllByText("도움말 텍스트");
    expect(tooltips.length).toBeGreaterThan(0);
  });
});
