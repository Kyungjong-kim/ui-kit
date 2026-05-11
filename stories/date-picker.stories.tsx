import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "../src/components/composed/date-picker";

const meta: Meta<typeof DatePicker> = {
  title: "Composed/DatePicker",
  component: DatePicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: new Date(2026, 4, 11) },
};

export const Disabled: Story = {
  args: { disabled: true },
};
