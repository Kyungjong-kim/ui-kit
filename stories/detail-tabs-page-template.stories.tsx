import type { Meta, StoryObj } from "@storybook/react";
import { DetailTabsPageTemplate } from "../src/templates/detail-tabs-page-template";

const meta: Meta<typeof DetailTabsPageTemplate> = {
  title: "Templates/DetailTabsPageTemplate",
  component: DetailTabsPageTemplate,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DetailTabsPageTemplate>;

const tabs = [
  {
    label: "개요",
    value: "overview",
    content: (
      <div className="typography-body-md-base text-[var(--color-text-secondary)]">
        리소스 개요 정보가 표시됩니다.
      </div>
    ),
  },
  {
    label: "설정",
    value: "settings",
    content: (
      <div className="typography-body-md-base text-[var(--color-text-secondary)]">
        리소스 설정 항목이 표시됩니다.
      </div>
    ),
  },
  {
    label: "활동 로그",
    value: "activity",
    content: (
      <div className="typography-body-md-base text-[var(--color-text-secondary)]">
        최근 활동 내역이 표시됩니다.
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    title: "리소스 상세",
    tabs,
  },
};

export const WithHeaderActions: Story = {
  args: {
    title: "리소스 상세",
    tabs,
    headerActions: (
      <button
        type="button"
        className="h-size-control-md rounded-xs border border-[var(--color-border-subtle)] px-inline-lg typography-label-md-medium"
      >
        편집
      </button>
    ),
  },
};
