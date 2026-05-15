import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "../src/components/primitives/spinner";

const meta: Meta<typeof Spinner> = {
  title: "Feedback/Spinner",
  component: Spinner,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="flex items-center gap-2 text-[var(--color-text-secondary)] text-sm">
      <Spinner size="sm" />
      <span>불러오는 중...</span>
    </div>
  ),
};
