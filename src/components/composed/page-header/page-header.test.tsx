import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageHeader } from "./page-header";

describe("PageHeader", () => {
  it("타이틀을 렌더한다", () => {
    render(<PageHeader title="페이지 제목" />);
    expect(screen.getByText("페이지 제목")).toBeInTheDocument();
  });

  it("header 요소를 렌더한다", () => {
    render(<PageHeader title="페이지 제목" />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("isLoading이면 스켈레톤을 렌더하고 타이틀을 숨긴다", () => {
    render(<PageHeader title="페이지 제목" isLoading />);
    expect(screen.queryByText("페이지 제목")).toBeNull();
  });

  it("rightTrailingButton이 렌더된다", () => {
    render(<PageHeader title="제목" rightTrailingButton={<button type="button">액션</button>} />);
    expect(screen.getByText("액션")).toBeInTheDocument();
  });

  it("titleElement가 있으면 title 대신 렌더된다", () => {
    render(<PageHeader title="제목" titleElement={<span>커스텀 타이틀</span>} />);
    expect(screen.getByText("커스텀 타이틀")).toBeInTheDocument();
    expect(screen.queryByText("제목")).toBeNull();
  });
});
