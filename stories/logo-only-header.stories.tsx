import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { LogoOnlyHeader } from "../src/components/composed/logo-only-header";

const meta: Meta<typeof LogoOnlyHeader> = {
  title: "Composed/LogoOnlyHeader",
  component: LogoOnlyHeader,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LogoOnlyHeader>;

export const Default: Story = {
  args: { logoIcon: "globe" },
};

export const WithClick: Story = {
  render: () => {
    const [count, setCount] = useState(0);
    return (
      <div>
        <LogoOnlyHeader logoIcon="globe" onClick={() => setCount((c) => c + 1)} />
        <p className="px-6 pt-4 text-sm text-[var(--color-text-secondary)]">
          로고 클릭 횟수: <strong>{count}</strong>
        </p>
      </div>
    );
  },
};
