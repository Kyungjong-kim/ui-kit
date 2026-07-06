import type { Meta, StoryObj } from "@storybook/react";
import { PieChart } from "../src/components/composed/chart";

const meta: Meta = {
  title: "Organisms/Charts/PieChart",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const status = [
  { name: "정상", value: 62 },
  { name: "주의", value: 24 },
  { name: "오류", value: 14 },
];

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <PieChart data={status} />
    </div>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <PieChart data={status} showLabel />
    </div>
  ),
};
