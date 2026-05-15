import type { Meta, StoryObj } from "@storybook/react";
import { ImageCell } from "../src/components/composed/image-cell";

const meta: Meta<typeof ImageCell> = {
  title: "Display/ImageCell",
  component: ImageCell,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ImageCell>;

const image = { id: "1", src: "https://picsum.photos/200", alt: "샘플" };

export const Default: Story = {
  args: { image, size: "sm", isLoading: false },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-start">
      <ImageCell image={image} size="sm" isLoading={false} />
      <ImageCell image={image} size="lg" isLoading={false} />
      <ImageCell image={image} size="xlg" isLoading={false} />
    </div>
  ),
};
