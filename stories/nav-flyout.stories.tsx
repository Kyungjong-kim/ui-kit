import type { Meta, StoryObj } from "@storybook/react";
import { NavFlyout } from "../src/components/composed/nav-flyout";
import { Button } from "../src/components/primitives/button";

const meta: Meta<typeof NavFlyout> = {
  title: "Organisms/Overlay/NavFlyout",
  component: NavFlyout,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NavFlyout>;

export const Default: Story = {
  render: () => (
    <NavFlyout
      trigger={
        <Button variant="secondary" size="md" appearance="outline">
          메뉴 열기
        </Button>
      }
      items={[
        { id: "profile", label: "프로필", icon: "user" },
        { id: "settings", label: "설정", icon: "gear" },
        { id: "logout", label: "로그아웃", icon: "signOut" },
      ]}
    />
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <NavFlyout
      trigger={
        <Button variant="secondary" size="md" appearance="outline">
          작업
        </Button>
      }
      items={[
        { id: "edit", label: "수정", icon: "pencil" },
        { id: "copy", label: "복제", icon: "copy" },
        { id: "delete", label: "삭제(권한 없음)", icon: "trash", disabled: true },
      ]}
    />
  ),
};

export const NoIcons: Story = {
  render: () => (
    <NavFlyout
      trigger={
        <Button variant="secondary" size="md" appearance="outline">
          정렬 기준
        </Button>
      }
      items={[
        { id: "latest", label: "최신순" },
        { id: "name", label: "이름순" },
        { id: "size", label: "크기순" },
      ]}
    />
  ),
};
