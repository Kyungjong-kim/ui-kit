import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";

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
});
