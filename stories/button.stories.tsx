import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src/components/primitives/button";

const meta: Meta<typeof Button> = {
  title: "Actions/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "destructive"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: "primary", children: "Button" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Button" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Button" },
};

export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { variant: "primary", children: "Disabled", disabled: true },
};

export const Loading: Story = {
  args: { variant: "primary", children: "저장 중", loading: true },
};

export const LoadingVariants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button variant="primary" loading>
        저장
      </Button>
      <Button variant="secondary" loading>
        저장
      </Button>
      <Button variant="ghost" loading>
        저장
      </Button>
      <Button variant="destructive" loading>
        삭제
      </Button>
    </div>
  ),
};
