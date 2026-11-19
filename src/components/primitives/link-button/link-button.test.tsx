import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LinkButton } from "./link-button";

describe("LinkButton", () => {
  it("링크를 렌더한다", () => {
    render(<LinkButton href="/home">홈으로</LinkButton>);
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/home");
  });

  it("텍스트가 렌더된다", () => {
    render(<LinkButton href="/home">홈으로</LinkButton>);
    expect(screen.getByText("홈으로")).toBeInTheDocument();
  });

  it("label prop으로 텍스트를 지정할 수 있다", () => {
    render(<LinkButton href="/home" label="레이블" />);
    expect(screen.getByText("레이블")).toBeInTheDocument();
  });

  it("disabled이면 a 대신 span을 렌더한다", () => {
    render(
      <LinkButton href="/home" disabled>
        비활성
      </LinkButton>,
    );
    expect(screen.queryByRole("link")).toBeNull();
    expect(document.querySelector("span[aria-disabled='true']")).toBeInTheDocument();
  });

  it("target=_blank이면 rel이 noopener noreferrer로 설정된다", () => {
    render(
      <LinkButton href="/home" target="_blank">
        새 탭
      </LinkButton>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("disabled 여도 id·data-*·aria-* 는 유지하고 onClick 은 붙이지 않는다", () => {
    const onClick = vi.fn();
    render(
      <LinkButton
        href="/x"
        disabled
        id="lb"
        data-testid="lb"
        aria-describedby="hint"
        onClick={onClick}
      >
        이동
      </LinkButton>,
    );
    const el = screen.getByTestId("lb");
    expect(el).toHaveAttribute("id", "lb");
    expect(el).toHaveAttribute("aria-describedby", "hint");
    expect(el).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(el);
    expect(onClick).not.toHaveBeenCalled();
  });
});
