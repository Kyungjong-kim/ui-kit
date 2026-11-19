import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./avatar";

describe("Avatar", () => {
  it("이미지 없을 때 fallback을 렌더한다", () => {
    render(<Avatar fallback="KJ" />);
    expect(screen.getByText("KJ")).toBeInTheDocument();
  });

  it("size 클래스가 적용된다", () => {
    const { container } = render(<Avatar fallback="KJ" size="lg" />);
    expect(container.firstChild).toHaveClass("h-size-avatar-lg");
  });

  it("이미지 로드에 실패하면 fallback 을 보여 준다", () => {
    render(<Avatar src="/broken.png" alt="홍길동" fallback="KJ" />);
    fireEvent.error(screen.getByRole("img", { name: "홍길동" }));
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText("KJ")).toBeInTheDocument();
  });

  it("실패한 뒤 src 가 바뀌면 새 이미지를 다시 보여 준다", () => {
    const { rerender } = render(<Avatar src="/broken.png" alt="홍길동" fallback="KJ" />);
    fireEvent.error(screen.getByRole("img", { name: "홍길동" }));
    rerender(<Avatar src="/ok.png" alt="홍길동" fallback="KJ" />);
    expect(screen.getByRole("img", { name: "홍길동" })).toHaveAttribute("src", "/ok.png");
    expect(screen.getByRole("img", { name: "홍길동" })).toBeVisible();
  });
});
