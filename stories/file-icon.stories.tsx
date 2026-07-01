import type { Meta, StoryObj } from "@storybook/react";
import { FileIcon } from "../src/components/composed/file-icon";

const meta: Meta<typeof FileIcon> = {
  title: "Foundations/Icon/FileIcon",
  component: FileIcon,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileIcon>;

export const AllTypes: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <FileIcon fileName="doc.pdf" />
      <FileIcon fileName="script.py" />
      <FileIcon fileName="data.json" />
      <FileIcon fileName="code.js" />
      <FileIcon fileName="audio.mp3" />
      <FileIcon fileName="font.ttf" />
      <FileIcon fileName="unknown.xyz" />
    </div>
  ),
};
