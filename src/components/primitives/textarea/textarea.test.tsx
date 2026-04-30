import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("label을 렌더한다", () => {
    render(<Textarea label="내용" />);
    expect(screen.getByText("내용")).toBeInTheDocument();
  });

  it("error 상태에서 helperText를 렌더한다", () => {
    render(<Textarea error helperText="필수 입력 항목입니다." />);
    expect(screen.getByText("필수 입력 항목입니다.")).toBeInTheDocument();
  });

  it("disabled 상태에서 textarea가 비활성화된다", () => {
    render(<Textarea disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("rows prop이 적용된다", () => {
    render(<Textarea rows={5} />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "5");
  });
});
