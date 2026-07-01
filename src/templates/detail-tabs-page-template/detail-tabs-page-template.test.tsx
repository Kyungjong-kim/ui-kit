import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { DetailTabsPageTemplate } from "./detail-tabs-page-template";

const tabs = [
  { label: "개요", value: "overview", content: <div>개요 콘텐츠</div> },
  { label: "설정", value: "settings", content: <div>설정 콘텐츠</div> },
];

describe("DetailTabsPageTemplate", () => {
  it("제목과 탭 라벨을 렌더한다", () => {
    render(<DetailTabsPageTemplate title="리소스 상세" tabs={tabs} />);
    expect(screen.getByText("리소스 상세")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "개요" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "설정" })).toBeInTheDocument();
  });

  it("첫 번째 탭 콘텐츠를 기본으로 렌더한다", () => {
    render(<DetailTabsPageTemplate title="상세" tabs={tabs} />);
    expect(screen.getByText("개요 콘텐츠")).toBeInTheDocument();
  });

  it("탭 클릭 시 해당 콘텐츠로 전환된다", async () => {
    render(<DetailTabsPageTemplate title="상세" tabs={tabs} />);
    await userEvent.click(screen.getByRole("tab", { name: "설정" }));
    expect(screen.getByText("설정 콘텐츠")).toBeInTheDocument();
  });

  it("defaultTab이 지정되면 해당 탭을 활성화한다", () => {
    render(<DetailTabsPageTemplate title="상세" tabs={tabs} defaultTab="settings" />);
    expect(screen.getByText("설정 콘텐츠")).toBeInTheDocument();
  });

  it("headerActions 슬롯을 렌더한다", () => {
    render(
      <DetailTabsPageTemplate
        title="상세"
        tabs={tabs}
        headerActions={<button type="button">편집</button>}
      />,
    );
    expect(screen.getByRole("button", { name: "편집" })).toBeInTheDocument();
  });
});
