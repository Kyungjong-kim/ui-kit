import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "../src/components/primitives/avatar";

const meta: Meta<typeof Avatar> = {
  title: "Data Display/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Avatar key={size} size={size} fallback="KJ" />
      ))}
    </div>
  ),
};

export const WithImage: Story = {
  args: {
    src: "https://github.com/Kyungjong-kim.png",
    alt: "Kyungjong Kim",
    size: "lg",
  },
};

export const Shapes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar fallback="KJ" size="lg" shape="circle" />
      <Avatar fallback="KJ" size="lg" shape="square" />
    </div>
  ),
};
