import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SectionTitle } from "../src/components/composed/section-title";
import { TagInput } from "../src/components/composed/tag-input";
import { Button } from "../src/components/primitives/button";
import { Input } from "../src/components/primitives/input";
import { Select } from "../src/components/primitives/select";
import { Textarea } from "../src/components/primitives/textarea";
import { FullScreenDialogPageTemplate } from "../src/templates/full-screen-dialog-page-template";

const categoryOptions = [
  { value: "guide", label: "가이드" },
  { value: "release", label: "릴리스 노트" },
  { value: "faq", label: "FAQ" },
];

const meta: Meta<typeof FullScreenDialogPageTemplate> = {
  title: "Templates/FullScreenDialogPageTemplate",
  component: FullScreenDialogPageTemplate,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FullScreenDialogPageTemplate>;

/**
 * 실제 "문서 편집" 전체화면 목업.
 * 상단바(제목·임시저장 액션·닫기) + 스크롤 본문에 제목·카테고리·태그·본문 필드로
 * 구성된 완성 편집 폼 + 하단 게시 버튼을 담았다.
 */
export const DocumentEditor: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [tags, setTags] = useState<string[]>(["온보딩", "가이드"]);
    return (
      <div className="p-8">
        <Button onClick={() => setOpen(true)}>문서 편집 열기</Button>
        <FullScreenDialogPageTemplate
          open={open}
          onClose={() => setOpen(false)}
          title="문서 편집"
          headerActions={
            <Button variant="secondary" onClick={() => setOpen(false)}>
              임시 저장
            </Button>
          }
          footer={<Button onClick={() => setOpen(false)}>게시하기</Button>}
        >
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-stack-lg py-stack-lg">
            <section className="flex flex-col gap-group-md">
              <SectionTitle title="문서 정보" />
              <Input label="제목" placeholder="문서 제목을 입력하세요" className="w-full" />
              <Select
                label="카테고리"
                options={categoryOptions}
                placeholder="카테고리 선택"
                className="w-full"
              />
              <div className="flex flex-col gap-group-xxs">
                <span className="typography-label-md-medium text-[var(--color-text-primary)]">
                  태그
                </span>
                <TagInput value={tags} onChange={setTags} placeholder="태그 입력 후 Enter" />
              </div>
            </section>

            <section className="flex flex-col gap-group-md">
              <SectionTitle title="본문" />
              <Textarea
                label="내용"
                placeholder="문서 본문을 작성하세요."
                className="min-h-[320px] w-full"
              />
            </section>
          </div>
        </FullScreenDialogPageTemplate>
      </div>
    );
  },
};
