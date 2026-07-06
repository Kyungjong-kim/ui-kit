import type { Meta, StoryObj } from "@storybook/react";
import { CheckMark } from "../src/components/composed/check-mark";

const meta: Meta<typeof CheckMark> = {
  title: "Atoms/Display/CheckMark",
  component: CheckMark,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CheckMark>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <CheckMark label="동의합니다 (md)" size="md" />
      <CheckMark label="동의합니다 (sm)" size="sm" />
      <CheckMark label="굵은 텍스트" hasBold />
      <CheckMark label="비활성화" disabled />
    </div>
  ),
};
