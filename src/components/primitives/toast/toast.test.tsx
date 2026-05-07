import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Toaster, toast } from "./toast";

describe("Toaster", () => {
  it("DOM에 마운트된다", () => {
    const { container } = render(<Toaster />);
    expect(container).toBeInTheDocument();
  });

  it("toast API가 함수로 export된다", () => {
    expect(typeof toast.success).toBe("function");
    expect(typeof toast.error).toBe("function");
    expect(typeof toast.warning).toBe("function");
    expect(typeof toast.info).toBe("function");
  });

  it("toast.success 호출 시 메시지가 렌더된다", async () => {
    render(<Toaster />);
    act(() => {
      toast.success("저장 완료");
    });
    expect(await screen.findByText("저장 완료")).toBeInTheDocument();
  });

  it("toast.error 호출 시 메시지가 렌더된다", async () => {
    render(<Toaster />);
    act(() => {
      toast.error("오류가 발생했습니다");
    });
    expect(await screen.findByText("오류가 발생했습니다")).toBeInTheDocument();
  });
});
