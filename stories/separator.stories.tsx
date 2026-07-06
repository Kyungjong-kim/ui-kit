import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "../src/components/primitives/separator";

const meta: Meta<typeof Separator> = {
  title: "Atoms/Display/Separator",
  component: Separator,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <p className="text-sm text-[var(--color-text-secondary)]">위 섹션</p>
      <Separator className="my-3" />
      <p className="text-sm text-[var(--color-text-secondary)]">아래 섹션</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-3 h-8">
      <span className="text-sm">Home</span>
      <Separator orientation="vertical" />
      <span className="text-sm">About</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Contact</span>
    </div>
  ),
};
