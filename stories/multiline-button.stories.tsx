import type { Meta, StoryObj } from "@storybook/react";
import { MultilineButton } from "../src/components/composed/multiline-button";

const meta: Meta<typeof MultilineButton> = {
  title: "Actions/MultilineButton",
  component: MultilineButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MultilineButton>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-48">
      <MultilineButton>짧은 텍스트</MultilineButton>
      <MultilineButton>첫 번째 줄 텍스트와 두 번째 줄 텍스트가 길어질 때</MultilineButton>
    </div>
  ),
};
