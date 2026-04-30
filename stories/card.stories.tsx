import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../src/components/primitives/badge";
import { Button } from "../src/components/primitives/button";
import { Card, CardBody, CardFooter, CardHeader } from "../src/components/primitives/card";

const meta: Meta = {
  title: "Primitives/Card",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Card className="w-72">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-[var(--color-text-primary)]">카드 제목</h3>
          <Badge variant="default">New</Badge>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">카드 설명이 여기에 들어갑니다.</p>
      </CardHeader>
      <CardBody>
        <p className="text-sm text-[var(--color-text-tertiary)]">카드 본문 내용입니다.</p>
      </CardBody>
      <CardFooter className="gap-2">
        <Button size="sm" variant="secondary" className="flex-1">취소</Button>
        <Button size="sm" className="flex-1">확인</Button>
      </CardFooter>
    </Card>
  ),
};
