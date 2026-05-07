import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("텍스트를 렌더한다", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("disabled 상태에서 클릭 이벤트가 발생하지 않는다", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Click
      </Button>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("variant=destructive 클래스가 적용된다", () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/destructive/);
  });

  it("loading=true일 때 Spinner가 렌더되고 버튼이 비활성화된다", () => {
    render(<Button loading>저장</Button>);
    const button = screen.getByRole("button");
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("loading=true일 때 children도 함께 렌더된다", () => {
    render(<Button loading>저장 중</Button>);
    expect(screen.getByText("저장 중")).toBeInTheDocument();
  });
});
