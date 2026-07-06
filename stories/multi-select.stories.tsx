import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { MultiSelect, type MultiSelectOption } from "../src/components/composed/multi-select";

const options: MultiSelectOption[] = [
  { value: "react", label: "React", count: 128 },
  { value: "vue", label: "Vue", count: 64 },
  { value: "svelte", label: "Svelte", description: "Compiler-first framework", count: 32 },
  { value: "angular", label: "Angular", count: 48 },
  { value: "solid", label: "Solid", disabled: true },
];

const meta: Meta<typeof MultiSelect> = {
  title: "Molecules/Select/MultiSelect",
  component: MultiSelect,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(["react"]);
    return (
      <div className="w-80">
        <MultiSelect
          label="Frameworks"
          helperText="Select one or more frameworks."
          options={options}
          value={value}
          onValueChange={setValue}
          countUnit="repos"
        />
      </div>
    );
  },
};

export const WithSelectAll: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="w-80">
        <MultiSelect
          label="Frameworks"
          options={options}
          value={value}
          onValueChange={setValue}
          showSelectAll
          selectAllMeta={`${options.filter((o) => !o.disabled).length} available`}
        />
      </div>
    );
  },
};

export const ErrorState: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div className="w-80">
        <MultiSelect
          label="Frameworks"
          state="error"
          helperText="At least one selection is required."
          options={options}
          value={value}
          onValueChange={setValue}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <MultiSelect
        label="Frameworks"
        disabled
        options={options}
        value={["react", "vue"]}
        onValueChange={() => {}}
      />
    </div>
  ),
};
