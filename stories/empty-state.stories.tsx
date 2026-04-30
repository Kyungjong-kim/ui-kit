import type { Meta, StoryObj } from "@storybook/react";
import { AlertCircleIcon, InboxIcon, SearchIcon } from "lucide-react";
import { EmptyState } from "../src/components/primitives/empty-state";

const meta: Meta<typeof EmptyState> = {
  title: "Primitives/EmptyState",
  component: EmptyState,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const NoData: Story = {
  args: {
    icon: <InboxIcon className="h-8 w-8" />,
    title: "데이터가 없습니다",
    description: "아직 추가된 항목이 없습니다. 새 항목을 추가해보세요.",
    actionText: "항목 추가",
    onAction: () => {},
  },
};

export const ErrorState: Story = {
  args: {
    icon: <AlertCircleIcon className="h-8 w-8 text-[var(--color-text-danger-default)]" />,
    title: "오류가 발생했습니다",
    description: "요청을 처리하는 중 문제가 발생했습니다.",
    actionText: "다시 시도",
    onAction: () => {},
  },
};

export const NotFound: Story = {
  args: {
    icon: <SearchIcon className="h-8 w-8" />,
    title: "검색 결과가 없습니다",
    description: "다른 검색어로 시도해보세요.",
  },
};
