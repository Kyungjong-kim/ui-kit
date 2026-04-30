import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../src/components/primitives/button";
import { Dialog } from "../src/components/primitives/dialog";

const meta: Meta = {
  title: "Primitives/Dialog",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>다이얼로그 열기</Button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          title="확인"
          description="이 작업을 진행하시겠습니까?"
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>취소</Button>
              <Button onClick={() => setOpen(false)}>확인</Button>
            </>
          }
        >
          <p className="text-sm text-[var(--color-text-secondary)]">추가 내용이 여기에 들어갑니다.</p>
        </Dialog>
      </>
    );
  },
};

export const Destructive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>삭제</Button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          title="정말 삭제하시겠습니까?"
          description="이 작업은 되돌릴 수 없습니다."
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>취소</Button>
              <Button variant="destructive" onClick={() => setOpen(false)}>삭제</Button>
            </>
          }
        />
      </>
    );
  },
};
