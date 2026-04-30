import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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
});
