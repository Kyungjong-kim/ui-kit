import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../src/components/primitives/input";

const meta: Meta<typeof Input> = {
  title: "Molecules/Form/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { label: "이메일", placeholder: "email@example.com" },
};

export const WithError: Story = {
  args: {
    label: "이메일",
    placeholder: "email@example.com",
    error: true,
    helperText: "올바른 이메일을 입력해주세요.",
  },
};

export const Disabled: Story = {
  args: { label: "이메일", placeholder: "email@example.com", disabled: true },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
};
