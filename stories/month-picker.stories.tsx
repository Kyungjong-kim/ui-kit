import type { Meta, StoryObj } from "@storybook/react";
import { MonthPicker } from "../src/components/composed/month-picker";

const meta: Meta<typeof MonthPicker> = {
  title: "Inputs/MonthPicker",
  component: MonthPicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MonthPicker>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: { year: 2026, month: 4 } },
};

export const Disabled: Story = {
  args: { disabled: true },
};
