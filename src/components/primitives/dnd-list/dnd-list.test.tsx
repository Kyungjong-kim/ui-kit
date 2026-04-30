import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DndList } from "./dnd-list";

interface Item {
  id: string;
  label: string;
}

const items: Item[] = [
  { id: "1", label: "항목 1" },
  { id: "2", label: "항목 2" },
  { id: "3", label: "항목 3" },
];

describe("DndList", () => {
  it("모든 아이템을 렌더한다", () => {
    render(
      <DndList
        items={items}
        onReorder={() => {}}
        renderItem={(item) => <span>{item.label}</span>}
      />,
    );
    for (const item of items) {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    }
  });
});
