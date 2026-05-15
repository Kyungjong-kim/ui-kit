import type { Meta, StoryObj } from "@storybook/react";
import { DocumentCell } from "../src/components/composed/document-cell";

const meta: Meta<typeof DocumentCell> = {
  title: "Display/DocumentCell",
  component: DocumentCell,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DocumentCell>;

export const Default: Story = {
  args: { file: { id: "1", name: "report.pdf" } },
};

export const Loading: Story = {
  args: { file: { id: "1", name: "report.pdf" }, isLoading: true },
};

export const WithRemove: Story = {
  args: {
    file: { id: "1", name: "report.pdf" },
    onRemove: (id: string) => alert(`삭제: ${id}`),
  },
};
