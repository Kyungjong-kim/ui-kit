import type { Meta, StoryObj } from "@storybook/react";
import { UserCell } from "../src/components/composed/user-cell";

const meta: Meta<typeof UserCell> = {
  title: "Organisms/Cells/UserCell",
  component: UserCell,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserCell>;

export const Default: Story = {
  args: { name: "홍길동" },
};

export const WithDescription: Story = {
  args: { name: "홍길동", description: "admin@genon.ai" },
};

export const WithImage: Story = {
  args: {
    name: "홍길동",
    description: "관리자",
    avatarSrc: "https://i.pravatar.cc/80?img=12",
  },
};

export const LargeSize: Story = {
  args: { name: "홍길동", description: "admin@genon.ai", size: "md" },
};
