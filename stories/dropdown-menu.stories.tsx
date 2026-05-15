import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src/components/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../src/components/primitives/dropdown-menu";

const meta: Meta = {
  title: "Overlay/DropdownMenu",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">메뉴 열기 ▾</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>계정</DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 h-px bg-[var(--color-border-default)]" />
        <DropdownMenuItem>프로필</DropdownMenuItem>
        <DropdownMenuItem>설정</DropdownMenuItem>
        <DropdownMenuSeparator className="my-1 h-px bg-[var(--color-border-default)]" />
        <DropdownMenuItem className="text-[var(--color-text-danger-default)]">
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
