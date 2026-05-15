import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "../src/components/primitives/tag";

const meta: Meta<typeof Tag> = {
  title: "Display/Tag",
  component: Tag,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="default">Default</Tag>
      <Tag variant="info">Info</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="danger">Danger</Tag>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 items-center">
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
    </div>
  ),
};

export const Removable: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag onRemove={() => {}}>React</Tag>
      <Tag variant="info" onRemove={() => {}}>
        TypeScript
      </Tag>
      <Tag variant="success" onRemove={() => {}}>
        완료
      </Tag>
    </div>
  ),
};
