import type { Meta, StoryObj } from "@storybook/react";
import { TruncateText } from "../src/components/composed/truncate-text";

const meta: Meta<typeof TruncateText> = {
  title: "Organisms/Misc/TruncateText",
  component: TruncateText,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TruncateText>;

export const Truncated: Story = {
  render: () => (
    <div className="w-40 border border-[var(--color-border-default)] p-2">
      <TruncateText>
        매우 길어서 컨테이너 너비를 넘어가는 텍스트입니다. 잘릴 때만 툴팁이 표시됩니다.
      </TruncateText>
    </div>
  ),
};

export const Fits: Story = {
  render: () => (
    <div className="w-80 border border-[var(--color-border-default)] p-2">
      <TruncateText>짧은 텍스트</TruncateText>
    </div>
  ),
};

export const WithExplicitTitle: Story = {
  render: () => (
    <div className="w-40 border border-[var(--color-border-default)] p-2">
      <TruncateText title="툴팁에 표시될 전체 내용입니다.">표시 텍스트가 잘립니다</TruncateText>
    </div>
  ),
};
