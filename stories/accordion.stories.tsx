import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../src/components/primitives/accordion";

const meta: Meta = {
  title: "Primitives/Accordion",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const items = [
  { value: "q1", trigger: "ui-kit이란 무엇인가요?", content: "개인 디자인 시스템입니다. React + Tailwind v4 + Radix UI로 구성됩니다." },
  { value: "q2", trigger: "어떻게 설치하나요?", content: "pnpm add ui-kit 으로 설치할 수 있습니다." },
  { value: "q3", trigger: "브랜드 컬러는?", content: "골든 앰버(#FABC37)를 기반으로 합니다." },
];

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value} className="border-b border-[var(--color-border-default)]">
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};
