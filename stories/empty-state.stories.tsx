import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "../src/components/composed/empty-state";

const meta: Meta<typeof EmptyState> = {
  title: "Feedback/EmptyState",
  component: EmptyState,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const TitleOnly: Story = {
  args: { title: "데이터가 없습니다" },
};

export const WithDescription: Story = {
  args: {
    title: "데이터가 없습니다",
    description: "새 항목을 추가하여 시작하세요",
  },
};

export const WithAction: Story = {
  args: {
    title: "데이터가 없습니다",
    description: "새 항목을 추가하여 시작하세요",
    primaryAction: { label: "새로 만들기" },
  },
};

export const TwoActions: Story = {
  args: {
    title: "데이터가 없습니다",
    primaryAction: { label: "확인" },
    tertiaryAction: { label: "취소" },
  },
};
