import type { Meta, StoryObj } from "@storybook/react";
import { SummaryGrid } from "../src/components/composed/summary-grid";

const meta: Meta<typeof SummaryGrid> = {
  title: "Data Display/SummaryGrid",
  component: SummaryGrid,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SummaryGrid>;

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="typography-label-sm-base text-[var(--color-text-tertiary)]">{label}</span>
      <span className="typography-body-md-medium text-[var(--color-text-primary)]">{value}</span>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <SummaryGrid columns={4}>
      <Cell label="전체" value="1,204" />
      <Cell label="활성" value="982" />
      <Cell label="대기" value="180" />
      <Cell label="오류" value="42" />
    </SummaryGrid>
  ),
};

export const ThreeColumns: Story = {
  render: () => (
    <SummaryGrid columns={3}>
      <Cell label="이름" value="홍길동" />
      <Cell label="역할" value="관리자" />
      <Cell label="가입일" value="2026-01-12" />
    </SummaryGrid>
  ),
};

export const Loading: Story = {
  render: () => <SummaryGrid columns={4} loading />,
};
