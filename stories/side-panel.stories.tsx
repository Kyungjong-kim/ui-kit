import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SidePanel } from "../src/components/composed/side-panel";

const meta: Meta<typeof SidePanel> = {
  title: "Organisms/Overlay/SidePanel",
  component: SidePanel,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SidePanel>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-8">
        <button type="button" onClick={() => setOpen(true)}>
          패널 열기
        </button>
        <SidePanel
          open={open}
          onOpenChange={setOpen}
          title="필터"
          footer={
            <>
              <button type="button" onClick={() => setOpen(false)}>
                초기화
              </button>
              <button type="button" onClick={() => setOpen(false)}>
                적용
              </button>
            </>
          }
        >
          <div className="space-y-4">
            {Array.from({ length: 30 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: 데모 정적 목록
              <p key={i}>스크롤되는 필터 항목 {i + 1}</p>
            ))}
          </div>
        </SidePanel>
      </div>
    );
  },
};

export const LeftSide: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-8">
        <button type="button" onClick={() => setOpen(true)}>
          좌측 패널 열기
        </button>
        <SidePanel open={open} onOpenChange={setOpen} side="left" title="메뉴">
          <p>좌측에서 슬라이드되는 패널입니다.</p>
        </SidePanel>
      </div>
    );
  },
};
