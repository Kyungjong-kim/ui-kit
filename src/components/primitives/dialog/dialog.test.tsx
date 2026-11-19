import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Dialog } from "./dialog";

describe("Dialog", () => {
  it("open=true일 때 title을 렌더한다", () => {
    render(
      <Dialog open title="삭제 확인" onOpenChange={() => {}}>
        <p>정말 삭제하시겠습니까?</p>
      </Dialog>,
    );
    expect(screen.getByText("삭제 확인")).toBeInTheDocument();
  });

  it("open=false일 때 렌더되지 않는다", () => {
    render(
      <Dialog open={false} title="삭제 확인" onOpenChange={() => {}}>
        <p>정말 삭제하시겠습니까?</p>
      </Dialog>,
    );
    expect(screen.queryByText("삭제 확인")).not.toBeInTheDocument();
  });

  it("children이 렌더된다", () => {
    render(
      <Dialog open title="확인" onOpenChange={() => {}}>
        <p>dialog content</p>
      </Dialog>,
    );
    expect(screen.getByText("dialog content")).toBeInTheDocument();
  });

  it("title 이 없어도 숨김 제목으로 대화상자 이름을 주고 Radix 경고를 내지 않는다", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <Dialog open onOpenChange={() => {}} showClose={false}>
        <p>본문</p>
      </Dialog>,
    );
    expect(screen.getByRole("dialog", { name: "대화상자" })).toBeInTheDocument();
    expect(errorSpy).not.toHaveBeenCalledWith(expect.stringContaining("DialogTitle"));
    errorSpy.mockRestore();
  });
});
