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

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Toaster />
      <Button onClick={() => toast("기본 알림 메시지입니다.")}>Default</Button>
      <Button onClick={() => toast.success("저장되었습니다.")}>Success</Button>
      <Button onClick={() => toast.error("오류가 발생했습니다.")}>Error</Button>
      <Button onClick={() => toast.warning("주의하세요.")}>Warning</Button>
      <Button onClick={() => toast.info("참고 사항입니다.")}>Info</Button>
      <Button
        onClick={() =>
          toast("확인이 필요합니다.", {
            action: { label: "확인", onClick: () => {} },
          })
        }
      >
        With Action
      </Button>
    </div>
  ),
};
