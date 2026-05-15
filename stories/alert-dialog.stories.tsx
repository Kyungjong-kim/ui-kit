import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AlertDialog } from "../src/components/primitives/alert-dialog";
import { Button } from "../src/components/primitives/button";

const meta: Meta = {
  title: "Overlay/AlertDialog",
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
        <Button onClick={() => setOpen(true)}>알림 열기</Button>
        <AlertDialog
          open={open}
          onOpenChange={setOpen}
          title="저장하시겠습니까?"
          description="변경사항을 저장합니다."
        />
      </>
    );
  },
};

export const Destructive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          삭제
        </Button>
        <AlertDialog
          open={open}
          onOpenChange={setOpen}
          title="정말 삭제하시겠습니까?"
          description="이 작업은 되돌릴 수 없습니다."
          cancelText="취소"
          actionText="삭제"
          destructive
        />
      </>
    );
  },
};

export const WithChildren: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>로그아웃</Button>
        <AlertDialog
          open={open}
          onOpenChange={setOpen}
          title="로그아웃 확인"
          cancelText="아니오"
          actionText="로그아웃"
        >
          <p className="text-sm text-[var(--color-text-secondary)]">
            저장되지 않은 변경사항이 있을 수 있습니다.
          </p>
        </AlertDialog>
      </>
    );
  },
};
