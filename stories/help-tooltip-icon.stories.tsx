import type { Meta, StoryObj } from "@storybook/react";
import { HelpTooltipIcon } from "../src/components/composed/help-tooltip-icon";

const meta: Meta<typeof HelpTooltipIcon> = {
  title: "Atoms/Display/HelpTooltipIcon",
  component: HelpTooltipIcon,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HelpTooltipIcon>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span className="typography-label-md-medium text-[var(--color-text-primary)]">API 키</span>
      <HelpTooltipIcon content="외부 서비스 연동에 사용되는 인증 키입니다." />
    </div>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex gap-8">
      <HelpTooltipIcon content="위쪽 툴팁" side="top" />
      <HelpTooltipIcon content="오른쪽 툴팁" side="right" />
      <HelpTooltipIcon content="아래쪽 툴팁" side="bottom" />
      <HelpTooltipIcon content="왼쪽 툴팁" side="left" />
    </div>
  ),
};
