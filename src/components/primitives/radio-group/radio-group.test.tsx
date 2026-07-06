import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RadioGroup, RadioGroupItem } from "./radio-group";

describe("RadioGroup", () => {
  it("라디오 아이템들을 렌더한다", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" label="옵션 A" />
        <RadioGroupItem value="b" label="옵션 B" />
      </RadioGroup>,
    );
    expect(screen.getByText("옵션 A")).toBeInTheDocument();
    expect(screen.getByText("옵션 B")).toBeInTheDocument();
  });

  it("라디오 버튼 role로 렌더된다", () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="x" label="X" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radio")).toBeInTheDocument();
  });

  it("클릭 시 onValueChange가 호출된다", async () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={onValueChange}>
        <RadioGroupItem value="a" label="옵션 A" />
      </RadioGroup>,
    );
    await userEvent.click(screen.getByRole("radio"));
    expect(onValueChange).toHaveBeenCalledWith("a");
  });

  it("disabled 상태에서 클릭해도 변경되지 않는다", async () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={onValueChange} disabled>
        <RadioGroupItem value="a" label="옵션 A" />
      </RadioGroup>,
    );
    await userEvent.click(screen.getByRole("radio"));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("label 클릭으로도 선택된다", async () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={onValueChange}>
        <RadioGroupItem value="b" label="옵션 B" />
      </RadioGroup>,
    );
    await userEvent.click(screen.getByText("옵션 B"));
    expect(onValueChange).toHaveBeenCalledWith("b");
  });
});
