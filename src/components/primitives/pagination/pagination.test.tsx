import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./pagination";

describe("Pagination", () => {
  it("totalPages=0이면 null을 반환한다", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={0} onPageChange={() => {}} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("totalPages=5 일 때 모든 페이지 버튼을 렌더한다", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
    for (const p of [1, 2, 3, 4, 5]) {
      expect(screen.getByRole("button", { name: `${p} 페이지` })).toBeInTheDocument();
    }
  });

  it("totalPages가 충분히 클 때 ellipsis를 표시한다", () => {
    render(<Pagination currentPage={5} totalPages={20} onPageChange={() => {}} />);
    expect(screen.getByRole("button", { name: "1 페이지" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "20 페이지" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "5 페이지" })).toBeInTheDocument();
  });

  it("현재 페이지에 aria-current가 붙는다", () => {
    render(<Pagination currentPage={3} totalPages={10} onPageChange={() => {}} />);
    expect(screen.getByRole("button", { name: "3 페이지" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("페이지 클릭 시 onPageChange가 호출된다", async () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByRole("button", { name: "3 페이지" }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("이전 버튼이 currentPage=1에서 비활성화된다", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByRole("button", { name: "이전" })).toBeDisabled();
  });

  it("다음 버튼이 currentPage=totalPages에서 비활성화된다", () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByRole("button", { name: "다음" })).toBeDisabled();
  });

  it("이전·다음 클릭 시 정확한 페이지로 이동한다", async () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByRole("button", { name: "이전" }));
    expect(onPageChange).toHaveBeenCalledWith(2);
    await userEvent.click(screen.getByRole("button", { name: "다음" }));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("currentPage가 범위를 벗어나면 클램프된다", () => {
    render(<Pagination currentPage={99} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByRole("button", { name: "5 페이지" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
