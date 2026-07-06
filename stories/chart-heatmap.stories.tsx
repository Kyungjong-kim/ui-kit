import type { Meta, StoryObj } from "@storybook/react";
import { Heatmap } from "../src/components/composed/chart";

const meta: Meta = {
  title: "Organisms/Charts/Heatmap",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const matrix = [
  [12, 30, 45, 20, 8],
  [22, 40, 60, 35, 15],
  [5, 18, 28, 50, 42],
  [33, 25, 10, 48, 60],
];

const xLabels = ["월", "화", "수", "목", "금"];
const yLabels = ["1주", "2주", "3주", "4주"];

export const Default: Story = {
  render: () => <Heatmap data={matrix} xLabels={xLabels} yLabels={yLabels} />,
};

export const WithValues: Story = {
  render: () => <Heatmap data={matrix} xLabels={xLabels} yLabels={yLabels} showValues />,
};

export const CustomColor: Story = {
  render: () => (
    <Heatmap data={matrix} xLabels={xLabels} yLabels={yLabels} color="var(--color-green-500)" />
  ),
};
