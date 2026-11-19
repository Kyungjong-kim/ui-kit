import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FieldHelperText } from "./field-helper-text";

describe("FieldHelperText", () => {
  it("안내 문구는 tertiary 색이고 아이콘이 없다", () => {
    const { container } = render(<FieldHelperText id="h">안내</FieldHelperText>);
    const p = screen.getByText("안내");
    expect(p).toHaveAttribute("id", "h");
    expect(p.className).toMatch(/color-text-tertiary/);
    expect(container.querySelector("svg")).toBeNull();
  });

  it("오류 문구는 danger 색이고 장식용 경고 아이콘이 앞에 붙는다", () => {
    const { container } = render(
      <FieldHelperText id="h" error>
        필수 입력
      </FieldHelperText>,
    );
    expect(screen.getByText("필수 입력").className).toMatch(/color-text-danger-default/);
    const icon = container.querySelector("svg");
    expect(icon).not.toBeNull();
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("disabled 이면 오류여도 disabled 색이 우선하고 아이콘이 없다", () => {
    const { container } = render(
      <FieldHelperText id="h" error disabled>
        비활성
      </FieldHelperText>,
    );
    expect(screen.getByText("비활성").className).toMatch(/color-text-disabled/);
    expect(container.querySelector("svg")).toBeNull();
  });
});
