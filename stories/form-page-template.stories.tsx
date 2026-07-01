import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "../src/components/composed/date-picker";
import { SectionTitle } from "../src/components/composed/section-title";
import { Checkbox } from "../src/components/primitives/checkbox";
import { Input } from "../src/components/primitives/input";
import { RadioGroup, RadioGroupItem } from "../src/components/primitives/radio-group";
import { Select } from "../src/components/primitives/select";
import { Textarea } from "../src/components/primitives/textarea";
import { FormPageTemplate } from "../src/templates/form-page-template";

const teamOptions = [
  { value: "platform", label: "플랫폼" },
  { value: "frontend", label: "프론트엔드" },
  { value: "backend", label: "백엔드" },
  { value: "design", label: "디자인" },
];

const timezoneOptions = [
  { value: "kst", label: "(GMT+9) 서울" },
  { value: "utc", label: "(GMT+0) UTC" },
  { value: "pst", label: "(GMT-8) 로스앤젤레스" },
];

/**
 * 여러 필드 섹션으로 구성된 실제 "프로젝트 생성" 폼 화면.
 * 기본 정보(Input·Select·Textarea) + 일정(DatePicker·RadioGroup) +
 * 알림 설정(Checkbox) 3개 섹션을 SectionTitle로 구분한 완성 폼이다.
 */
const FormBody = (
  <>
    <section className="flex flex-col gap-stack-xl">
      <SectionTitle title="기본 정보" description="프로젝트를 식별하는 필수 정보입니다." />
      <Input label="프로젝트 이름" placeholder="예: 2026 리브랜딩" />
      <Select label="담당 팀" options={teamOptions} placeholder="팀을 선택하세요" />
      <Textarea label="설명" placeholder="프로젝트 목표와 범위를 입력하세요." />
    </section>

    <section className="flex flex-col gap-stack-xl">
      <SectionTitle title="일정" description="프로젝트 기간과 우선순위를 설정합니다." />
      <div className="flex flex-col gap-group-xs">
        <span className="typography-label-md-medium text-[var(--color-text-primary)]">시작일</span>
        <DatePicker />
      </div>
      <div className="flex flex-col gap-group-xs">
        <span className="typography-label-md-medium text-[var(--color-text-primary)]">
          우선순위
        </span>
        <RadioGroup defaultValue="normal" orientation="horizontal">
          <RadioGroupItem value="low" label="낮음" />
          <RadioGroupItem value="normal" label="보통" />
          <RadioGroupItem value="high" label="높음" />
        </RadioGroup>
      </div>
      <Select label="타임존" options={timezoneOptions} placeholder="타임존을 선택하세요" />
    </section>

    <section className="flex flex-col gap-stack-xl">
      <SectionTitle title="알림 설정" description="이벤트 발생 시 받을 알림을 선택합니다." />
      <Checkbox label="상태 변경 시 이메일 알림" defaultChecked />
      <Checkbox label="댓글이 달리면 알림" />
      <Checkbox label="주간 요약 리포트 수신" defaultChecked />
    </section>
  </>
);

const meta: Meta<typeof FormPageTemplate> = {
  title: "Templates/FormPageTemplate",
  component: FormPageTemplate,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormPageTemplate>;

export const ProjectCreatePage: Story = {
  args: {
    title: "프로젝트 생성",
    description: "새 프로젝트의 기본 정보를 입력하세요.",
    submitLabel: "프로젝트 생성",
    cancelLabel: "취소",
    onSubmit: (e) => e.preventDefault(),
    onCancel: () => {},
    children: FormBody,
  },
};

/** 저장 진행 중 — 액션 버튼이 로딩·비활성 상태인 화면. */
export const Submitting: Story = {
  args: {
    title: "프로젝트 생성",
    description: "저장 중입니다.",
    isSubmitting: true,
    onSubmit: (e) => e.preventDefault(),
    onCancel: () => {},
    children: FormBody,
  },
};
