import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Thumbnail } from "./thumbnail";

describe("Thumbnail", () => {
  it("src가 있으면 img를 렌더한다", () => {
    render(<Thumbnail src="https://example.com/img.png" alt="테스트 이미지" />);
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "https://example.com/img.png");
  });

  it("src가 없으면 img를 렌더하지 않는다", () => {
    render(<Thumbnail />);
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("src가 공백이면 img를 렌더하지 않는다", () => {
    render(<Thumbnail src="   " />);
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("기본 ratio는 1:1(aspect-square)이다", () => {
    const { container } = render(<Thumbnail />);
    expect(container.firstChild).toHaveClass("aspect-square");
  });

  it("ratio=16:9이면 aspect-[16/9] 클래스가 적용된다", () => {
    const { container } = render(<Thumbnail ratio="16:9" />);
    expect(container.firstChild).toHaveClass("aspect-[16/9]");
  });

  it("className이 루트 요소에 추가된다", () => {
    const { container } = render(<Thumbnail className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
