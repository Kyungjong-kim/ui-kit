import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  PeriodFilterDropdown,
  type PeriodValue,
} from "../src/components/composed/period-filter-dropdown";

const meta: Meta<typeof PeriodFilterDropdown> = {
  title: "Molecules/Date/PeriodFilterDropdown",
  component: PeriodFilterDropdown,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PeriodFilterDropdown>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<PeriodValue>({ preset: "today" });
    return <PeriodFilterDropdown value={value} onChange={setValue} />;
  },
};

export const CustomRange: Story = {
  render: () => {
    const [value, setValue] = useState<PeriodValue>({
      preset: "custom",
      start: new Date(2026, 0, 1),
      end: new Date(2026, 0, 31),
    });
    return <PeriodFilterDropdown value={value} onChange={setValue} />;
  },
};

export const Disabled: Story = {
  render: () => <PeriodFilterDropdown disabled defaultValue={{ preset: "last7" }} />,
};
