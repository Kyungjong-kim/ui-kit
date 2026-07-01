import type { Meta, StoryObj } from "@storybook/react";
import { ResetButton } from "../src/components/composed/reset-button";

const meta: Meta<typeof ResetButton> = {
  title: "Actions/ResetButton",
  component: ResetButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ResetButton>;

export const Default: Story = {
  render: () => <ResetButton />,
};

export const CustomLabel: Story = {
  render: () => <ResetButton label="필터 초기화" />,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <ResetButton size="sm" />
      <ResetButton size="md" />
      <ResetButton size="lg" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <ResetButton variant="ghost" />
      <ResetButton variant="secondary" />
    </div>
  ),
};
