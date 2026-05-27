import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Combobox } from "./combobox";

const options = [
  { value: "apple", label: "사과" },
  { value: "banana", label: "바나나" },
  { value: "orange", label: "오렌지" },
];

describe("Combobox", () => {
  it("placeholder를 렌더한다", () => {
    render(<Combobox options={options} placeholder="과일 선택" />);
    expect(screen.getByText("과일 선택")).toBeInTheDocument();
  });

  it("label을 렌더한다", () => {
    render(<Combobox options={options} label="과일" />);
    expect(screen.getByText("과일")).toBeInTheDocument();
  });

  it("disabled 상태가 적용된다", () => {
    render(<Combobox options={options} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("열면 옵션을 렌더한다", () => {
    render(<Combobox options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("사과")).toBeInTheDocument();
    expect(screen.getByText("바나나")).toBeInTheDocument();
  });

  it("검색어로 옵션을 필터링한다", () => {
    render(<Combobox options={options} searchPlaceholder="검색" />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByPlaceholderText("검색"), { target: { value: "바나" } });
    expect(screen.getByText("바나나")).toBeInTheDocument();
    expect(screen.queryByText("사과")).not.toBeInTheDocument();
  });

  it("일치 항목 없으면 emptyText를 렌더한다", () => {
    render(<Combobox options={options} searchPlaceholder="검색" emptyText="결과 없음" />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByPlaceholderText("검색"), { target: { value: "zzz" } });
    expect(screen.getByText("결과 없음")).toBeInTheDocument();
  });

  it("옵션 클릭 시 onValueChange를 호출한다", () => {
    const onValueChange = vi.fn();
    render(<Combobox options={options} onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByText("오렌지"));
    expect(onValueChange).toHaveBeenCalledWith("orange");
  });

  it("uncontrolled 모드에서 선택값이 trigger에 반영된다", () => {
    render(<Combobox options={options} placeholder="과일 선택" />);
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent("과일 선택");
    fireEvent.click(trigger);
    fireEvent.click(screen.getByText("오렌지"));
    expect(trigger).toHaveTextContent("오렌지");
  });

  it("키보드 ↓·Enter로 옵션을 선택한다", () => {
    const onValueChange = vi.fn();
    render(<Combobox options={options} onValueChange={onValueChange} searchPlaceholder="검색" />);
    fireEvent.click(screen.getByRole("combobox"));
    const input = screen.getByPlaceholderText("검색");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onValueChange).toHaveBeenCalledWith("banana");
  });
});
