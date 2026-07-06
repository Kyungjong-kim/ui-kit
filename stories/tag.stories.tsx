import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "../src/components/primitives/tag";

const meta: Meta<typeof Tag> = {
  title: "Atoms/Status/Tag",
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

export const Appearance: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="w-12 typography-label-xs text-[var(--color-text-secondary)]">Subtle</span>
        <Tag variant="default">Default</Tag>
        <Tag variant="info">Info</Tag>
        <Tag variant="success">Success</Tag>
        <Tag variant="warning">Warning</Tag>
        <Tag variant="danger">Danger</Tag>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-12 typography-label-xs text-[var(--color-text-secondary)]">Solid</span>
        <Tag variant="default" appearance="solid">
          Default
        </Tag>
        <Tag variant="info" appearance="solid">
          Info
        </Tag>
        <Tag variant="success" appearance="solid">
          Success
        </Tag>
        <Tag variant="warning" appearance="solid">
          Warning
        </Tag>
        <Tag variant="danger" appearance="solid">
          Danger
        </Tag>
      </div>
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
