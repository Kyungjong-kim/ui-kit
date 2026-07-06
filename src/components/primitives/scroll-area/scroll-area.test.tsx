import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScrollArea } from "./scroll-area";

describe("ScrollArea", () => {
  it("renders children", () => {
    const { getByText } = render(
      <ScrollArea>
        <div>스크롤 콘텐츠</div>
      </ScrollArea>,
    );
    expect(getByText("스크롤 콘텐츠")).toBeTruthy();
  });

  it("renders with data-slot attribute", () => {
    const { container } = render(
      <ScrollArea>
        <div>내용</div>
      </ScrollArea>,
    );
    expect(container.querySelector("[data-slot='scroll-area']")).toBeTruthy();
  });

  it("renders horizontal orientation", () => {
    const { container } = render(
      <ScrollArea orientation="horizontal">
        <div>내용</div>
      </ScrollArea>,
    );
    expect(container.querySelector("[data-slot='scroll-area']")).toBeTruthy();
  });
});
