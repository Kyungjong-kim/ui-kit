import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IconTab, IconTabs } from "./icon-tabs";

describe("IconTabs", () => {
  it("탭이 렌더된다", () => {
    render(
      <IconTabs defaultValue="tab1">
        <IconTab value="tab1" icon="code" label="코드" />
        <IconTab value="tab2" icon="file" label="파일" />
      </IconTabs>,
    );
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });

  it("aria-label이 탭에 적용된다", () => {
    render(
      <IconTabs defaultValue="tab1">
        <IconTab value="tab1" icon="code" label="코드" />
      </IconTabs>,
    );
    expect(screen.getByRole("tab", { name: "코드" })).toBeInTheDocument();
  });

  it("defaultValue 탭이 선택된다", () => {
    render(
      <IconTabs defaultValue="tab1">
        <IconTab value="tab1" icon="code" label="코드" />
        <IconTab value="tab2" icon="file" label="파일" />
      </IconTabs>,
    );
    expect(screen.getByRole("tab", { name: "코드" })).toHaveAttribute("aria-selected", "true");
  });
});
