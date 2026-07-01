import type { Meta, StoryObj } from "@storybook/react";
import { Sparkline } from "../src/components/composed/chart";

const meta: Meta = {
  title: "Organisms/Charts/Sparkline",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const trend = [4, 8, 6, 10, 7, 12, 9, 14, 11, 16];

export const Line: Story = {
  render: () => (
    <div style={{ width: 160 }}>
      <Sparkline data={trend} />
    </div>
  ),
};

export const Area: Story = {
  render: () => (
    <div style={{ width: 160 }}>
      <Sparkline data={trend} variant="area" color="var(--color-green-500)" />
    </div>
  ),
};

export const InlineWithText: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ fontSize: 14 }}>주간 방문자</span>
      <div style={{ width: 120 }}>
        <Sparkline data={trend} height={28} />
      </div>
      <span style={{ fontSize: 14, fontWeight: 600 }}>+34%</span>
    </div>
  ),
};
