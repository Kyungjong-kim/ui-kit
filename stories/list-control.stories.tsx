import type { Meta, StoryObj } from "@storybook/react";
import { ListControl } from "../src/components/composed/list-control";
import { SelectButton } from "../src/components/composed/select-button";
import { Input } from "../src/components/primitives/input";

const meta: Meta<typeof ListControl> = {
  title: "Molecules/Filter/ListControl",
  component: ListControl,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ListControl>;

export const Full: Story = {
  render: () => (
    <ListControl
      count={1234}
      search={<Input placeholder="검색어를 입력하세요" className="w-64" />}
      filter={<SelectButton startIcon="list">필터</SelectButton>}
      sort={<SelectButton endIcon="chevronDownThickFalse">최신순</SelectButton>}
    />
  ),
};

export const CountAndSearch: Story = {
  render: () => <ListControl count={42} search={<Input placeholder="검색" className="w-64" />} />,
};

export const CountOnly: Story = {
  args: { count: 7, countUnit: "개" },
};

export const ActionsOnly: Story = {
  render: () => (
    <ListControl
      sort={<SelectButton endIcon="chevronDownThickFalse">이름순</SelectButton>}
      filter={<SelectButton startIcon="list">필터</SelectButton>}
    />
  ),
};
