import type { Meta, StoryObj } from "@storybook/react";
import { ResourceUsage } from "../src/components/composed/resource-usage";

const meta: Meta<typeof ResourceUsage> = {
  title: "Data Display/ResourceUsage",
  component: ResourceUsage,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ResourceUsage>;

export const Thresholds: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <ResourceUsage label="CPU" current={2} max={8} unit="vCPU" />
      <ResourceUsage label="메모리" current={12} max={16} unit="GB" />
      <ResourceUsage label="디스크" current={95} max={100} unit="GB" />
    </div>
  ),
};

export const PercentOnly: Story = {
  render: () => (
    <div className="w-80">
      <ResourceUsage label="GPU 사용률" current={73} max={100} />
    </div>
  ),
};
