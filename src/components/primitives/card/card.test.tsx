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
});
