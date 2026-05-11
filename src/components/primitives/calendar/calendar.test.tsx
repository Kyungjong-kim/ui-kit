import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Calendar } from "./calendar";

describe("Calendar", () => {
  it("renders calendar root", () => {
    const { container } = render(<Calendar mode="single" />);
    expect(container.querySelector("[data-slot='calendar']")).toBeTruthy();
  });

  it("renders with selected date", () => {
    const selected = new Date(2026, 4, 8);
    const { container } = render(<Calendar mode="single" selected={selected} />);
    const selectedBtn = container.querySelector("[data-selected-single='true']");
    expect(selectedBtn).toBeTruthy();
  });
});
