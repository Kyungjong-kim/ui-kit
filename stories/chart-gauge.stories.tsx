import type { Meta, StoryObj } from "@storybook/react";
import { GaugeChart } from "../src/components/composed/chart";

const meta: Meta = {
  title: "Organisms/Charts/GaugeChart",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 240 }}>
      <GaugeChart value={72} />
    </div>
  ),
};

export const CustomMax: Story = {
  render: () => (
    <div style={{ maxWidth: 240 }}>
      <GaugeChart value={35} max={50} color="var(--color-green-500)" />
    </div>
  ),
};
