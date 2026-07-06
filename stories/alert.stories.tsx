import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "../src/components/composed/alert";

const meta: Meta<typeof Alert> = {
  title: "Molecules/Feedback/Alert",
  component: Alert,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-3">
      <Alert variant="info" title="정보" description="새 버전이 배포되었습니다." />
      <Alert variant="success" title="성공" description="변경 사항이 저장되었습니다." />
      <Alert variant="warning" title="주의" description="저장하지 않은 변경 사항이 있습니다." />
      <Alert variant="danger" title="오류" description="요청을 처리하지 못했습니다." />
    </div>
  ),
};

export const Dismissible: Story = {
  args: {
    variant: "warning",
    title: "세션 만료 예정",
    description: "5분 후 자동 로그아웃됩니다.",
    dismissible: true,
    onDismiss: () => {},
  },
};

export const DescriptionOnly: Story = {
  args: {
    variant: "info",
    description: "간단한 인라인 안내 메시지입니다.",
  },
};

export const NoIcon: Story = {
  args: {
    variant: "success",
    title: "완료",
    description: "아이콘 없이 표시된 배너입니다.",
    icon: null,
  },
};
