import type { Meta, StoryObj } from "@storybook/react";
import { DotBadge } from "../src/components/composed/dot-badge";

const meta: Meta<typeof DotBadge> = {
  title: "Data Display/DotBadge",
  component: DotBadge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DotBadge>;

export const AllTones: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <DotBadge tone="success" label="온라인" />
      <DotBadge tone="warning" label="점검 중" />
      <DotBadge tone="danger" label="오프라인" />
      <DotBadge tone="neutral" label="대기" />
      <DotBadge tone="info" label="배포됨" />
    </div>
  ),
};

export const DotOnly: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <DotBadge tone="success" />
      <DotBadge tone="warning" />
      <DotBadge tone="danger" />
      <DotBadge tone="neutral" />
      <DotBadge tone="info" />
    </div>
  ),
};
