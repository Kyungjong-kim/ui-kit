import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SidePanelPageTemplate } from "./side-panel-page-template";

describe("SidePanelPageTemplate", () => {
  it("open=true이면 패널이 렌더된다", () => {
    render(<SidePanelPageTemplate open onClose={() => {}} title="패널" />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("open=false이면 렌더되지 않는다", () => {
    render(<SidePanelPageTemplate open={false} onClose={() => {}} title="패널" />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("타이틀과 본문이 렌더된다", () => {
    render(
      <SidePanelPageTemplate open onClose={() => {}} title="상세 정보">
        <p>본문 콘텐츠</p>
      </SidePanelPageTemplate>,
    );
    expect(screen.getByText("상세 정보")).toBeInTheDocument();
    expect(screen.getByText("본문 콘텐츠")).toBeInTheDocument();
  });

  it("footer 액션이 렌더된다", () => {
    render(
      <SidePanelPageTemplate
        open
        onClose={() => {}}
        title="패널"
        footer={<button type="button">적용</button>}
      >
        본문
      </SidePanelPageTemplate>,
    );
    expect(screen.getByText("적용")).toBeInTheDocument();
  });

  it("닫기 버튼 클릭 시 onClose가 호출된다", async () => {
    const onClose = vi.fn();
    render(<SidePanelPageTemplate open onClose={onClose} title="패널" />);
    await userEvent.click(screen.getByRole("button", { name: "닫기" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
