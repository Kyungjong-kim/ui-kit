import type { Meta, StoryObj } from "@storybook/react";
import { BarList } from "../src/components/composed/bar-list";

const meta: Meta<typeof BarList> = {
  title: "Data Display/BarList",
  component: BarList,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BarList>;

const items = [
  { label: "GPT-4", value: 1284 },
  { label: "Claude 3", value: 862 },
  { label: "Gemini", value: 431 },
  { label: "Llama 3", value: 208 },
];

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <BarList items={items} valueFormatter={(v) => `${v.toLocaleString()}건`} />
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-6">
      <BarList items={items} tone="brand" />
      <BarList items={items} tone="green" />
      <BarList items={items} tone="orange" />
    </div>
  ),
};
