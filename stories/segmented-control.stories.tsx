import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "../src/components/composed/segmented-control";

const meta: Meta<typeof SegmentedControl> = {
  title: "Inputs/SegmentedControl",
  component: SegmentedControl,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Light: Story = {
  render: () => {
    const [value, setValue] = useState("list");
    return (
      <SegmentedControl value={value} onValueChange={setValue} aria-label="보기 전환">
        <SegmentedControlItem value="list">목록</SegmentedControlItem>
        <SegmentedControlItem value="grid">격자</SegmentedControlItem>
        <SegmentedControlItem value="board">보드</SegmentedControlItem>
      </SegmentedControl>
    );
  },
};

export const Primary: Story = {
  render: () => {
    const [value, setValue] = useState("day");
    return (
      <SegmentedControl
        variant="primary"
        value={value}
        onValueChange={setValue}
        aria-label="기간 선택"
      >
        <SegmentedControlItem value="day">일간</SegmentedControlItem>
        <SegmentedControlItem value="week">주간</SegmentedControlItem>
        <SegmentedControlItem value="month">월간</SegmentedControlItem>
      </SegmentedControl>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState("up");
    return (
      <SegmentedControl value={value} onValueChange={setValue} aria-label="정렬">
        <SegmentedControlItem value="up" icon="arrowUpThickFalse">
          오름차순
        </SegmentedControlItem>
        <SegmentedControlItem value="down" icon="arrowDownThickFalse">
          내림차순
        </SegmentedControlItem>
      </SegmentedControl>
    );
  },
};
