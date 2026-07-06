import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "../src/components/composed/page-header";

const meta: Meta<typeof PageHeader> = {
  title: "Molecules/Heading/PageHeader",
  component: PageHeader,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: { title: "페이지 제목" },
};

export const Loading: Story = {
  args: { title: "페이지 제목", isLoading: true },
};
