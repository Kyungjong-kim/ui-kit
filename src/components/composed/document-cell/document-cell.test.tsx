import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DocumentCell } from "./document-cell";

const file = { id: "1", name: "report.pdf" };

describe("DocumentCell", () => {
  it("파일명을 렌더한다", () => {
    render(<DocumentCell file={file} />);
    expect(screen.getByText("report.pdf")).toBeInTheDocument();
  });

  it("파일 확장자를 대문자로 렌더한다", () => {
    render(<DocumentCell file={file} />);
    expect(screen.getByText("PDF")).toBeInTheDocument();
  });

  it("onRemove가 있으면 삭제 버튼이 렌더된다", () => {
    render(<DocumentCell file={file} onRemove={vi.fn()} />);
    expect(screen.getByRole("button", { name: "파일 삭제" })).toBeInTheDocument();
  });

  it("삭제 버튼 클릭 시 onRemove가 파일 id와 함께 호출된다", async () => {
    const onRemove = vi.fn();
    render(<DocumentCell file={file} onRemove={onRemove} />);
    await userEvent.click(screen.getByRole("button", { name: "파일 삭제" }));
    expect(onRemove).toHaveBeenCalledWith("1");
  });

  it("disabled이면 삭제 버튼이 비활성화된다", () => {
    render(<DocumentCell file={file} onRemove={vi.fn()} disabled />);
    expect(screen.getByRole("button", { name: "파일 삭제" })).toBeDisabled();
  });
});
