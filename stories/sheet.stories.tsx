import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../src/components/primitives/button";
import { Sheet } from "../src/components/primitives/sheet";

const meta: Meta = {
  title: "Overlay/Sheet",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

function SheetStory({ side }: { side: "top" | "right" | "bottom" | "left" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>{side} 패널 열기</Button>
      <Sheet
        open={open}
        onOpenChange={setOpen}
        side={side}
        title={`${side} 패널`}
        description={`${side} 방향에서 슬라이드되는 패널입니다.`}
        footer={
          <Button variant="secondary" onClick={() => setOpen(false)}>
            닫기
          </Button>
        }
      >
        <p className="text-sm text-[var(--color-text-secondary)]">패널 내용이 여기에 들어갑니다.</p>
      </Sheet>
    </>
  );
}

export const Right: Story = { render: () => <SheetStory side="right" /> };
export const Left: Story = { render: () => <SheetStory side="left" /> };
export const Top: Story = { render: () => <SheetStory side="top" /> };
export const Bottom: Story = { render: () => <SheetStory side="bottom" /> };

export const Form: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>편집 패널 열기</Button>
        <Sheet
          open={open}
          onOpenChange={setOpen}
          side="right"
          title="프로필 편집"
          description="변경 사항은 저장 버튼을 눌러 적용됩니다."
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setOpen(false)}>저장</Button>
            </>
          }
        >
          <div className="space-y-3">
            <label className="block text-sm">
              <span className="text-[var(--color-text-secondary)]">이름</span>
              <input
                className="mt-1 w-full rounded-md border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] p-2 text-sm"
                defaultValue="홍길동"
              />
            </label>
          </div>
        </Sheet>
      </>
    );
  },
};
