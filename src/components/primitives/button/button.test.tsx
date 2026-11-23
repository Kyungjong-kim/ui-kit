import { fireEvent, render, screen } from "@testing-library/react";
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

  it("asChild 면 자식 요소를 버튼처럼 렌더한다", () => {
    render(
      <Button asChild variant="primary">
        <a href="/docs">문서</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "문서" });
    expect(link).toHaveAttribute("href", "/docs");
    expect(link.className).toContain("inline-flex");
  });

  it("asChild + loading 이면 Spinner 를 자식 요소 안에 넣는다", () => {
    render(
      <Button asChild loading>
        <a href="/docs">문서</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: /문서/ });
    expect(link).toContainElement(screen.getByRole("status"));
    expect(link).toHaveAttribute("aria-busy", "true");
  });

  it("asChild + disabled 면 aria-disabled 를 붙이고 클릭 이동을 막는다", () => {
    const onClick = vi.fn();
    render(
      <Button asChild disabled onClick={onClick}>
        <a href="/docs">문서</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "문서" });
    expect(link).toHaveAttribute("aria-disabled", "true");
    const notPrevented = fireEvent.click(link);
    expect(notPrevented).toBe(false);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("size=lg 는 lg 글꼴만 갖는다 (base 의 md 가 남지 않음)", () => {
    render(<Button size="lg">큰 버튼</Button>);
    const cls = screen.getByRole("button").className;
    expect(cls).toMatch(/typography-label-lg-medium/);
    expect(cls).not.toMatch(/typography-label-md-medium/);
  });

  it("필드와 같은 6px 라운드, 그림자 없이 hairline (Warm Precision)", () => {
    render(<Button variant="secondary">취소</Button>);
    const cls = screen.getByRole("button").className;
    expect(cls).toMatch(/rounded-xs/);
    expect(cls).not.toMatch(/shadow-default/);
  });
});
