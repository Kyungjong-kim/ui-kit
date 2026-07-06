import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Text } from "./text";

describe("Text", () => {
  it("텍스트를 렌더한다", () => {
    render(<Text>안녕하세요</Text>);
    expect(screen.getByText("안녕하세요")).toBeInTheDocument();
  });

  it("기본 태그는 span이다", () => {
    render(<Text>기본</Text>);
    expect(screen.getByText("기본").tagName).toBe("SPAN");
  });

  it("as prop으로 태그를 변경한다", () => {
    render(<Text as="p">단락</Text>);
    expect(screen.getByText("단락").tagName).toBe("P");
  });

  it("variant 클래스가 적용된다", () => {
    render(<Text variant="typography-headline-lg">제목</Text>);
    expect(screen.getByText("제목").className).toMatch(/typography-headline-lg/);
  });

  it("align 클래스가 적용된다", () => {
    render(<Text align="center">가운데</Text>);
    expect(screen.getByText("가운데").className).toMatch(/text-center/);
  });

  it("fullWidth가 true이면 block w-full 클래스가 적용된다", () => {
    render(<Text fullWidth>전체너비</Text>);
    expect(screen.getByText("전체너비").className).toMatch(/w-full/);
  });
});
