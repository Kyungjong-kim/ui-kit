import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FilterDropdown, type FilterOption } from "./filter-dropdown";

const options: FilterOption[] = [
  { value: "draft", label: "초안" },
  { value: "review", label: "검토중" },
  { value: "done", label: "완료" },
];

describe("FilterDropdown", () => {
  it("트리거 라벨을 렌더한다", () => {
    render(<FilterDropdown options={options} label="상태" />);
    expect(screen.getByRole("button", { name: /상태/ })).toBeInTheDocument();
  });

  it("트리거 클릭 시 옵션 체크박스가 열린다", async () => {
    render(<FilterDropdown options={options} label="상태" />);
    await userEvent.click(screen.getByRole("button", { name: /상태/ }));
    expect(screen.getByRole("checkbox", { name: "초안" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "완료" })).toBeInTheDocument();
  });

  it("적용 클릭 시 선택된 값으로 onChange가 호출된다", async () => {
    const onChange = vi.fn();
    render(<FilterDropdown options={options} label="상태" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: /상태/ }));
    await userEvent.click(screen.getByRole("checkbox", { name: "초안" }));
    await userEvent.click(screen.getByRole("checkbox", { name: "완료" }));
    await userEvent.click(screen.getByRole("button", { name: "적용" }));
    expect(onChange).toHaveBeenCalledWith(["draft", "done"]);
  });

  it("초기화 클릭 시 임시 선택이 비워진다", async () => {
    render(<FilterDropdown options={options} label="상태" defaultValue={["draft"]} />);
    await userEvent.click(screen.getByRole("button", { name: /상태/ }));
    expect(screen.getByRole("checkbox", { name: "초안" })).toBeChecked();
    await userEvent.click(screen.getByRole("button", { name: "초기화" }));
    expect(screen.getByRole("checkbox", { name: "초안" })).not.toBeChecked();
  });

  it("적용된 선택 개수를 배지로 표시한다", () => {
    render(<FilterDropdown options={options} label="상태" defaultValue={["draft", "done"]} />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("disabled면 클릭해도 열리지 않는다", async () => {
    render(<FilterDropdown options={options} label="상태" disabled />);
    await userEvent.click(screen.getByRole("button", { name: /상태/ }));
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });
});
