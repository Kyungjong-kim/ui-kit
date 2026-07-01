import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FullScreenDialog } from "../src/components/composed/full-screen-dialog";

const meta: Meta<typeof FullScreenDialog> = {
  title: "Organisms/Overlay/FullScreenDialog",
  component: FullScreenDialog,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FullScreenDialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-8">
        <button type="button" onClick={() => setOpen(true)}>
          전체화면 열기
        </button>
        <FullScreenDialog
          open={open}
          onOpenChange={setOpen}
          title="문서 편집"
          footer={
            <>
              <button type="button" onClick={() => setOpen(false)}>
                취소
              </button>
              <button type="button" onClick={() => setOpen(false)}>
                저장
              </button>
            </>
          }
        >
          <div className="space-y-4">
            {Array.from({ length: 40 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: 데모 정적 목록
              <p key={i}>스크롤되는 본문 라인 {i + 1}</p>
            ))}
          </div>
        </FullScreenDialog>
      </div>
    );
  },
};
