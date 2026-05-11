import type { Meta, StoryObj } from "@storybook/react";
import { SelectButton } from "../src/components/composed/select-button";

const meta: Meta<typeof SelectButton> = {
  title: "Composed/SelectButton",
  component: SelectButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SelectButton>;

export const Default: Story = {
  render: () => (
    <div className="flex gap-3">
      <SelectButton>outline</SelectButton>
      <SelectButton appearance="ghost">ghost</SelectButton>
      <SelectButton defaultSelected>기본 선택</SelectButton>
    </div>
  ),
};
