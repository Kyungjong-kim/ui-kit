import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src/components/primitives/button";
import { Toaster, toast } from "../src/components/primitives/toast";

const meta: Meta = {
  title: "Primitives/Toast",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <Toaster />
        <Story />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <Button onClick={() => toast("기본 알림 메시지입니다.")}>Default</Button>,
};

export const Success: Story = {
  render: () => <Button onClick={() => toast.success("저장되었습니다.")}>Success</Button>,
};

export const ErrorToast: Story = {
  render: () => (
    <Button variant="destructive" onClick={() => toast.error("오류가 발생했습니다.")}>
      Error
    </Button>
  ),
};

export const Warning: Story = {
  render: () => (
    <Button variant="secondary" onClick={() => toast.warning("주의하세요.")}>
      Warning
    </Button>
  ),
};

export const Info: Story = {
  render: () => (
    <Button variant="ghost" onClick={() => toast.info("참고 사항입니다.")}>
      Info
    </Button>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast.success("파일 업로드 완료", {
          description: "document.pdf가 성공적으로 업로드되었습니다.",
        })
      }
    >
      With Description
    </Button>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Button
      variant="secondary"
      onClick={() =>
        toast("이메일을 보냈습니다.", {
          action: { label: "취소", onClick: () => {} },
        })
      }
    >
      With Action
    </Button>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" onClick={() => toast("기본")}>
        Default
      </Button>
      <Button size="sm" onClick={() => toast.success("성공")}>
        Success
      </Button>
      <Button size="sm" variant="destructive" onClick={() => toast.error("오류")}>
        Error
      </Button>
      <Button size="sm" variant="secondary" onClick={() => toast.warning("경고")}>
        Warning
      </Button>
      <Button size="sm" variant="ghost" onClick={() => toast.info("안내")}>
        Info
      </Button>
    </div>
  ),
};
