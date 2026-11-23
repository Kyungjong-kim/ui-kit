import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Calendar } from "../src/components/primitives/calendar";

const meta: Meta<typeof Calendar> = {
  title: "Molecules/Date/Calendar",
  component: Calendar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="border border-border-default rounded-md overflow-hidden">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </div>
    );
  },
};

export const WithDisabledDates: Story = {
  render: () => {
    const today = new Date();
    const [date, setDate] = useState<Date | undefined>();
    return (
      <div className="border border-border-default rounded-md overflow-hidden">
        <Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < today} />
      </div>
    );
  },
};

/** `captionLayout="dropdown"` — 연·월을 드롭다운으로 바로 고른다. 범위는 `startMonth`·`endMonth` */
export const DropdownCaption: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="border border-border-default rounded-md overflow-hidden">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          captionLayout="dropdown"
          startMonth={new Date(2020, 0)}
          endMonth={new Date(2030, 11)}
        />
      </div>
    );
  },
};
