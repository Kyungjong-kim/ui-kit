import type { Meta, StoryObj } from "@storybook/react";
import { Combobox } from "../src/components/primitives/combobox";

const meta: Meta<typeof Combobox> = {
  title: "Molecules/Select/Combobox",
  component: Combobox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const options = [
  { value: "apple", label: "사과" },
  { value: "banana", label: "바나나" },
  { value: "orange", label: "오렌지" },
  { value: "grape", label: "포도", disabled: true },
  { value: "melon", label: "멜론" },
  { value: "peach", label: "복숭아" },
];

export const Default: Story = {
  args: { options, label: "과일 선택", placeholder: "과일을 선택해주세요" },
};

export const WithSearch: Story = {
  args: {
    options,
    label: "과일 검색",
    placeholder: "과일을 선택해주세요",
    searchPlaceholder: "과일 이름 검색",
    emptyText: "일치하는 과일이 없습니다.",
  },
};

export const WithError: Story = {
  args: { options, label: "과일 선택", error: true, helperText: "필수 선택 항목입니다." },
};

export const Disabled: Story = {
  args: { options, label: "과일 선택", disabled: true },
};

export const Small: Story = {
  args: { options, label: "과일 선택", size: "sm" },
};

export const Large: Story = {
  args: { options, label: "과일 선택", size: "lg" },
};

const manyOptions = Array.from({ length: 40 }, (_, i) => ({
  value: `item-${i + 1}`,
  label: `항목 ${i + 1}`,
}));

/** 긴 목록 — 방향키로 활성 옵션을 옮기면 목록이 따라 스크롤한다 */
export const LongList: Story = {
  args: {
    options: manyOptions,
    label: "항목 선택",
    placeholder: "항목을 선택해주세요",
    searchPlaceholder: "항목 검색",
  },
};
