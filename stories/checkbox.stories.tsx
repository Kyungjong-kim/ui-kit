import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../src/components/primitives/checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Form Controls/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { label: "이용약관에 동의합니다" },
};

export const Checked: Story = {
  args: { label: "이용약관에 동의합니다", defaultChecked: true },
};

export const Disabled: Story = {
  args: { label: "이용약관에 동의합니다", disabled: true },
};

/** 일부만 선택된 그룹의 상위 체크박스 — 가로줄 아이콘, `aria-checked="mixed"` */
export const Indeterminate: Story = {
  args: { label: "전체 선택 (3개 중 1개)", checked: "indeterminate" },
};
