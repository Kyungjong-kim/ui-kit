import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "../src/components/primitives/textarea";

const meta: Meta<typeof Textarea> = {
  title: "Form/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { label: "내용", placeholder: "내용을 입력해주세요." },
};

export const WithError: Story = {
  args: {
    label: "내용",
    error: true,
    helperText: "내용을 입력해주세요.",
    placeholder: "내용을 입력해주세요.",
  },
};

export const Disabled: Story = {
  args: { label: "내용", disabled: true, placeholder: "비활성화" },
};

export const NoResize: Story = {
  args: { label: "내용", resize: "none", placeholder: "크기 조절 불가" },
};
