import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FavoriteButton } from "../src/components/composed/favorite-button";

const meta: Meta<typeof FavoriteButton> = {
  title: "Atoms/Buttons/FavoriteButton",
  component: FavoriteButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FavoriteButton>;

export const Uncontrolled: Story = {
  render: () => <FavoriteButton />,
};

export const DefaultPressed: Story = {
  render: () => <FavoriteButton defaultPressed />,
};

export const Controlled: Story = {
  render: () => {
    const [pressed, setPressed] = useState(false);
    return <FavoriteButton pressed={pressed} onPressedChange={setPressed} />;
  },
};

export const Shapes: Story = {
  render: () => (
    <div className="flex gap-3">
      <FavoriteButton shape="square" defaultPressed />
      <FavoriteButton shape="circle" defaultPressed />
    </div>
  ),
};
