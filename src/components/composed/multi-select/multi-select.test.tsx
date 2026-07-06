import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ComponentProps, useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { MultiSelect, type MultiSelectOption } from "./multi-select";

const options: MultiSelectOption[] = [
  { value: "a", label: "Apple" },
  { value: "b", label: "Banana" },
  { value: "c", label: "Cherry", disabled: true },
];

function Controlled({
  onChange,
  initial = [],
  ...rest
}: {
  onChange?: (v: string[]) => void;
  initial?: string[];
} & Partial<ComponentProps<typeof MultiSelect>>) {
  const [value, setValue] = useState<string[]>(initial);
  return (
    <MultiSelect
      options={options}
      value={value}
      onValueChange={(v) => {
        setValue(v);
        onChange?.(v);
      }}
      {...rest}
    />
  );
}

describe("MultiSelect", () => {
  it("placeholder를 렌더한다", () => {
    render(<Controlled placeholder="과일 선택" />);
    expect(screen.getByText("과일 선택")).toBeInTheDocument();
  });

  it("combobox role과 aria-expanded를 노출한다", () => {
    render(<Controlled />);
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("트리거 클릭 시 옵션 목록(listbox)이 열린다", async () => {
    render(<Controlled />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /Apple/ })).toBeInTheDocument();
  });

  it("옵션 선택 시 onValueChange가 호출된다", async () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByRole("option", { name: /Apple/ }));
    expect(onChange).toHaveBeenCalledWith(["a"]);
  });

  it("disabled 옵션은 비활성화된다", async () => {
    render(<Controlled />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("option", { name: /Cherry/ })).toBeDisabled();
  });

  it("선택된 값을 태그로 표시하고 제거 버튼으로 해제한다", async () => {
    const onChange = vi.fn();
    render(<Controlled initial={["a"]} onChange={onChange} />);
    expect(screen.getByText("Apple")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "제거" }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("검색어로 옵션을 필터링한다", async () => {
    render(<Controlled searchPlaceholder="검색" />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.type(screen.getByLabelText("검색"), "ban");
    expect(screen.getByRole("option", { name: /Banana/ })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /Apple/ })).not.toBeInTheDocument();
  });

  it("검색 결과 없으면 empty 문구를 보인다", async () => {
    render(<Controlled searchPlaceholder="검색" emptyText="결과 없음" />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.type(screen.getByLabelText("검색"), "zzz");
    expect(screen.getByText("결과 없음")).toBeInTheDocument();
  });

  it("키보드 Enter로 드롭다운을 토글한다", async () => {
    render(<Controlled />);
    const trigger = screen.getByRole("combobox");
    trigger.focus();
    await userEvent.keyboard("{Enter}");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("showSelectAll 시 전체 선택 체크박스로 일괄 토글한다", async () => {
    const onChange = vi.fn();
    render(<Controlled showSelectAll selectAllLabel="전체" onChange={onChange} />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByRole("checkbox", { name: "전체" }));
    // 선택 가능 항목(a, b)만 일괄 선택 (disabled인 c 제외)
    expect(onChange).toHaveBeenCalledWith(["a", "b"]);
  });

  it("disabled면 트리거 클릭으로 열리지 않는다", async () => {
    render(<Controlled disabled />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
