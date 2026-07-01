import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal } from "../src/components/composed/modal";

const meta: Meta<typeof Modal> = {
  title: "Organisms/Overlay/Modal",
  component: Modal,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          모달 열기
        </button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="모달 타이틀"
          content={<p className="p-4">모달 내용입니다.</p>}
          primaryAction={
            <button type="button" onClick={() => setOpen(false)}>
              확인
            </button>
          }
          secondaryAction={
            <button type="button" onClick={() => setOpen(false)}>
              취소
            </button>
          }
        />
      </>
    );
  },
};
