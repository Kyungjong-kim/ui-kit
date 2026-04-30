import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Select } from "./select";

const options = [
  { value: "apple", label: "사과" },
  { value: "banana", label: "바나나" },
  { value: "orange", label: "오렌지" },
];

describe("Select", () => {
  it("placeholder를 렌더한다", () => {
    render(<Select options={options} placeholder="선택해주세요" />);
    expect(screen.getByText("선택해주세요")).toBeInTheDocument();
  });

  it("label을 렌더한다", () => {
    render(<Select options={options} label="과일" />);
    expect(screen.getByText("과일")).toBeInTheDocument();
  });

  it("disabled 상태가 적용된다", () => {
    render(<Select options={options} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });
});
