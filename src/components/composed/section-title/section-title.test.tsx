import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SectionTitle } from "./section-title";

describe("SectionTitle", () => {
  it("타이틀을 렌더한다", () => {
    render(<SectionTitle title="기본 정보" />);
    expect(screen.getByRole("heading", { name: "기본 정보" })).toBeInTheDocument();
  });

  it("description을 렌더한다", () => {
    render(<SectionTitle title="기본 정보" description="상세 설명입니다" />);
    expect(screen.getByText("상세 설명입니다")).toBeInTheDocument();
  });

  it("infoIcon 노드를 렌더한다", () => {
    render(<SectionTitle title="기본 정보" infoIcon={<span>도움말</span>} />);
    expect(screen.getByText("도움말")).toBeInTheDocument();
  });

  it("actions를 렌더한다", () => {
    render(<SectionTitle title="기본 정보" actions={<button type="button">추가</button>} />);
    expect(screen.getByRole("button", { name: "추가" })).toBeInTheDocument();
  });

  it("onClose 전달 시 닫기 버튼을 노출하고 클릭 시 호출한다", async () => {
    const onClose = vi.fn();
    render(<SectionTitle title="모달 제목" onClose={onClose} />);
    const closeButton = screen.getByRole("button", { name: "닫기" });
    expect(closeButton).toBeInTheDocument();
    await userEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it("type=modal이면 닫기 버튼을 노출하고 actions는 렌더하지 않는다", () => {
    render(
      <SectionTitle type="modal" title="모달 제목" actions={<button type="button">추가</button>} />,
    );
    expect(screen.getByRole("button", { name: "닫기" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "추가" })).not.toBeInTheDocument();
  });
});
