import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelect } from "../src/components/composed/multi-select";
import { Combobox } from "../src/components/primitives/combobox";
import { Pagination } from "../src/components/primitives/pagination";
import { type UiKitLocale, UiKitLocaleProvider } from "../src/locale";

interface DemoProps {
  locale: UiKitLocale;
}

function Demo({ locale }: DemoProps) {
  const options = [
    { value: "a", label: "Apple" },
    { value: "b", label: "Banana" },
  ];
  return (
    <UiKitLocaleProvider locale={locale}>
      <div className="flex w-[360px] flex-col gap-group-lg">
        <Combobox options={options} />
        <MultiSelect options={options} value={[]} onValueChange={() => {}} showSelectAll />
        <Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />
      </div>
    </UiKitLocaleProvider>
  );
}

const meta: Meta<typeof Demo> = {
  title: "Foundations/Locale",
  component: Demo,
  parameters: { layout: "centered" },
  argTypes: { locale: { control: "inline-radio", options: ["ko", "en"] } },
  args: { locale: "ko" },
};

export default meta;
type Story = StoryObj<typeof Demo>;

export const Korean: Story = { args: { locale: "ko" } };
export const English: Story = { args: { locale: "en" } };
