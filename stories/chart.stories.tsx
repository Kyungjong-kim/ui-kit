import type { Meta, StoryObj } from "@storybook/react";
import { BarChart, DonutChart, LineChart } from "../src/components/composed/chart";

const meta: Meta = {
  title: "Data Display/Chart",
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

const byRegion = [
  { region: "서울", 방문: 320, 가입: 120 },
  { region: "부산", 방문: 210, 가입: 80 },
  { region: "대구", 방문: 150, 가입: 55 },
];

const status = [
  { name: "정상", value: 62 },
  { name: "주의", value: 24 },
  { name: "오류", value: 14 },
];

export const Line: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <LineChart data={monthly} xKey="month" series={[{ dataKey: "매출" }, { dataKey: "비용" }]} />
    </div>
  ),
};

export const Bar: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <BarChart data={byRegion} xKey="region" series={[{ dataKey: "방문" }, { dataKey: "가입" }]} />
    </div>
  ),
};

export const BarStacked: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <BarChart
        data={byRegion}
        xKey="region"
        series={[{ dataKey: "방문" }, { dataKey: "가입" }]}
        stacked
      />
    </div>
  ),
};

export const Donut: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <DonutChart data={status} />
    </div>
  ),
};

export const Pie: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <DonutChart data={status} innerRadius={0} />
    </div>
  ),
};
