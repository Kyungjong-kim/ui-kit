import type { Meta, StoryObj } from "@storybook/react";
import { RadarChart } from "../src/components/composed/chart";

const meta: Meta = {
  title: "Data Display/Chart/RadarChart",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const skills = [
  { 항목: "속도", A팀: 80, B팀: 60 },
  { 항목: "정확도", A팀: 70, B팀: 90 },
  { 항목: "안정성", A팀: 85, B팀: 75 },
  { 항목: "확장성", A팀: 65, B팀: 80 },
  { 항목: "보안", A팀: 90, B팀: 70 },
];

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <RadarChart data={skills} angleKey="항목" series={[{ dataKey: "A팀" }]} />
    </div>
  ),
};

export const MultiSeries: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <RadarChart data={skills} angleKey="항목" series={[{ dataKey: "A팀" }, { dataKey: "B팀" }]} />
    </div>
  ),
};
