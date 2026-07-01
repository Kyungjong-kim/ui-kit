import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { PeriodFilterDropdown, type PeriodValue } from "./period-filter-dropdown";

function Controlled({ onChange }: { onChange?: (v: PeriodValue) => void }) {
  const [value, setValue] = useState<PeriodValue>({ preset: "today" });
  return (
    <PeriodFilterDropdown
      value={value}
      onChange={(v) => {
        setValue(v);
        onChange?.(v);
      }}
    />
  );
}

describe("PeriodFilterDropdown", () => {
  it("현재 프리셋 요약을 트리거에 표시한다", () => {
    render(<Controlled />);
    expect(screen.getByRole("button", { name: /오늘/ })).toBeInTheDocument();
  });

  it("트리거 클릭 시 프리셋 목록이 열린다", async () => {
    render(<Controlled />);
    await userEvent.click(screen.getByRole("button", { name: /오늘/ }));
    expect(screen.getByRole("button", { name: "최근 7일" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "최근 30일" })).toBeInTheDocument();
  });

  it("프리셋 선택 시 onChange가 호출되고 팝오버가 닫힌다", async () => {
    const onChange = vi.fn();
    render(<Controlled onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: /오늘/ }));
    await userEvent.click(screen.getByRole("button", { name: "최근 30일" }));
    expect(onChange).toHaveBeenCalledWith({ preset: "last30" });
    expect(screen.queryByRole("button", { name: "최근 7일" })).not.toBeInTheDocument();
  });

  it("사용자 지정 선택 시 시작·종료일 입력이 나타난다", async () => {
    render(<Controlled />);
    await userEvent.click(screen.getByRole("button", { name: /오늘/ }));
    await userEvent.click(screen.getByRole("button", { name: "사용자 지정" }));
    expect(screen.getByText("시작일")).toBeInTheDocument();
    expect(screen.getByText("종료일")).toBeInTheDocument();
  });

  it("disabled면 클릭해도 열리지 않는다", async () => {
    render(<PeriodFilterDropdown disabled defaultValue={{ preset: "today" }} />);
    await userEvent.click(screen.getByRole("button", { name: /오늘/ }));
    expect(screen.queryByRole("button", { name: "최근 7일" })).not.toBeInTheDocument();
  });
});
