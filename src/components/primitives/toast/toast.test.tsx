import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Toaster } from "./toast";

describe("Toaster", () => {
  it("Toaster가 DOM에 마운트된다", () => {
    render(<Toaster />);
    expect(document.body).toBeInTheDocument();
  });
});
