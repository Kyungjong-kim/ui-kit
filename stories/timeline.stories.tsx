import type { Meta, StoryObj } from "@storybook/react";
import { Timeline, type TimelineGroup } from "../src/components/composed/timeline";

type Entry = { id: string; title: string; detail: string };

const groups: TimelineGroup<Entry>[] = [
  {
    id: "2026-06-12",
    label: "06.12",
    sublabel: "2026",
    items: [
      { id: "1", title: "Deployed v2.4.0", detail: "Release pushed to production." },
      { id: "2", title: "Reviewed PR #128", detail: "Approved with minor comments." },
    ],
  },
  {
    id: "2026-06-11",
    label: "06.11",
    sublabel: "2026",
    items: [{ id: "3", title: "Kickoff meeting", detail: "Scoped the next milestone." }],
  },
];

const meta: Meta<typeof Timeline> = {
  title: "Data Display/Timeline",
  component: Timeline,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Timeline<Entry>>;

const renderItem = (item: Entry) => (
  <div className="flex flex-col gap-group-xxs">
    <span className="typography-label-md-medium text-[var(--color-text-primary)]">
      {item.title}
    </span>
    <span className="typography-body-sm-base text-[var(--color-text-tertiary)]">{item.detail}</span>
  </div>
);

export const Default: Story = {
  render: () => (
    <div className="max-w-xl">
      <Timeline groups={groups} renderItem={renderItem} getItemKey={(item) => item.id} />
    </div>
  ),
};

export const WithoutSublabel: Story = {
  render: () => (
    <div className="max-w-xl">
      <Timeline
        groups={[
          { id: "g1", label: "Mon", items: [{ id: "a", title: "Standup", detail: "9:30 AM" }] },
          { id: "g2", label: "Tue", items: [{ id: "b", title: "Demo", detail: "2:00 PM" }] },
        ]}
        renderItem={renderItem}
        getItemKey={(item) => item.id}
      />
    </div>
  ),
};
