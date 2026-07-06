import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "../src/components/primitives/text";

const meta: Meta<typeof Text> = {
  title: "Foundations/Typography/Text",
  component: Text,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text variant="typography-display-md">Display MD</Text>
      <Text variant="typography-headline-lg">Headline LG</Text>
      <Text variant="typography-body-lg-bold">Body LG Bold</Text>
      <Text variant="typography-body-md-base">Body MD Base</Text>
      <Text variant="typography-label-sm-base">Label SM Base</Text>
      <Text variant="typography-caption">Caption</Text>
      <Text variant="typography-code">Code</Text>
    </div>
  ),
};

export const Polymorphic: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text as="h1" variant="typography-headline-xl">
        h1 태그
      </Text>
      <Text as="p" variant="typography-body-lg-base">
        p 태그
      </Text>
      <Text as="span" variant="typography-label-md-base">
        span 태그 (기본)
      </Text>
    </div>
  ),
};

export const Align: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-64">
      <Text align="left" fullWidth>
        왼쪽 정렬
      </Text>
      <Text align="center" fullWidth>
        가운데 정렬
      </Text>
      <Text align="right" fullWidth>
        오른쪽 정렬
      </Text>
    </div>
  ),
};
