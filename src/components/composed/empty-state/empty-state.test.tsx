import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  it("타이틀을 렌더한다", () => {
    render(<EmptyState title="데이터 없음" />);
    expect(screen.getByText("데이터 없음")).toBeInTheDocument();
  });

  it("description을 렌더한다", () => {
    render(<EmptyState description="항목이 없습니다" />);
    expect(screen.getByText("항목이 없습니다")).toBeInTheDocument();
  });

  it("내용이 없으면 렌더하지 않는다", () => {
    const { container } = render(<EmptyState />);
    expect(container.firstChild).toBeNull();
  });

  it("primaryAction 버튼이 렌더된다", () => {
    render(<EmptyState primaryAction={{ label: "새로 만들기" }} />);
    expect(screen.getByRole("button", { name: "새로 만들기" })).toBeInTheDocument();
  });

  it("primaryAction onClick이 호출된다", async () => {
    const onClick = vi.fn();
    render(<EmptyState primaryAction={{ label: "새로 만들기", onClick }} />);
    await userEvent.click(screen.getByRole("button", { name: "새로 만들기" }));
    expect(onClick).toHaveBeenCalled();
  });

  it("tertiaryAction과 primaryAction이 모두 렌더된다", () => {
    render(<EmptyState primaryAction={{ label: "확인" }} tertiaryAction={{ label: "취소" }} />);
    expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "취소" })).toBeInTheDocument();
  });

  it("illustSrc가 있으면 img를 렌더한다", () => {
    render(<EmptyState illustSrc="https://example.com/illust.png" illustAlt="일러스트" />);
    expect(screen.getByRole("img", { name: "일러스트" })).toBeInTheDocument();
  });
});
