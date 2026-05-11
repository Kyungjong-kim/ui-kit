import type { Meta, StoryObj } from "@storybook/react";
import { Thumbnail } from "../src/components/primitives/thumbnail";

const meta: Meta<typeof Thumbnail> = {
  title: "Primitives/Thumbnail",
  component: Thumbnail,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Thumbnail>;

export const WithImage: Story = {
  render: () => (
    <div className="flex gap-4">
      <Thumbnail src="https://picsum.photos/200" alt="샘플 이미지" ratio="1:1" className="w-24" />
      <Thumbnail
        src="https://picsum.photos/320/180"
        alt="샘플 이미지"
        ratio="16:9"
        className="w-40"
      />
    </div>
  ),
};

export const Fallback: Story = {
  render: () => (
    <div className="flex gap-4">
      <Thumbnail ratio="1:1" className="w-24" />
      <Thumbnail ratio="16:9" className="w-40" />
    </div>
  ),
};
