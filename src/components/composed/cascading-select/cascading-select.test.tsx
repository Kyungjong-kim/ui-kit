import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { type CascadingLevel, CascadingSelect } from "./cascading-select";

// jsdom은 Radix Select가 쓰는 pointer capture·scrollIntoView를 구현하지 않아 폴리필한다.
beforeAll(() => {
  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = () => false;
    Element.prototype.setPointerCapture = () => {};
    Element.prototype.releasePointerCapture = () => {};
  }
  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = () => {};
  }
});

const levels: CascadingLevel[] = [
  {
    key: "country",
    label: "국가",
    placeholder: "국가 선택",
    options: () => [
      { value: "kr", label: "대한민국" },
      { value: "jp", label: "일본" },
    ],
  },
  {
    key: "city",
    label: "도시",
    placeholder: "도시 선택",
    options: (sel) =>
      sel.country === "kr"
        ? [
            { value: "seoul", label: "서울" },
            { value: "busan", label: "부산" },
          ]
        : sel.country === "jp"
          ? [{ value: "tokyo", label: "도쿄" }]
          : [],
  },
];

function Controlled({ onChange }: { onChange?: (v: Record<string, string>) => void }) {
  const [value, setValue] = useState<Record<string, string>>({});
  return (
    <CascadingSelect
      levels={levels}
      value={value}
      onChange={(v) => {
        setValue(v);
        onChange?.(v);
      }}
    />
  );
}

describe("CascadingSelect", () => {
  it("모든 단계의 라벨을 렌더한다", () => {
    render(<Controlled />);
    expect(screen.getByText("국가")).toBeInTheDocument();
    expect(screen.getByText("도시")).toBeInTheDocument();
  });

  it("상위 단계 미선택 시 하위 단계는 비활성화된다", () => {
    render(<Controlled />);
    const triggers = screen.getAllByRole("combobox");
    expect(triggers[1]).toBeDisabled();
  });

  it("상위 선택 시 하위 단계가 활성화되고 종속 옵션이 갱신된다", async () => {
    render(<Controlled />);
    const triggers = screen.getAllByRole("combobox");
    await userEvent.click(triggers[0]);
    await userEvent.click(screen.getByRole("option", { name: "대한민국" }));
    expect(screen.getAllByRole("combobox")[1]).not.toBeDisabled();
    await userEvent.click(screen.getAllByRole("combobox")[1]);
    expect(screen.getByRole("option", { name: "서울" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "도쿄" })).not.toBeInTheDocument();
  });

  it("상위 값 변경 시 하위 선택이 초기화된다", async () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} />);
    const triggers = screen.getAllByRole("combobox");
    await userEvent.click(triggers[0]);
    await userEvent.click(screen.getByRole("option", { name: "대한민국" }));
    await userEvent.click(screen.getAllByRole("combobox")[1]);
    await userEvent.click(screen.getByRole("option", { name: "서울" }));
    expect(onChange).toHaveBeenLastCalledWith({ country: "kr", city: "seoul" });
    // 국가를 일본으로 변경 → city 제거
    await userEvent.click(screen.getAllByRole("combobox")[0]);
    await userEvent.click(screen.getByRole("option", { name: "일본" }));
    expect(onChange).toHaveBeenLastCalledWith({ country: "jp" });
  });

  it("disabled면 모든 단계가 비활성화된다", () => {
    render(<CascadingSelect levels={levels} disabled />);
    for (const t of screen.getAllByRole("combobox")) {
      expect(t).toBeDisabled();
    }
  });
});
