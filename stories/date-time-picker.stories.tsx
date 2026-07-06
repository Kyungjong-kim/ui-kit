import type { Meta, StoryObj } from "@storybook/react";
import { DateTimePicker } from "../src/components/composed/date-time-picker";

const meta: Meta<typeof DateTimePicker> = {
  title: "Molecules/Date/DateTimePicker",
  component: DateTimePicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: new Date(2026, 4, 11, 14, 30) },
};

export const Disabled: Story = {
  args: { disabled: true },
};
