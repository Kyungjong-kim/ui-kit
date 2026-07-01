import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../src/components/primitives/button";
import { Input } from "../src/components/primitives/input";
import { Text } from "../src/components/primitives/text";
import { ModalPageTemplate } from "../src/templates/modal-page-template";

const meta: Meta<typeof ModalPageTemplate> = {
  title: "Templates/ModalPageTemplate",
  component: ModalPageTemplate,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ModalPageTemplate>;

/**
 * 실제 "프로젝트 삭제" 확인 모달 목업.
 * 경고 문구 + 프로젝트명 확인 입력 + 취소/삭제 액션으로 구성된 완성 화면.
 */
export const DeleteConfirmDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-8">
        <Button variant="destructive" onClick={() => setOpen(true)}>
          프로젝트 삭제
        </Button>
        <ModalPageTemplate
          open={open}
          onClose={() => setOpen(false)}
          title="프로젝트 삭제"
          footer={
            <div className="flex justify-end gap-group-sm">
              <Button variant="secondary" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button variant="destructive" onClick={() => setOpen(false)}>
                영구 삭제
              </Button>
            </div>
          }
        >
          <div className="flex flex-col gap-stack-md">
            <Text variant="typography-body-md-base" className="text-[var(--color-text-secondary)]">
              <Text as="span" variant="typography-body-md-bold">
                2026 리브랜딩
              </Text>{" "}
              프로젝트와 관련 데이터가 모두 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
            </Text>
            <Input label="확인을 위해 프로젝트 이름을 입력하세요" placeholder="2026 리브랜딩" />
          </div>
        </ModalPageTemplate>
      </div>
    );
  },
};
