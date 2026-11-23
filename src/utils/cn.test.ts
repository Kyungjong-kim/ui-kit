import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("typography-* 유틸끼리는 충돌로 보고 뒤의 것만 남긴다", () => {
    expect(cn("typography-label-md-medium", "typography-label-lg-medium")).toBe(
      "typography-label-lg-medium",
    );
  });

  it("typography-* 는 text 색 유틸과 충돌하지 않는다", () => {
    const out = cn("typography-label-md-medium", "text-[var(--color-text-primary)]");
    expect(out).toContain("typography-label-md-medium");
    expect(out).toContain("text-[var(--color-text-primary)]");
  });
});
