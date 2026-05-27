import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "../src/components/primitives/slider";

const meta: Meta<typeof Slider> = {
  title: "Form/Slider",
  component: Slider,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: { label: "볼륨", defaultValue: 50, showValue: true },
};

export const Range: Story = {
  args: { label: "가격 범위", defaultValue: [20, 80], showValue: true },
};

export const WithStep: Story = {
  args: {
    label: "단계",
    defaultValue: 40,
    step: 10,
    showValue: true,
    helperText: "10 단위로 이동",
  },
};

export const Small: Story = {
  args: { label: "볼륨", defaultValue: 50, size: "sm", showValue: true },
};

export const Disabled: Story = {
  args: { label: "볼륨", defaultValue: 50, disabled: true },
};
