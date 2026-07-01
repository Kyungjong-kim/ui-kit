import type { Meta, StoryObj } from "@storybook/react";
import { MetricCard } from "../src/components/composed/metric-card";

const meta: Meta<typeof MetricCard> = {
  title: "Data Display/MetricCard",
  component: MetricCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

export const Default: Story = {
  args: {
    label: "활성 사용자",
    value: "1,204",
    unit: "명",
  },
};

export const WithTrends: Story = {
  render: () => (
    <div className="grid max-w-xl grid-cols-2 gap-3">
      <MetricCard label="매출" value="₩3.2M" trend={{ direction: "up", value: "12%" }} />
      <MetricCard
        label="이탈률"
        value="4.5"
        unit="%"
        trend={{ direction: "down", value: "0.8%" }}
      />
      <MetricCard
        label="응답 시간"
        value="240"
        unit="ms"
        trend={{ direction: "neutral", value: "0%" }}
      />
      <MetricCard label="가입" value="87" unit="명" trend={{ direction: "up", value: "5" }} />
    </div>
  ),
};

export const Compact: Story = {
  args: {
    label: "대기 중 작업",
    value: "12",
  },
};
