import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";

describe("Accordion", () => {
  const setup = () =>
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>질문 1</AccordionTrigger>
          <AccordionContent>답변 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

  it("trigger가 렌더된다", () => {
    setup();
    expect(screen.getByText("질문 1")).toBeInTheDocument();
  });

  it("클릭 시 content가 열린다", async () => {
    setup();
    await userEvent.click(screen.getByText("질문 1"));
    expect(screen.getByText("답변 1")).toBeVisible();
  });
});
