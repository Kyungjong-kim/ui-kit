import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src/components/primitives/button";
import { Popover, PopoverContent, PopoverTrigger } from "../src/components/primitives/popover";

const meta: Meta<typeof Popover> = {
  title: "Overlay/Popover",
  component: Popover,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="md" appearance="outline">
          열기
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="typography-body-md-base text-text-primary">팝오버 콘텐츠입니다.</p>
      </PopoverContent>
    </Popover>
  ),
};
