import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { type CascadingLevel, CascadingSelect } from "../src/components/composed/cascading-select";

const levels: CascadingLevel[] = [
  {
    key: "category",
    label: "카테고리",
    placeholder: "카테고리 선택",
    options: () => [
      { value: "fruit", label: "과일" },
      { value: "veg", label: "채소" },
    ],
  },
  {
    key: "item",
    label: "품목",
    placeholder: "품목 선택",
    options: (sel) =>
      sel.category === "fruit"
        ? [
            { value: "apple", label: "사과" },
            { value: "banana", label: "바나나" },
          ]
        : sel.category === "veg"
          ? [
              { value: "carrot", label: "당근" },
              { value: "spinach", label: "시금치" },
            ]
          : [],
  },
];

const meta: Meta<typeof CascadingSelect> = {
  title: "Molecules/Select/CascadingSelect",
  component: CascadingSelect,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CascadingSelect>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<Record<string, string>>({});
    return (
      <div className="w-72">
        <CascadingSelect levels={levels} value={value} onChange={setValue} />
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => (
    <div className="w-72">
      <CascadingSelect levels={levels} defaultValue={{ category: "fruit" }} />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-72">
      <CascadingSelect levels={levels} disabled defaultValue={{ category: "fruit" }} />
    </div>
  ),
};
