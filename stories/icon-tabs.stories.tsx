import type { Meta, StoryObj } from "@storybook/react";
import { IconTab, IconTabs } from "../src/components/composed/icon-tabs";

const meta: Meta<typeof IconTabs> = {
  title: "Composed/IconTabs",
  component: IconTabs,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IconTabs>;

export const Default: Story = {
  render: () => (
    <IconTabs defaultValue="code">
      <IconTab value="code" icon="code" label="코드" />
      <IconTab value="file" icon="file" label="파일" />
      <IconTab value="data" icon="formatData" label="데이터" />
    </IconTabs>
  ),
};

export const WithTooltip: Story = {
  render: () => (
    <IconTabs defaultValue="code">
      <IconTab value="code" icon="code" label="코드" tooltip="코드 뷰" />
      <IconTab value="file" icon="file" label="파일" tooltip="파일 목록" />
    </IconTabs>
  ),
};
