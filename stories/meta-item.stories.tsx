import type { Meta, StoryObj } from "@storybook/react";
import { MetaInfo, MetaItem } from "../src/components/composed/meta-item";
import { Badge } from "../src/components/primitives/badge";

const meta: Meta<typeof MetaItem> = {
  title: "Data Display/MetaItem",
  component: MetaItem,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MetaItem>;

export const Default: Story = {
  args: { label: "작성자", value: "홍길동" },
};

export const Small: Story = {
  args: { label: "작성자", value: "홍길동", size: "sm" },
};

export const WithBadgeValue: Story = {
  render: () => (
    <MetaItem
      label="상태"
      value={
        <Badge variant="success" size="sm">
          정상
        </Badge>
      }
      size="sm"
    />
  ),
};

export const MetaInfoRow: StoryObj<typeof MetaInfo> = {
  render: () => (
    <MetaInfo
      items={[
        <>버전 ID 1024</>,
        <>
          상태{" "}
          <Badge variant="success" size="sm">
            정상
          </Badge>
        </>,
        <>수정일 2026-01-15</>,
      ]}
    />
  ),
};
