import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src/components/primitives/button";
import { Tooltip } from "../src/components/primitives/tooltip";

const meta: Meta = {
  title: "Primitives/Tooltip",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-16">
      {(["top", "bottom", "left", "right"] as const).map((side) => (
        <Tooltip key={side} content={`${side} tooltip`} side={side}>
          <Button variant="secondary">{side}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};
