import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FullScreenDialogPageTemplate } from "../src/templates/full-screen-dialog-page-template";

const meta: Meta<typeof FullScreenDialogPageTemplate> = {
  title: "Templates/FullScreenDialogPageTemplate",
  component: FullScreenDialogPageTemplate,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FullScreenDialogPageTemplate>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-8">
        <button type="button" onClick={() => setOpen(true)}>
          전체화면 열기
        </button>
        <FullScreenDialogPageTemplate
          open={open}
          onClose={() => setOpen(false)}
          title="문서 편집"
          headerActions={
            <button type="button" onClick={() => setOpen(false)}>
              저장
            </button>
          }
          footer={
            <button type="button" onClick={() => setOpen(false)}>
              완료
            </button>
          }
        >
          <div className="space-y-4">
            {Array.from({ length: 40 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: 데모 정적 목록
              <p key={i}>스크롤되는 본문 문단 {i + 1}</p>
            ))}
          </div>
        </FullScreenDialogPageTemplate>
      </div>
    );
  },
};
