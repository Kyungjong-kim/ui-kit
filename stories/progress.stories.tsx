import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "../src/components/primitives/progress";

const meta: Meta<typeof Progress> = {
  title: "Primitives/Progress",
  component: Progress,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: { value: 60 },
  render: (args) => (
    <div className="w-64">
      <Progress {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Progress value={50} size="sm" />
      <Progress value={50} size="md" />
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <div className="w-64">
      <Progress />
    </div>
  ),
};

export const AllValues: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-64">
      <Progress value={0} />
      <Progress value={25} />
      <Progress value={50} />
      <Progress value={75} />
      <Progress value={100} />
    </div>
  ),
};
