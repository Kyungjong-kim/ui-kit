import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FileUpload } from "./file-upload";

describe("FileUpload", () => {
  it("드롭존 안내 문구를 렌더한다", () => {
    render(<FileUpload onFilesChange={() => {}} />);
    expect(screen.getByText(/파일을 드래그하거나/)).toBeInTheDocument();
  });

  it("accept 힌트가 표시된다", () => {
    render(<FileUpload onFilesChange={() => {}} accept={{ "image/*": [] }} />);
    expect(screen.getByText(/파일을 드래그하거나/)).toBeInTheDocument();
  });
});
