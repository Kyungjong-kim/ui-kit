import type { Meta, StoryObj } from "@storybook/react";
import { StatCard } from "../src/components/composed/stat-card";

const meta: Meta<typeof StatCard> = {
  title: "Organisms/Metric/StatCard",
  component: StatCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Tones: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <StatCard
        label="처리 요청"
        tone="success"
        statusLabel="정상"
        value={1284}
        unit="건"
        delta={{ direction: "up", text: "+128" }}
      />
      <StatCard
        label="응답 지연"
        tone="warning"
        statusLabel="주의"
        value="320"
        unit="ms"
        delta={{ direction: "up", text: "+40" }}
      />
      <StatCard
        label="오류율"
        tone="danger"
        statusLabel="오류"
        value="4.2"
        unit="%"
        delta={{ direction: "down", text: "-0.3" }}
      />
      <StatCard
        label="대기 작업"
        tone="neutral"
        statusLabel="변동 없음"
        value={0}
        delta={{ direction: "none", text: "0" }}
      />
    </div>
  ),
};

export const WithProgress: Story = {
  render: () => (
    <div className="w-72">
      <StatCard
        label="저장 공간 사용률"
        tone="warning"
        statusLabel="주의"
        value="78"
        unit="%"
        progress={78}
      />
    </div>
  ),
};
