import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SegmentedControl, SegmentedControlItem } from "./segmented-control";

function renderControl(value = "a", onValueChange = vi.fn()) {
  return render(
    <SegmentedControl value={value} onValueChange={onValueChange} aria-label="보기 전환">
      <SegmentedControlItem value="a">목록</SegmentedControlItem>
      <SegmentedControlItem value="b">격자</SegmentedControlItem>
      <SegmentedControlItem value="c" disabled>
        지도
      </SegmentedControlItem>
    </SegmentedControl>,
  );
}

describe("SegmentedControl", () => {
  it("radiogroup과 radio 역할을 렌더한다", () => {
    renderControl();
    expect(screen.getByRole("radiogroup", { name: "보기 전환" })).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("선택된 항목에 aria-checked가 설정된다", () => {
    renderControl("b");
    expect(screen.getByRole("radio", { name: "격자" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "목록" })).not.toBeChecked();
  });

  it("미선택 항목 클릭 시 onValueChange를 호출한다", async () => {
    const onValueChange = vi.fn();
    renderControl("a", onValueChange);
    await userEvent.click(screen.getByRole("radio", { name: "격자" }));
    expect(onValueChange).toHaveBeenCalledWith("b");
  });

  it("ArrowRight로 다음 항목 선택을 이동한다", async () => {
    const onValueChange = vi.fn();
    renderControl("a", onValueChange);
    const first = screen.getByRole("radio", { name: "목록" });
    first.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenCalledWith("b");
  });

  it("disabled 항목은 클릭해도 onValueChange를 호출하지 않는다", async () => {
    const onValueChange = vi.fn();
    renderControl("a", onValueChange);
    await userEvent.click(screen.getByRole("radio", { name: "지도" }));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
