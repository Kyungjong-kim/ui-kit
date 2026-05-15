import type { Meta, StoryObj } from "@storybook/react";
import { SelectIconButton } from "../src/components/composed/select-icon-button";

const meta: Meta<typeof SelectIconButton> = {
  title: "Action/SelectIconButton",
  component: SelectIconButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SelectIconButton>;

export const Default: Story = {
  render: () => (
    <div className="flex gap-3">
      <SelectIconButton icon="code" aria-label="코드" />
      <SelectIconButton icon="file" aria-label="파일" defaultSelected />
      <SelectIconButton icon="formatData" aria-label="데이터" shape="circle" />
    </div>
  ),
};
