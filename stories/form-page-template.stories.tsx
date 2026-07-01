import type { Meta, StoryObj } from "@storybook/react";
import { FormPageTemplate } from "../src/templates/form-page-template";

const meta: Meta<typeof FormPageTemplate> = {
  title: "Templates/FormPageTemplate",
  component: FormPageTemplate,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormPageTemplate>;

const FormBody = (
  <>
    <label className="flex flex-col gap-group-xxs">
      <span className="typography-label-md-medium text-[var(--color-text-primary)]">이름</span>
      <input
        className="h-size-control-md rounded-xs border border-[var(--color-border-subtle)] px-inline-md"
        placeholder="이름 입력"
      />
    </label>
    <label className="flex flex-col gap-group-xxs">
      <span className="typography-label-md-medium text-[var(--color-text-primary)]">설명</span>
      <textarea
        className="min-h-[96px] rounded-xs border border-[var(--color-border-subtle)] px-inline-md py-stack-xs"
        placeholder="설명 입력"
      />
    </label>
  </>
);

export const Default: Story = {
  args: {
    title: "사용자 등록",
    description: "필수 항목을 모두 입력해주세요.",
    children: FormBody,
  },
};

export const Submitting: Story = {
  args: {
    title: "사용자 등록",
    description: "저장 중입니다.",
    isSubmitting: true,
    children: FormBody,
  },
};
