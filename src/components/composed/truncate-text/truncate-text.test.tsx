import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TruncateText } from "./truncate-text";

describe("TruncateText", () => {
  it("children 텍스트를 렌더한다", () => {
    render(<TruncateText>아주 긴 텍스트 내용</TruncateText>);
    expect(screen.getByText("아주 긴 텍스트 내용")).toBeInTheDocument();
  });

  it("말줄임(truncate) 클래스를 적용한다", () => {
    render(<TruncateText>텍스트</TruncateText>);
    expect(screen.getByText("텍스트").className).toMatch(/truncate/);
  });

  it("className을 병합한다", () => {
    render(<TruncateText className="custom-class">텍스트</TruncateText>);
    const el = screen.getByText("텍스트");
    expect(el.className).toMatch(/truncate/);
    expect(el.className).toMatch(/custom-class/);
  });

  it("비문자열 children도 렌더한다", () => {
    render(
      <TruncateText>
        <strong>강조 텍스트</strong>
      </TruncateText>,
    );
    expect(screen.getByText("강조 텍스트")).toBeInTheDocument();
  });
});
