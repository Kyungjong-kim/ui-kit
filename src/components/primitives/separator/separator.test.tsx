import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Separator } from "./separator";

describe("Separator", () => {
  it("기본 horizontal separator를 렌더한다", () => {
    const { container } = render(<Separator />);
    const el = container.firstChild as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(el.getAttribute("data-orientation")).toBe("horizontal");
  });

  it("vertical orientation이 적용된다", () => {
    const { container } = render(<Separator orientation="vertical" />);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute("data-orientation")).toBe("vertical");
  });
});
