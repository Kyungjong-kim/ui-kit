import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RefreshButton } from "../src/components/composed/refresh-button";

const meta: Meta<typeof RefreshButton> = {
  title: "Atoms/Buttons/RefreshButton",
  component: RefreshButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RefreshButton>;

export const Default: Story = {
  render: () => <RefreshButton />,
};

export const Loading: Story = {
  render: () => <RefreshButton loading />,
};

export const Interactive: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);
    const handleClick = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 1500);
    };
    return <RefreshButton loading={loading} onClick={handleClick} />;
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-3">
      <RefreshButton variant="secondary" />
      <RefreshButton variant="ghost" />
      <RefreshButton variant="primary" />
    </div>
  ),
};
