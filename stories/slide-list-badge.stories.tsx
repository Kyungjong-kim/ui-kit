import type { Meta, StoryObj } from "@storybook/react";
import { SlideListBadge } from "../src/components/primitives/slide-list-badge";

const meta: Meta<typeof SlideListBadge> = {
  title: "Display/SlideListBadge",
  component: SlideListBadge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SlideListBadge>;

export const States: Story = {
  render: () => (
    <div className="flex gap-2">
      <SlideListBadge value={1} />
      <SlideListBadge value={2} selected />
      <SlideListBadge value={3} />
    </div>
  ),
};

export const StringValue: Story = {
  render: () => (
    <div className="flex gap-2">
      <SlideListBadge value="A" />
      <SlideListBadge value="B" selected />
    </div>
  ),
};
