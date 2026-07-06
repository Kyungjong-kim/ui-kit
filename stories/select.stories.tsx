import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "../src/components/primitives/select";

const meta: Meta<typeof Select> = {
  title: "Molecules/Select/Select",
  component: Select,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: "apple", label: "사과" },
  { value: "banana", label: "바나나" },
  { value: "orange", label: "오렌지" },
  { value: "grape", label: "포도", disabled: true },
];

export const Default: Story = {
  args: { options, label: "과일 선택", placeholder: "과일을 선택해주세요" },
};

export const WithError: Story = {
  args: { options, label: "과일 선택", error: true, helperText: "필수 선택 항목입니다." },
};

export const Disabled: Story = {
  args: { options, label: "과일 선택", disabled: true },
};
