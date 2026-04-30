import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

describe("Badge", () => {
  it("텍스트를 렌더한다", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("variant 클래스가 적용된다", () => {
    render(<Badge variant="success">Active</Badge>);
    expect(screen.getByText("Active").className).toMatch(/success/);
  });
});
