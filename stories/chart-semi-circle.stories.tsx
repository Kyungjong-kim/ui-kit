import type { Meta, StoryObj } from "@storybook/react";
import { SemiCircleChart } from "../src/components/composed/chart";

const meta: Meta = {
  title: "Organisms/Charts/SemiCircleChart",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <SemiCircleChart value={68} />
    </div>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <SemiCircleChart value={40} max={80} color="var(--color-orange-500)" />
    </div>
  ),
};
