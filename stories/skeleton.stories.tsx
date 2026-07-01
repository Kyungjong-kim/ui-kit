import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "../src/components/primitives/skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Atoms/Loading/Skeleton",
  component: Skeleton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-64 space-y-3">
      <Skeleton className="h-40 w-full" rounded="lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex items-center gap-2 pt-1">
        <Skeleton className="h-8 w-8" rounded="full" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  ),
};

export const TextSkeleton: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  ),
};
