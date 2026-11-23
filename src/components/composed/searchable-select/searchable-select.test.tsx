import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SearchableSelect } from "./searchable-select";

const options = [
  { value: "seoul", label: "서울", group: "수도권" },
  { value: "incheon", label: "인천", group: "수도권" },
  { value: "busan", label: "부산", group: "영남" },
  { value: "daegu", label: "대구", group: "영남" },
];

describe("SearchableSelect", () => {
  it("placeholder를 렌더한다", () => {
    render(<SearchableSelect options={options} placeholder="지역 선택" />);
    expect(screen.getByText("지역 선택")).toBeInTheDocument();
  });

  it("열면 그룹 헤더와 옵션을 렌더한다", () => {
    render(<SearchableSelect options={options} />);
    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("수도권")).toBeInTheDocument();
    expect(screen.getByText("영남")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /서울/ })).toBeInTheDocument();
  });

  it("검색어로 옵션을 필터링한다", () => {
    render(<SearchableSelect options={options} searchPlaceholder="검색" />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByPlaceholderText("검색"), { target: { value: "부산" } });
    expect(screen.getByText("부산")).toBeInTheDocument();
    expect(screen.queryByText("서울")).not.toBeInTheDocument();
  });

  it("옵션 클릭 시 onValueChange를 호출한다", () => {
    const onValueChange = vi.fn();
    render(<SearchableSelect options={options} onValueChange={onValueChange} />);
    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: /대구/ }));
    expect(onValueChange).toHaveBeenCalledWith("daegu");
  });

  it("uncontrolled 모드에서 선택값이 trigger에 반영된다", () => {
    render(<SearchableSelect options={options} placeholder="지역 선택" />);
    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole("option", { name: /인천/ }));
    expect(trigger).toHaveTextContent("인천");
  });

  it("키보드 ↓·Enter로 옵션을 선택한다", () => {
    const onValueChange = vi.fn();
    render(
      <SearchableSelect options={options} onValueChange={onValueChange} searchPlaceholder="검색" />,
    );
    fireEvent.click(screen.getByRole("combobox"));
    const input = screen.getByPlaceholderText("검색");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onValueChange).toHaveBeenCalledWith("incheon");
  });

  it("helperText 를 트리거 설명으로 연결하고 error 면 aria-invalid 를 붙인다", () => {
    render(<SearchableSelect options={options} error helperText="지역을 고르세요." />);
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAccessibleDescription("지역을 고르세요.");
    expect(trigger).toHaveAttribute("aria-invalid", "true");
  });

  it("한글 조합 중 Enter 는 옵션을 선택하지 않는다", () => {
    const onValueChange = vi.fn();
    render(
      <SearchableSelect options={options} onValueChange={onValueChange} searchPlaceholder="검색" />,
    );
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
    render(<SearchableSelect options={options} searchPlaceholder="검색" />);
    fireEvent.click(screen.getByRole("combobox"));
    scrollIntoView.mockClear();
    fireEvent.keyDown(screen.getByPlaceholderText("검색"), { key: "ArrowDown" });
    expect(scrollIntoView).toHaveBeenCalledWith({ block: "nearest" });
    const contexts = scrollIntoView.mock.contexts;
    expect(contexts[contexts.length - 1]).toHaveAttribute("aria-selected");
  });

  it("필드 상자는 입력 테두리 토큰·6px·초점 halo 를 쓴다 (Warm Precision)", () => {
    render(<SearchableSelect options={options} label="지역" />);
    const cls = screen.getByRole("combobox").className;
    expect(cls).toMatch(/rounded-xs/);
    expect(cls).toMatch(/color-border-input-default/);
    expect(cls).toMatch(/hover:border-\[var\(--color-border-input-hover\)\]/);
    expect(cls).toMatch(/color-border-input-focus/);
    expect(cls).toMatch(/color-focus-halo/);
    expect(cls).not.toMatch(/ring-offset/);
  });

  it("목록은 4px 안쪽 여백, 선택 옵션은 연노랑 배경으로 hover 와 구분된다 (Warm Precision)", () => {
    render(<SearchableSelect options={options} value="seoul" />);
    fireEvent.click(screen.getByRole("combobox"));
    const listbox = screen.getByRole("listbox");
    expect(listbox).toHaveClass("p-stack-xs");
    const selected = screen.getByRole("option", { selected: true });
    expect(selected.className).toMatch(/color-bg-brand-subtle/);
    expect(selected).toHaveClass("rounded-xxs");
    expect(selected.className).not.toMatch(/text-\[var\(--color-text-brand-default\)\]/);
  });

  it("오류 helperText 앞에 장식용 경고 아이콘이 붙는다", () => {
    render(<SearchableSelect options={options} error helperText="필수 항목입니다." />);
    const helper = screen.getByText("필수 항목입니다.");
    expect(helper.querySelector("svg[aria-hidden='true']")).not.toBeNull();
  });
});
