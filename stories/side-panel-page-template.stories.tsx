import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DateRangePicker } from "../src/components/composed/date-range-picker";
import { SectionTitle } from "../src/components/composed/section-title";
import { Button } from "../src/components/primitives/button";
import { Checkbox } from "../src/components/primitives/checkbox";
import { Input } from "../src/components/primitives/input";
import { RadioGroup, RadioGroupItem } from "../src/components/primitives/radio-group";
import { Select } from "../src/components/primitives/select";
import { SidePanelPageTemplate } from "../src/templates/side-panel-page-template";

const teamOptions = [
  { value: "all", label: "전체" },
  { value: "platform", label: "플랫폼" },
  { value: "frontend", label: "프론트엔드" },
  { value: "backend", label: "백엔드" },
];

const meta: Meta<typeof SidePanelPageTemplate> = {
  title: "Templates/SidePanelPageTemplate",
  component: SidePanelPageTemplate,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SidePanelPageTemplate>;

/**
 * 실제 "필터" 측면 패널 목업.
 * 트리거 버튼으로 열면 검색·팀 Select·기간 DateRangePicker·상태 Checkbox·
 * 정렬 RadioGroup으로 구성된 완성 필터 폼과 하단 초기화/적용 액션이 나타난다.
 */
export const FilterPanel: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-8">
        <Button onClick={() => setOpen(true)}>필터 열기</Button>
        <SidePanelPageTemplate
          open={open}
          onClose={() => setOpen(false)}
          title="필터"
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                초기화
              </Button>
              <Button onClick={() => setOpen(false)}>적용</Button>
            </>
          }
        >
          <div className="flex flex-col gap-stack-lg">
            <section className="flex flex-col gap-group-md">
              <SectionTitle title="기본" />
              <Input label="키워드" placeholder="이름·이메일 검색" />
              <Select label="팀" options={teamOptions} placeholder="팀 선택" />
            </section>

            <section className="flex flex-col gap-group-md">
              <SectionTitle title="기간" />
              <DateRangePicker />
            </section>

            <section className="flex flex-col gap-group-sm">
              <SectionTitle title="상태" />
              <Checkbox label="활성" defaultChecked />
              <Checkbox label="대기" />
              <Checkbox label="정지" />
            </section>

            <section className="flex flex-col gap-group-sm">
              <SectionTitle title="정렬" />
              <RadioGroup defaultValue="recent" orientation="vertical">
                <RadioGroupItem value="recent" label="최근 활동순" />
                <RadioGroupItem value="name" label="이름순" />
                <RadioGroupItem value="created" label="생성일순" />
              </RadioGroup>
            </section>
          </div>
        </SidePanelPageTemplate>
      </div>
    );
  },
};
