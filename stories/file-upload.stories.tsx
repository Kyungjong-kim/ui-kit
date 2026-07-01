import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "../src/components/primitives/file-upload";

const meta: Meta<typeof FileUpload> = {
  title: "Molecules/Form/FileUpload",
  component: FileUpload,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: { onFilesChange: (files) => console.log(files) },
};

export const ImageOnly: Story = {
  args: {
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 3,
    onFilesChange: (files) => console.log(files),
  },
};
