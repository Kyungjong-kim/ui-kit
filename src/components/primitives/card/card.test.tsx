import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card, CardBody, CardFooter, CardHeader } from "./card";

describe("Card", () => {
  it("children을 렌더한다", () => {
    render(<Card>카드 내용</Card>);
    expect(screen.getByText("카드 내용")).toBeInTheDocument();
  });

  it("CardHeader/CardBody/CardFooter가 렌더된다", () => {
    render(
      <Card>
        <CardHeader>헤더</CardHeader>
        <CardBody>바디</CardBody>
        <CardFooter>푸터</CardFooter>
      </Card>,
    );
    expect(screen.getByText("헤더")).toBeInTheDocument();
    expect(screen.getByText("바디")).toBeInTheDocument();
    expect(screen.getByText("푸터")).toBeInTheDocument();
  });

  it("카드 계열 공통 규격: 12px 라운드·hairline·그림자 없음·20px 여백 (Warm Precision)", () => {
    const { container } = render(
      <Card>
        <CardBody>내용</CardBody>
      </Card>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("rounded-md");
    expect(root.className).not.toMatch(/rounded-lg|shadow-default/);
    expect(screen.getByText("내용")).toHaveClass("p-inline-xl");
  });
});
