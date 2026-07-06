import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FilterDropdown, type FilterOption } from "../src/components/composed/filter-dropdown";

const options: FilterOption[] = [
  { value: "draft", label: "초안" },
  { value: "review", label: "검토중" },
  { value: "done", label: "완료" },
  { value: "archived", label: "보관됨", disabled: true },
];

const meta: Meta<typeof FilterDropdown> = {
  title: "Molecules/Filter/FilterDropdown",
  component: FilterDropdown,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FilterDropdown>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return <FilterDropdown label="상태" options={options} value={value} onChange={setValue} />;
  },
};

export const WithSelection: Story = {
  render: () => <FilterDropdown label="상태" options={options} defaultValue={["draft", "done"]} />,
};

export const Disabled: Story = {
  render: () => <FilterDropdown label="상태" options={options} disabled />,
};
