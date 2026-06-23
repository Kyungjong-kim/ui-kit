import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ComponentProps, useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { TagInput } from "./tag-input";

function Controlled({
  onChange,
  initial = [],
  ...rest
}: {
  onChange?: (v: string[]) => void;
  initial?: string[];
} & Partial<ComponentProps<typeof TagInput>>) {
  const [value, setValue] = useState<string[]>(initial);
  return (
    <TagInput
      value={value}
      onChange={(v) => {
        setValue(v);
        onChange?.(v);
      }}
      {...rest}
    />
  );
}

describe("TagInput", () => {
  it("placeholder를 렌더한다", () => {
    render(<Controlled placeholder="태그 입력" />);
    expect(screen.getByPlaceholderText("태그 입력")).toBeInTheDocument();
  });

  it("Enter로 태그를 추가한다", async () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} />);
    await userEvent.type(screen.getByRole("textbox"), "react{Enter}");
    expect(onChange).toHaveBeenCalledWith(["react"]);
  });

  it("+ 버튼으로 태그를 추가한다", async () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} addButtonLabel="추가" />);
    await userEvent.type(screen.getByRole("textbox"), "vue");
    await userEvent.click(screen.getByRole("button", { name: "추가" }));
    expect(onChange).toHaveBeenCalledWith(["vue"]);
  });

  it("공백만 입력하면 추가하지 않는다", async () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} />);
    await userEvent.type(screen.getByRole("textbox"), "   {Enter}");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("중복 태그는 추가하지 않고 에러를 보인다", async () => {
    const onChange = vi.fn();
    render(<Controlled initial={["react"]} onChange={onChange} duplicateError="이미 있음" />);
    await userEvent.type(screen.getByRole("textbox"), "react{Enter}");
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByText("이미 있음")).toBeInTheDocument();
  });

  it("기존 태그를 제거 버튼으로 삭제한다", async () => {
    const onChange = vi.fn();
    render(<Controlled initial={["react", "vue"]} onChange={onChange} />);
    const removeButtons = screen.getAllByRole("button", { name: "제거" });
    await userEvent.click(removeButtons[0]);
    expect(onChange).toHaveBeenCalledWith(["vue"]);
  });

  it("maxLength 초과 입력은 차단하고 에러를 보인다", async () => {
    render(<Controlled maxLength={3} maxLengthError="3자 이내" />);
    await userEvent.type(screen.getByRole("textbox"), "abcd");
    expect(screen.getByText("3자 이내")).toBeInTheDocument();
  });

  it("pattern 위반 문자는 차단하고 에러를 보인다", async () => {
    render(<Controlled pattern={/^[\w-]*$/} patternError="허용 안 됨" />);
    await userEvent.type(screen.getByRole("textbox"), "a!");
    expect(screen.getByText("허용 안 됨")).toBeInTheDocument();
  });

  it("maxTags 도달 시 입력을 비활성화한다", () => {
    render(<Controlled initial={["a", "b"]} maxTags={2} />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("Clear all 클릭 시 모든 태그를 제거한다", async () => {
    const onChange = vi.fn();
    render(
      <Controlled
        initial={["a", "b"]}
        onChange={onChange}
        clearAllLabel={(n) => `전체 삭제 (${n})`}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "전체 삭제 (2)" }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("disabled면 입력이 비활성화된다", () => {
    render(<Controlled disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});
