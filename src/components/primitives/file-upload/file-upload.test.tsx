import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FileUpload } from "./file-upload";

describe("FileUpload", () => {
  it("드롭존 안내 문구를 렌더한다", () => {
    render(<FileUpload onFilesChange={() => {}} />);
    expect(screen.getByText(/파일을 드래그하거나/)).toBeInTheDocument();
  });

  it("maxFiles·maxSize 힌트가 표시된다", () => {
    render(<FileUpload onFilesChange={() => {}} maxFiles={3} maxSize={5 * 1024 * 1024} />);
    expect(screen.getByText(/최대 3개/)).toBeInTheDocument();
    expect(screen.getByText(/5MB/)).toBeInTheDocument();
  });

  it("disabled 상태에서 opacity-50 클래스가 적용된다", () => {
    render(<FileUpload onFilesChange={() => {}} disabled />);
    const dropzone = screen.getByText(/파일을 드래그하거나/).closest('[class*="rounded-md"]');
    expect(dropzone).toHaveClass("opacity-50");
  });

  it("파일 업로드 후 파일명이 렌더된다", async () => {
    render(<FileUpload onFilesChange={() => {}} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(["content"], "report.pdf", { type: "application/pdf" });
    await userEvent.upload(input, file);
    expect(screen.getByText("report.pdf")).toBeInTheDocument();
  });

  it("파일 업로드 시 onFilesChange가 호출된다", async () => {
    const onFilesChange = vi.fn();
    render(<FileUpload onFilesChange={onFilesChange} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(["content"], "data.csv", { type: "text/csv" });
    await userEvent.upload(input, file);
    expect(onFilesChange).toHaveBeenCalledWith([file]);
  });

  it("파일 삭제 버튼 클릭 시 파일이 제거된다", async () => {
    render(<FileUpload onFilesChange={() => {}} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(["content"], "remove-me.txt", { type: "text/plain" });
    await userEvent.upload(input, file);
    expect(screen.getByText("remove-me.txt")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button"));
    expect(screen.queryByText("remove-me.txt")).not.toBeInTheDocument();
  });
});
