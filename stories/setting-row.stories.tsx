import type { Meta, StoryObj } from "@storybook/react";
import { SettingRow } from "../src/components/composed/setting-row";

const meta: Meta<typeof SettingRow> = {
  title: "Organisms/Misc/SettingRow",
  component: SettingRow,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SettingRow>;

export const Default: Story = {
  render: () => (
    <div className="flex w-96 flex-col gap-3">
      <SettingRow label="이름">홍길동</SettingRow>
      <SettingRow label="이메일">user@example.com</SettingRow>
      <SettingRow label="상태">활성</SettingRow>
    </div>
  ),
};

export const WithTooltipSlot: Story = {
  render: () => (
    <div className="w-96">
      <SettingRow
        label="만료일"
        tooltip={<span className="text-[var(--color-text-tertiary)]">(?)</span>}
      >
        2026-12-31
      </SettingRow>
    </div>
  ),
};
