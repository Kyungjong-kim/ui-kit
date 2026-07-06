import type { Meta, StoryObj } from "@storybook/react";
import { SectionTitle } from "../src/components/composed/section-title";
import { Icon } from "../src/components/primitives/icon";

const meta: Meta<typeof SectionTitle> = {
  title: "Molecules/Heading/SectionTitle",
  component: SectionTitle,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SectionTitle>;

export const Default: Story = {
  args: {
    title: "섹션 타이틀",
    description: "상세 설명이 위치하는 자리입니다.",
  },
};

export const WithInfoIcon: Story = {
  args: {
    title: "섹션 타이틀",
    description: "보조 아이콘이 함께 표시됩니다.",
    infoIcon: <Icon name="bell" size="sm" color="tertiary" />,
  },
};

export const WithActions: Story = {
  render: () => (
    <SectionTitle
      title="목록"
      description="우측에 액션 버튼이 위치합니다."
      actions={
        <>
          <button type="button">필터</button>
          <button type="button">추가</button>
        </>
      }
    />
  ),
};

export const ModalHeader: Story = {
  args: {
    type: "modal",
    title: "모달 제목",
    description: "닫기 버튼만 노출됩니다.",
    onClose: () => {},
  },
};
