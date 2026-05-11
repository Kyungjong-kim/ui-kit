import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TextSkeleton } from "./text-skeleton";

describe("TextSkeleton", () => {
  it("렌더된다", () => {
    const { container } = render(<TextSkeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("size=md이면 h-[20px] 클래스가 적용된다", () => {
    const { container } = render(<TextSkeleton size="md" />);
    expect(container.firstChild).toHaveClass("h-[20px]");
  });

  it("size=sm이면 h-[12px] 클래스가 적용된다", () => {
    const { container } = render(<TextSkeleton size="sm" />);
    expect(container.firstChild).toHaveClass("h-[12px]");
  });

  it("width가 인라인 스타일로 적용된다", () => {
    const { container } = render(<TextSkeleton width={60} />);
    expect((container.firstChild as HTMLElement).style.width).toBe("60%");
  });

  it("width는 0~100으로 클램핑된다", () => {
    const { container: c1 } = render(<TextSkeleton width={-10} />);
    const { container: c2 } = render(<TextSkeleton width={200} />);
    expect((c1.firstChild as HTMLElement).style.width).toBe("0%");
    expect((c2.firstChild as HTMLElement).style.width).toBe("100%");
  });
});
