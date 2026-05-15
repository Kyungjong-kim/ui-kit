import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "../src/components/composed/chip";

const meta: Meta<typeof Chip> = {
  title: "Display/Chip",
  component: Chip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <Chip variant="primary">Primary</Chip>
      <Chip variant="secondary">Secondary</Chip>
      <Chip variant="primary" size="xs">
        XS Primary
      </Chip>
    </div>
  ),
};

export const WithSubDescription: Story = {
  render: () => <Chip subDescription="10개">카테고리</Chip>,
};
