import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { SliderField } from "./slider-field";

function Controlled({ onChange }: { onChange?: (v: number[]) => void }) {
  const [value, setValue] = useState<number>(40);
  return (
    <SliderField
      label="볼륨"
      value={value}
      min={0}
      max={100}
      step={10}
      onChange={(v) => {
        setValue(v[0]);
        onChange?.(v);
      }}
    />
  );
}

describe("SliderField", () => {
  it("라벨과 현재 값을 표시한다", () => {
    render(<Controlled />);
    expect(screen.getByText("볼륨")).toBeInTheDocument();
    expect(screen.getByText("40")).toBeInTheDocument();
  });

  it("slider role을 노출한다", () => {
    render(<Controlled />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("키보드 조작 시 onChange가 호출된다", async () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} />);
    const slider = screen.getByRole("slider");
    slider.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenCalledWith([50]);
  });

  it("formatValue로 값 표시를 포맷한다", () => {
    render(<SliderField label="진행률" defaultValue={30} formatValue={(v) => `${v}%`} />);
    expect(screen.getByText("30%")).toBeInTheDocument();
  });

  it("showBounds 시 min/max 경계 라벨을 표시한다", () => {
    render(
      <SliderField label="범위" defaultValue={5} min={1} max={9} showBounds showValue={false} />,
    );
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
  });
});
