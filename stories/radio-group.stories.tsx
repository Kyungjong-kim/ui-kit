import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "../src/components/primitives/radio-group";

const meta: Meta<typeof RadioGroup> = {
  title: "Inputs/RadioGroup",
  component: RadioGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Vertical: Story = {
  render: () => (
    <RadioGroup defaultValue="b" orientation="vertical">
      <RadioGroupItem value="a" label="옵션 A" />
      <RadioGroupItem value="b" label="옵션 B" />
      <RadioGroupItem value="c" label="옵션 C" />
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="a" orientation="horizontal">
      <RadioGroupItem value="a" label="첫 번째" />
      <RadioGroupItem value="b" label="두 번째" />
      <RadioGroupItem value="c" label="세 번째" />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="a" disabled>
      <RadioGroupItem value="a" label="활성" />
      <RadioGroupItem value="b" label="비활성" />
    </RadioGroup>
  ),
};
