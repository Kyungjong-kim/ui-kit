import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../src/components/primitives/checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Form/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { label: "이용약관에 동의합니다" },
};

export const Checked: Story = {
  args: { label: "이용약관에 동의합니다", defaultChecked: true },
};

export const Disabled: Story = {
  args: { label: "이용약관에 동의합니다", disabled: true },
};
