import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SliderField } from "../src/components/composed/slider-field";

const meta: Meta<typeof SliderField> = {
  title: "Molecules/Progress/SliderField",
  component: SliderField,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SliderField>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<number>(40);
    return (
      <div className="w-80">
        <SliderField
          label="볼륨"
          value={value}
          onChange={(v) => setValue(v[0])}
          helperText="0에서 100 사이로 조절하세요."
        />
      </div>
    );
  },
};

export const Percentage: Story = {
  render: () => (
    <div className="w-80">
      <SliderField label="진행률" defaultValue={65} formatValue={(v) => `${v}%`} showBounds />
    </div>
  ),
};

export const Range: Story = {
  render: () => {
    const [value, setValue] = useState<number[]>([20, 80]);
    return (
      <div className="w-80">
        <SliderField label="가격 범위" value={value} onChange={setValue} showBounds />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <SliderField label="볼륨" defaultValue={50} disabled />
    </div>
  ),
};
