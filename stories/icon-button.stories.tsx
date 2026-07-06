import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "../src/components/composed/icon-button";

const meta: Meta<typeof IconButton> = {
  title: "Atoms/Buttons/IconButton",
  component: IconButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <IconButton icon="x" variant="primary" aria-label="primary" />
      <IconButton icon="x" variant="secondary" aria-label="secondary" />
      <IconButton icon="x" variant="ghost" aria-label="ghost" />
      <IconButton icon="x" variant="danger" aria-label="danger" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex gap-3">
      <IconButton icon="x" shape="square" aria-label="square" />
      <IconButton icon="x" shape="circle" aria-label="circle" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-3 items-center">
      <IconButton icon="x" size="xs" aria-label="xs" />
      <IconButton icon="x" size="sm" aria-label="sm" />
      <IconButton icon="x" size="md" aria-label="md" />
      <IconButton icon="x" size="lg" aria-label="lg" />
    </div>
  ),
};
