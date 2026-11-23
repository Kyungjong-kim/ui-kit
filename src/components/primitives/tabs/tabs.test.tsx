import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

describe("Tabs", () => {
  const setup = () =>
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">탭 1</TabsTrigger>
          <TabsTrigger value="tab2">탭 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">내용 1</TabsContent>
        <TabsContent value="tab2">내용 2</TabsContent>
      </Tabs>,
    );

  it("기본 탭 내용이 렌더된다", () => {
    setup();
    expect(screen.getByText("내용 1")).toBeInTheDocument();
  });

  it("다른 탭 클릭 시 해당 내용이 표시된다", async () => {
    setup();
    await userEvent.click(screen.getByText("탭 2"));
    expect(screen.getByText("내용 2")).toBeInTheDocument();
  });

  it("밑줄형: 목록 아래 hairline, 활성 탭은 브랜드 밑줄 (SegmentedControl 과 구분)", () => {
    setup();
    expect(screen.getByRole("tablist").className).toMatch(/border-b/);
    const active = screen.getByRole("tab", { name: "탭 1" });
    expect(active.className).toMatch(/border-b-2/);
    expect(active.className).toMatch(
      /data-\[state=active\]:border-\[var\(--color-border-brand-default\)\]/,
    );
    expect(active.className).not.toMatch(/shadow/);
    expect(screen.getByRole("tablist").className).not.toMatch(/bg-\[var\(--color-bg-tertiary\)\]/);
  });
});
