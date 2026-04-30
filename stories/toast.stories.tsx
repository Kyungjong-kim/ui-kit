import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src/components/primitives/button";
import { Toaster, toast } from "../src/components/primitives/toast";

const meta: Meta = {
  title: "Primitives/Toast",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button onClick={() => toast("기본 알림 메시지입니다.")}>Default</Button>
    </div>
  ),
};

export const Success: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button onClick={() => toast.success("저장되었습니다.")}>Success</Button>
    </div>
  ),
};

export const ErrorToast: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button variant="destructive" onClick={() => toast.error("오류가 발생했습니다.")}>
        Error
      </Button>
    </div>
  ),
};

export const Warning: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button variant="secondary" onClick={() => toast.warning("주의하세요.")}>
        Warning
      </Button>
    </div>
  ),
};

export const Info: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button variant="ghost" onClick={() => toast.info("참고 사항입니다.")}>
        Info
      </Button>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button
        onClick={() =>
          toast.success("파일 업로드 완료", {
            description: "document.pdf가 성공적으로 업로드되었습니다.",
          })
        }
      >
        With Description
      </Button>
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <div>
      <Toaster />
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
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Toaster />
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
