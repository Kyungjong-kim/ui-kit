import type { Meta, StoryObj } from "@storybook/react";
import { AreaChart } from "../src/components/composed/chart";

const meta: Meta = {
  title: "Organisms/Charts/AreaChart",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const monthly = [
  { month: "1월", 매출: 100, 비용: 60 },
  { month: "2월", 매출: 140, 비용: 80 },
  { month: "3월", 매출: 120, 비용: 70 },
  { month: "4월", 매출: 180, 비용: 90 },
  { month: "5월", 매출: 160, 비용: 85 },
];

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <AreaChart data={monthly} xKey="month" series={[{ dataKey: "매출" }, { dataKey: "비용" }]} />
    </div>
  ),
};

export const Stacked: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <AreaChart
        data={monthly}
        xKey="month"
        series={[{ dataKey: "매출" }, { dataKey: "비용" }]}
        stacked
      />
    </div>
  ),
};
