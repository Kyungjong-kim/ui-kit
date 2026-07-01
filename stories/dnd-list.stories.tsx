import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Badge } from "../src/components/primitives/badge";
import { DndList } from "../src/components/primitives/dnd-list";

const meta: Meta = {
  title: "Organisms/Misc/DndList",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: "1", label: "디자인 시스템 구축", status: "done" as const },
      { id: "2", label: "컴포넌트 포팅", status: "progress" as const },
      { id: "3", label: "스토리북 연동", status: "done" as const },
      { id: "4", label: "문서화", status: "pending" as const },
    ]);

    return (
      <div className="w-80">
        <DndList
          items={items}
          onReorder={setItems}
          renderItem={(item) => (
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-primary)]">{item.label}</span>
              <Badge
                variant={
                  item.status === "done"
                    ? "success"
                    : item.status === "progress"
                      ? "default"
                      : "outline"
                }
              >
                {item.status === "done" ? "완료" : item.status === "progress" ? "진행중" : "대기"}
              </Badge>
            </div>
          )}
        />
      </div>
    );
  },
};
