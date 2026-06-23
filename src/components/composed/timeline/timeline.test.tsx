import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Timeline, type TimelineGroup } from "./timeline";

type Item = { id: string; text: string };

const groups: TimelineGroup<Item>[] = [
  {
    id: "g1",
    label: "06.12",
    sublabel: "2026",
    items: [
      { id: "a", text: "첫 번째 항목" },
      { id: "b", text: "두 번째 항목" },
    ],
  },
  {
    id: "g2",
    label: "06.11",
    items: [{ id: "c", text: "세 번째 항목" }],
  },
];

const renderItem = (item: Item) => <span>{item.text}</span>;
const getItemKey = (item: Item) => item.id;

describe("Timeline", () => {
  it("그룹 라벨과 보조 라벨을 렌더한다", () => {
    render(<Timeline groups={groups} renderItem={renderItem} getItemKey={getItemKey} />);
    expect(screen.getByText("06.12")).toBeInTheDocument();
    expect(screen.getByText("2026")).toBeInTheDocument();
    expect(screen.getByText("06.11")).toBeInTheDocument();
  });

  it("renderItem으로 모든 항목을 렌더한다", () => {
    render(<Timeline groups={groups} renderItem={renderItem} getItemKey={getItemKey} />);
    expect(screen.getByText("첫 번째 항목")).toBeInTheDocument();
    expect(screen.getByText("두 번째 항목")).toBeInTheDocument();
    expect(screen.getByText("세 번째 항목")).toBeInTheDocument();
  });

  it("항목을 리스트(li)로 의미구조화한다", () => {
    render(<Timeline groups={groups} renderItem={renderItem} getItemKey={getItemKey} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("sublabel이 없으면 렌더하지 않는다", () => {
    render(
      <Timeline
        groups={[{ id: "x", label: "06.10", items: [{ id: "z", text: "단독" }] }]}
        renderItem={renderItem}
        getItemKey={getItemKey}
      />,
    );
    expect(screen.getByText("06.10")).toBeInTheDocument();
    expect(screen.getByText("단독")).toBeInTheDocument();
  });

  it("labelWidth를 라벨 컬럼 너비로 적용한다", () => {
    const { container } = render(
      <Timeline groups={groups} renderItem={renderItem} getItemKey={getItemKey} labelWidth={80} />,
    );
    const labelCol = container.querySelector('[style*="width: 80px"]');
    expect(labelCol).toBeInTheDocument();
  });
});
