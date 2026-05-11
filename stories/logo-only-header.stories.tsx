import type { Meta, StoryObj } from "@storybook/react";
import { LogoOnlyHeader } from "../src/components/composed/logo-only-header";

const meta: Meta<typeof LogoOnlyHeader> = {
  title: "Composed/LogoOnlyHeader",
  component: LogoOnlyHeader,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LogoOnlyHeader>;

export const Default: Story = {};

export const WithClick: Story = {
  args: { onClick: () => alert("로고 클릭") },
};
