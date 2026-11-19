import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DateTimeCell } from "../components/composed/date-time-cell";
import { MultiSelect } from "../components/composed/multi-select";
import { Combobox } from "../components/primitives/combobox";
import { Pagination } from "../components/primitives/pagination";
import { Spinner } from "../components/primitives/spinner";
import { UiKitLocaleProvider } from "./locale-provider";
import { en, ko } from "./messages";

const options = [{ value: "a", label: "Apple" }];

describe("UiKitLocaleProvider", () => {
  it("Provider 가 없으면 한국어 기본 문구를 쓴다", () => {
    render(<Combobox options={options} />);
    expect(screen.getByRole("combobox")).toHaveTextContent("선택");
  });

  it("locale=en 이면 컴포넌트 기본 문구가 영어로 바뀐다", () => {
    render(
      <UiKitLocaleProvider locale="en">
        <Combobox options={options} />
        <Spinner />
      </UiKitLocaleProvider>,
    );
    expect(screen.getByRole("combobox")).toHaveTextContent("Select");
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });

  it("messages 로 사전 일부만 덮어쓰고 나머지는 locale 사전을 유지한다", () => {
    render(
      <UiKitLocaleProvider locale="en" messages={{ pagination: { previous: "Back" } }}>
        <Pagination currentPage={2} totalPages={3} onPageChange={() => {}} />
      </UiKitLocaleProvider>,
    );
    expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 2" })).toBeInTheDocument();
  });

  it("컴포넌트에 직접 넘긴 prop 이 사전보다 우선한다", () => {
    render(
      <UiKitLocaleProvider locale="en">
        <Combobox options={options} placeholder="과일" />
      </UiKitLocaleProvider>,
    );
    expect(screen.getByRole("combobox")).toHaveTextContent("과일");
  });

  it("함수형 문구(상대시간)도 사전을 따른다", () => {
    const now = new Date("2026-01-15T12:00:00");
    render(
      <UiKitLocaleProvider locale="en">
        <DateTimeCell value="2026-01-15T11:57:00" relative now={now} />
      </UiKitLocaleProvider>,
    );
    expect(screen.getByText("3m ago")).toBeInTheDocument();
  });

  it("영문만 있던 MultiSelect 기본 문구도 ko 사전으로 통일된다", () => {
    render(<MultiSelect options={options} value={[]} onValueChange={() => {}} />);
    expect(screen.getByRole("combobox")).toHaveTextContent("선택");
  });
});

describe("messages", () => {
  it("ko·en 사전이 같은 키 구조를 가진다", () => {
    const shape = (messages: object): string[] =>
      Object.entries(messages).flatMap(([section, entries]) =>
        Object.keys(entries as object).map((key) => `${section}.${key}`),
      );
    expect(shape(en).sort()).toEqual(shape(ko).sort());
    expect(en.date.months).toHaveLength(12);
    expect(ko.date.months).toHaveLength(12);
  });
});
