import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "../src/components/primitives/scroll-area";

const meta: Meta<typeof ScrollArea> = {
  title: "Data/ScrollArea",
  component: ScrollArea,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

const listItems = Array.from({ length: 20 }, (_, i) => ({
  id: `list-item-${i + 1}`,
  label: `항목 ${i + 1}`,
}));
const cardItems = Array.from({ length: 10 }, (_, i) => ({
  id: `card-${i + 1}`,
  label: `카드 ${i + 1}`,
}));

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[300px] border border-border-default rounded-md p-4">
      {listItems.map((item) => (
        <p key={item.id} className="typography-body-md-base text-text-primary mb-2">
          {item.label}
        </p>
      ))}
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea
      orientation="horizontal"
      className="w-[300px] border border-border-default rounded-md p-4"
    >
      <div className="flex gap-4" style={{ width: 800 }}>
        {cardItems.map((item) => (
          <div
            key={item.id}
            className="w-[120px] h-[60px] bg-surface-muted rounded-md flex items-center justify-center shrink-0"
          >
            <span className="typography-label-md-base text-text-secondary">{item.label}</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
