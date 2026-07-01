import type { Meta, StoryObj } from "@storybook/react";
import { VersionInfoCard } from "../src/components/composed/version-info-card";

const meta: Meta<typeof VersionInfoCard> = {
  title: "Data Display/VersionInfoCard",
  component: VersionInfoCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof VersionInfoCard>;

export const Default: Story = {
  args: {
    version: "v2.4.1",
    releaseDate: "2026-07-01",
    summary: "성능 개선 및 다수의 버그를 수정했습니다.",
  },
};

export const WithItems: Story = {
  args: {
    version: "v2.4.1",
    releaseDate: "2026-07-01",
    summary: "정기 릴리스.",
    items: [
      { label: "빌드", value: "20260701.1" },
      { label: "커밋", value: "a1b2c3d" },
      { label: "채널", value: "stable" },
    ],
  },
};

export const VersionOnly: Story = {
  args: {
    version: "v2.4.1",
  },
};
