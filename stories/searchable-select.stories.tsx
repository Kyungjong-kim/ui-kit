import type { Meta, StoryObj } from "@storybook/react";
import { SearchableSelect } from "../src/components/composed/searchable-select";

const meta: Meta<typeof SearchableSelect> = {
  title: "Molecules/Select/SearchableSelect",
  component: SearchableSelect,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SearchableSelect>;

const options = [
  { value: "seoul", label: "서울", group: "수도권" },
  { value: "incheon", label: "인천", group: "수도권" },
  { value: "gyeonggi", label: "경기", group: "수도권" },
  { value: "busan", label: "부산", group: "영남" },
  { value: "daegu", label: "대구", group: "영남" },
  { value: "ulsan", label: "울산", group: "영남", disabled: true },
  { value: "gwangju", label: "광주", group: "호남" },
  { value: "jeonju", label: "전주", group: "호남" },
];

export const Default: Story = {
  args: { options, label: "지역 선택", placeholder: "지역을 선택해주세요" },
};

export const WithSearch: Story = {
  args: {
    options,
    label: "지역 검색",
    placeholder: "지역을 선택해주세요",
    searchPlaceholder: "지역 이름 검색",
    emptyText: "일치하는 지역이 없습니다.",
  },
};

export const WithError: Story = {
  args: { options, label: "지역 선택", error: true, helperText: "필수 선택 항목입니다." },
};

export const Disabled: Story = {
  args: { options, label: "지역 선택", disabled: true },
};

export const Small: Story = {
  args: { options, label: "지역 선택", size: "sm" },
};

export const Large: Story = {
  args: { options, label: "지역 선택", size: "lg" },
};
