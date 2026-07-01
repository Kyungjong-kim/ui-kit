import type { Meta, StoryObj } from "@storybook/react";
import { ComparisonBar } from "../src/components/composed/comparison-bar";

const meta: Meta<typeof ComparisonBar> = {
  title: "Data Display/ComparisonBar",
  component: ComparisonBar,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ComparisonBar>;

export const SuccessFailure: Story = {
  render: () => (
    <div className="w-96">
      <ComparisonBar
        left={{ label: "성공", value: 862 }}
        right={{ label: "실패", value: 138 }}
        leftTone="green"
        rightTone="neutral"
        valueFormatter={(v) => `${v.toLocaleString()}건`}
      />
    </div>
  ),
};

export const AllocationVsUsage: Story = {
  render: () => (
    <div className="w-96">
      <ComparisonBar
        left={{ label: "사용", value: 6 }}
        right={{ label: "여유", value: 10 }}
        leftTone="brand"
        rightTone="blue"
        valueFormatter={(v) => `${v}GB`}
      />
    </div>
  ),
};
