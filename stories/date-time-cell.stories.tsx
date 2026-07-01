import type { Meta, StoryObj } from "@storybook/react";
import { DateTimeCell } from "../src/components/composed/date-time-cell";

const meta: Meta<typeof DateTimeCell> = {
  title: "Data Display/DateTimeCell",
  component: DateTimeCell,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DateTimeCell>;

const NOW = new Date("2026-01-15T12:00:00");

export const Default: Story = {
  args: { value: "2026-01-15T09:30:00" },
};

export const WithTime: Story = {
  args: { value: "2026-01-15T09:30:00", showTime: true },
};

export const Relative: Story = {
  args: { value: "2026-01-15T11:57:00", relative: true, now: NOW },
};

export const RelativeDaysAgo: Story = {
  args: { value: "2026-01-10T12:00:00", relative: true, now: NOW },
};

export const Invalid: Story = {
  args: { value: "not-a-date" },
};
