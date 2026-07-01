import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SidePanel } from "./side-panel";

describe("SidePanel", () => {
  it("open=true이면 패널이 렌더된다", () => {
    render(<SidePanel open title="패널" />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("open=false이면 렌더되지 않는다", () => {
    render(<SidePanel open={false} title="패널" />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("타이틀과 본문이 렌더된다", () => {
    render(
      <SidePanel open title="상세 정보">
        <p>본문 콘텐츠</p>
      </SidePanel>,
    );
    expect(screen.getByText("상세 정보")).toBeInTheDocument();
    expect(screen.getByText("본문 콘텐츠")).toBeInTheDocument();
  });

  it("footer가 렌더된다", () => {
    render(
      <SidePanel open title="패널" footer={<button type="button">적용</button>}>
        본문
      </SidePanel>,
    );
    expect(screen.getByText("적용")).toBeInTheDocument();
  });

  it("닫기 버튼 클릭 시 onOpenChange(false)가 호출된다", async () => {
    const onOpenChange = vi.fn();
    render(<SidePanel open title="패널" onOpenChange={onOpenChange} />);
    await userEvent.click(screen.getByRole("button", { name: "닫기" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
