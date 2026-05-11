import type { Meta, StoryObj } from "@storybook/react";
import { TextSkeleton } from "../src/components/composed/text-skeleton";

const meta: Meta<typeof TextSkeleton> = {
  title: "Composed/TextSkeleton",
  component: TextSkeleton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TextSkeleton>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-64">
      <TextSkeleton size="md" width={100} />
      <TextSkeleton size="md" width={75} />
      <TextSkeleton size="sm" width={50} />
    </div>
  ),
};
