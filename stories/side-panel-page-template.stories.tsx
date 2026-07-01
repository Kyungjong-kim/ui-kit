import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SidePanelPageTemplate } from "../src/templates/side-panel-page-template";

const meta: Meta<typeof SidePanelPageTemplate> = {
  title: "Templates/SidePanelPageTemplate",
  component: SidePanelPageTemplate,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SidePanelPageTemplate>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-8">
        <button type="button" onClick={() => setOpen(true)}>
          패널 열기
        </button>
        <SidePanelPageTemplate
          open={open}
          onClose={() => setOpen(false)}
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
        </SidePanelPageTemplate>
      </div>
    );
  },
};
