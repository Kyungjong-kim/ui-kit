import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../src/components/primitives/badge";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Status/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const Appearance: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="w-12 typography-label-xs text-[var(--color-text-secondary)]">Subtle</span>
        <Badge variant="default">Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="info">Info</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-12 typography-label-xs text-[var(--color-text-secondary)]">Solid</span>
        <Badge variant="default" appearance="solid">
          Default
        </Badge>
        <Badge variant="success" appearance="solid">
          Success
        </Badge>
        <Badge variant="warning" appearance="solid">
          Warning
        </Badge>
        <Badge variant="danger" appearance="solid">
          Danger
        </Badge>
        <Badge variant="info" appearance="solid">
          Info
        </Badge>
      </div>
    </div>
  ),
};
