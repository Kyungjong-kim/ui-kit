import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "../src/components/primitives/switch";

const meta: Meta<typeof Switch> = {
  title: "Form/Switch",
  component: Switch,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: { label: "알림 활성화" },
};

export const Checked: Story = {
  args: { label: "알림 활성화", defaultChecked: true },
};

export const Disabled: Story = {
  args: { label: "알림 활성화", disabled: true },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch size="sm" label="Small" />
      <Switch size="md" label="Medium" />
      <Switch size="lg" label="Large" />
    </div>
  ),
};
