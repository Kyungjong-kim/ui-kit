import type { Meta, StoryObj } from "@storybook/react";
import { LinkButton } from "../src/components/primitives/link-button";

const meta: Meta<typeof LinkButton> = {
  title: "Primitives/LinkButton",
  component: LinkButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LinkButton>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <LinkButton href="#" variant="primary">
        Primary
      </LinkButton>
      <LinkButton href="#" variant="secondary">
        Secondary
      </LinkButton>
      <LinkButton href="#" variant="tertiary">
        Tertiary
      </LinkButton>
      <LinkButton href="#" variant="danger">
        Danger
      </LinkButton>
      <div className="bg-gray-800 p-2 rounded">
        <LinkButton href="#" variant="light">
          Light (어두운 배경)
        </LinkButton>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <LinkButton href="#" disabled>
      비활성 링크
    </LinkButton>
  ),
};
