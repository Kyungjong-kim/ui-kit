import type { Meta, StoryObj } from "@storybook/react";
import { GuideBlock } from "../src/components/composed/guide-block";

const meta: Meta<typeof GuideBlock> = {
  title: "Molecules/Feedback/GuideBlock",
  component: GuideBlock,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GuideBlock>;

export const Info: Story = {
  args: {
    tone: "info",
    title: "설정을 저장하려면 확인 버튼을 누르세요",
    description: "변경 사항은 즉시 반영되지 않으며 저장 후 적용됩니다.",
  },
};

export const Tip: Story = {
  args: {
    tone: "tip",
    title: "단축키로 더 빠르게 작업하세요",
    description: "Cmd+K로 검색 팔레트를 열 수 있습니다.",
  },
};

export const TitleOnly: Story = {
  args: {
    tone: "info",
    title: "저장되지 않은 변경 사항이 있습니다",
  },
};

export const CustomIcon: Story = {
  args: {
    tone: "info",
    icon: "bell",
    title: "알림 설정이 변경되었습니다",
    description: "새로운 알림 규칙이 적용되었습니다.",
  },
};
