import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FormPageTemplate } from "./form-page-template";

describe("FormPageTemplate", () => {
  it("제목과 폼 본문을 렌더한다", () => {
    render(
      <FormPageTemplate title="사용자 등록">
        <div>폼 섹션</div>
      </FormPageTemplate>,
    );
    expect(screen.getByText("사용자 등록")).toBeInTheDocument();
    expect(screen.getByText("폼 섹션")).toBeInTheDocument();
  });

  it("설명이 있으면 렌더한다", () => {
    render(
      <FormPageTemplate title="사용자 등록" description="필수 항목을 입력하세요">
        <div>본문</div>
      </FormPageTemplate>,
    );
    expect(screen.getByText("필수 항목을 입력하세요")).toBeInTheDocument();
  });

  it("저장 버튼 제출 시 onSubmit이 호출된다", () => {
    const onSubmit = vi.fn((event) => event.preventDefault());
    render(
      <FormPageTemplate title="제목" onSubmit={onSubmit}>
        <div>본문</div>
      </FormPageTemplate>,
    );
    fireEvent.click(screen.getByRole("button", { name: "저장" }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("취소 버튼 클릭 시 onCancel이 호출된다", () => {
    const onCancel = vi.fn();
    render(
      <FormPageTemplate title="제목" onCancel={onCancel}>
        <div>본문</div>
      </FormPageTemplate>,
    );
    fireEvent.click(screen.getByRole("button", { name: "취소" }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("isSubmitting이면 취소 버튼이 비활성화된다", () => {
    render(
      <FormPageTemplate title="제목" onCancel={() => {}} isSubmitting>
        <div>본문</div>
      </FormPageTemplate>,
    );
    expect(screen.getByRole("button", { name: "취소" })).toBeDisabled();
  });
});
