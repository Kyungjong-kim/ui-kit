import type { Meta, StoryObj } from "@storybook/react";
import { ClusterResourceBar } from "../src/components/composed/cluster-resource-bar";

const meta: Meta<typeof ClusterResourceBar> = {
  title: "Organisms/Metric/ClusterResourceBar",
  component: ClusterResourceBar,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ClusterResourceBar>;

export const Default: Story = {
  render: () => (
    <div className="w-[28rem]">
      <ClusterResourceBar
        segments={[
          { label: "node-01", value: 42, tone: "brand" },
          { label: "node-02", value: 28, tone: "blue" },
          { label: "node-03", value: 18, tone: "green" },
          { label: "여유", value: 12, tone: "neutral" },
        ]}
        valueFormatter={(v) => `${v} vCPU`}
      />
    </div>
  ),
};

export const BarOnly: Story = {
  render: () => (
    <div className="w-[28rem]">
      <ClusterResourceBar
        showLegend={false}
        segments={[
          { label: "요청", value: 60, tone: "orange" },
          { label: "제한", value: 25, tone: "red" },
          { label: "여유", value: 15, tone: "neutral" },
        ]}
      />
    </div>
  ),
};
