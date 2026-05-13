import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

describe("Breadcrumb", () => {
  it("기본 aria-label='이동 경로'를 가진 nav를 렌더한다", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>홈</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(screen.getByRole("navigation", { name: "이동 경로" })).toBeInTheDocument();
  });

  it("커스텀 aria-label을 적용한다", () => {
    render(
      <Breadcrumb aria-label="페이지 경로">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>현재</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(screen.getByRole("navigation", { name: "페이지 경로" })).toBeInTheDocument();
  });

  it("Link와 Page를 함께 렌더한다", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">홈</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>상세</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(screen.getByRole("link", { name: "홈" })).toHaveAttribute("href", "/");
    const current = screen.getByText("상세");
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("asChild로 커스텀 컴포넌트를 래핑한다", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <a href="/docs" data-testid="custom-link">
                문서
              </a>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(screen.getByTestId("custom-link")).toHaveAttribute("href", "/docs");
  });

  it("Ellipsis를 렌더한다", () => {
    render(<BreadcrumbEllipsis />);
    expect(screen.getByText("더보기")).toBeInTheDocument();
  });

  it("Separator children으로 커스텀 구분자를 사용한다", () => {
    render(<BreadcrumbSeparator>/</BreadcrumbSeparator>);
    expect(screen.getByText("/")).toBeInTheDocument();
  });
});
