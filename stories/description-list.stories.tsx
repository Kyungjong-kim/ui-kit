import type { Meta, StoryObj } from "@storybook/react";
import { DescriptionList } from "../src/components/composed/description-list";
import { MetaItem } from "../src/components/composed/meta-item";

const meta: Meta<typeof DescriptionList> = {
  title: "Data Display/DescriptionList",
  component: DescriptionList,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DescriptionList>;

const rows = (
  <>
    <MetaItem label="이름" value="기본 항목" />
    <MetaItem label="작성자" value="홍길동" />
    <MetaItem label="수정일" value="2026-01-15" />
  </>
);

export const Card: Story = {
  render: () => <DescriptionList>{rows}</DescriptionList>,
};

export const Accordion: Story = {
  render: () => <DescriptionList accordionTitle="상세 설정">{rows}</DescriptionList>,
};

export const Loading: Story = {
  render: () => (
    <DescriptionList loading skeletonRows={4}>
      {null}
    </DescriptionList>
  ),
};
