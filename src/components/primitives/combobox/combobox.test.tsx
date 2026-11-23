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

  it("helperText 를 트리거 설명으로 연결하고 error 면 aria-invalid 를 붙인다", () => {
    render(<Combobox options={options} label="과일" error helperText="과일을 고르세요." />);
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAccessibleDescription("과일을 고르세요.");
    expect(trigger).toHaveAttribute("aria-invalid", "true");
  });

  it("한글 조합 중 Enter 는 옵션을 선택하지 않는다", () => {
    const onValueChange = vi.fn();
    render(<Combobox options={options} onValueChange={onValueChange} searchPlaceholder="검색" />);
    fireEvent.click(screen.getByRole("combobox"));
    const input = screen.getByPlaceholderText("검색");
    fireEvent.keyDown(input, { key: "Enter", isComposing: true });
    fireEvent.keyDown(input, { key: "Enter", keyCode: 229 });
    expect(onValueChange).not.toHaveBeenCalled();
    expect(input).toBeInTheDocument();
  });

  it("키보드로 옮긴 활성 옵션을 스크롤 영역 안으로 가져온다", () => {
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    render(<Combobox options={options} searchPlaceholder="검색" />);
    fireEvent.click(screen.getByRole("combobox"));
    scrollIntoView.mockClear();
    fireEvent.keyDown(screen.getByPlaceholderText("검색"), { key: "ArrowDown" });
    expect(scrollIntoView).toHaveBeenCalledWith({ block: "nearest" });
    const contexts = scrollIntoView.mock.contexts;
    expect(contexts[contexts.length - 1]).toHaveAttribute("aria-selected");
  });

  it("필드 상자는 입력 테두리 토큰·6px·초점 halo 를 쓴다 (Warm Precision)", () => {
    render(<Combobox options={options} label="과일" />);
    const cls = screen.getByRole("combobox").className;
    expect(cls).toMatch(/rounded-xs/);
    expect(cls).toMatch(/color-border-input-default/);
    expect(cls).toMatch(/hover:border-\[var\(--color-border-input-hover\)\]/);
    expect(cls).toMatch(/color-border-input-focus/);
    expect(cls).toMatch(/color-focus-halo/);
    expect(cls).not.toMatch(/ring-offset/);
  });

  it("목록은 4px 안쪽 여백, 선택 옵션은 연노랑 배경으로 hover 와 구분된다 (Warm Precision)", () => {
    render(<Combobox options={options} value="apple" />);
    fireEvent.click(screen.getByRole("combobox"));
    const listbox = screen.getByRole("listbox");
    expect(listbox).toHaveClass("p-stack-xs");
    const selected = screen.getByRole("option", { selected: true });
    expect(selected.className).toMatch(/color-bg-brand-subtle/);
    expect(selected).toHaveClass("rounded-xxs");
    expect(selected.className).not.toMatch(/text-\[var\(--color-text-brand-default\)\]/);
  });

  it("오류 helperText 앞에 장식용 경고 아이콘이 붙는다", () => {
    render(<Combobox options={options} error helperText="필수 항목입니다." />);
    const helper = screen.getByText("필수 항목입니다.");
    expect(helper.querySelector("svg[aria-hidden='true']")).not.toBeNull();
  });
});
