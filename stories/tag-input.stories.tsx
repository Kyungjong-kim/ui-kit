import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TagInput } from "../src/components/composed/tag-input";

const meta: Meta<typeof TagInput> = {
  title: "Inputs/TagInput",
  component: TagInput,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TagInput>;

export const Default: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(["react", "typescript"]);
    return (
      <div className="w-[480px]">
        <TagInput
          label="Tags"
          labelPosition="top"
          value={tags}
          onChange={setTags}
          helperText="Press Enter or + to add a tag."
        />
      </div>
    );
  },
};

export const InlineLabel: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>([]);
    return (
      <div className="w-[480px]">
        <TagInput label="Keywords" value={tags} onChange={setTags} />
      </div>
    );
  },
};

export const WithConstraints: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>([]);
    return (
      <div className="w-[480px]">
        <TagInput
          label="Slugs"
          labelPosition="top"
          value={tags}
          onChange={setTags}
          maxTags={3}
          maxLength={12}
          pattern={/^[\w-]*$/}
          disabledPlaceholder="Maximum tags reached."
          helperText="Up to 3 tags, letters/digits/hyphens only."
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[480px]">
      <TagInput
        label="Tags"
        labelPosition="top"
        disabled
        value={["locked", "readonly"]}
        onChange={() => {}}
      />
    </div>
  ),
};
