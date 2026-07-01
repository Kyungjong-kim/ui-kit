import type { Meta, StoryObj } from "@storybook/react";
import { DateRangePicker } from "../src/components/composed/date-range-picker";

const meta: Meta<typeof DateRangePicker> = {
  title: "Molecules/Date/DateRangePicker",
  component: DateRangePicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: { from: new Date(2026, 4, 1), to: new Date(2026, 4, 11) } },
};

export const Disabled: Story = {
  args: { disabled: true },
};
