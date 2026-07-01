import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ModalPageTemplate } from "../src/templates/modal-page-template";

const meta: Meta<typeof ModalPageTemplate> = {
  title: "Templates/ModalPageTemplate",
  component: ModalPageTemplate,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ModalPageTemplate>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-8">
        <button type="button" onClick={() => setOpen(true)}>
          모달 열기
        </button>
        <ModalPageTemplate
          open={open}
          onClose={() => setOpen(false)}
          title="항목 삭제"
          footer={
            <div className="flex gap-3">
              <button type="button" onClick={() => setOpen(false)}>
                취소
              </button>
              <button type="button" onClick={() => setOpen(false)}>
                삭제
              </button>
            </div>
          }
        >
          <p>선택한 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
        </ModalPageTemplate>
      </div>
    );
  },
};
