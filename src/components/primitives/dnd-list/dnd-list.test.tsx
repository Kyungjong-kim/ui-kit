import { act, fireEvent, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
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

  describe("키보드 재정렬", () => {
    const original = Element.prototype.getBoundingClientRect;
    afterEach(() => {
      Element.prototype.getBoundingClientRect = original;
    });

    it("손잡이에서 Space → ↓ → Space 로 한 칸 내리면 onReorder 가 바뀐 순서로 불린다", async () => {
      // jsdom 은 레이아웃이 없어 모든 rect 가 0 — 항목 순서대로 40px 씩 쌓인 것처럼 흉내 낸다
      Element.prototype.getBoundingClientRect = function (this: Element) {
        const match = this.textContent?.match(/항목 (\d)/);
        const top = match ? (Number(match[1]) - 1) * 40 : 0;
        return {
          x: 0,
          y: top,
          top,
          left: 0,
          right: 200,
          bottom: top + 40,
          width: 200,
          height: 40,
          toJSON: () => ({}),
        } as DOMRect;
      };
      const onReorder = vi.fn();
      render(
        <DndList
          items={items}
          onReorder={onReorder}
          renderItem={(item) => <span>{item.label}</span>}
        />,
      );
      const handle = screen.getAllByRole("button", { name: "드래그 핸들" })[0];
      handle.focus();
      await act(async () => {
        fireEvent.keyDown(handle, { code: "Space", key: " " });
      });
      // 드래그 시작 후 dnd-kit 이 rect 를 재는 프레임을 기다린다
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
      });
      await act(async () => {
        fireEvent.keyDown(document, { code: "ArrowDown", key: "ArrowDown" });
      });
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
      });
      await act(async () => {
        fireEvent.keyDown(document, { code: "Space", key: " " });
      });
      expect(onReorder).toHaveBeenCalledWith([items[1], items[0], items[2]]);
    });
  });

  it("서버 렌더마다 같은 접근성 id 를 만들어 하이드레이션이 어긋나지 않는다", () => {
    const html = () =>
      renderToString(
        <DndList
          items={items}
          onReorder={() => {}}
          renderItem={(item) => <span>{item.label}</span>}
        />,
      );
    const describedBy = (markup: string) => markup.match(/aria-describedby="([^"]+)"/)?.[1];
    expect(describedBy(html())).toBeDefined();
    expect(describedBy(html())).toBe(describedBy(html()));
  });
});
