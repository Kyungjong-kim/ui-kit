import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  EmptyState,
  Input,
  MetricCard,
  Progress,
  Skeleton,
  Spinner,
  StatCard,
  Switch,
  Tag,
  Text,
  Textarea,
} from "@ui/index";
import type { ReactNode } from "react";
import { useState } from "react";
import { Row } from "./components/Row";

/**
 * 대표 컴포넌트 라이브 예제.
 * catalog 의 entry.example 로 참조된다.
 */
export const examples: Record<string, () => ReactNode> = {
  "design-tokens": () => {
    const swatches: Array<[string, string]> = [
      ["Primary", "var(--color-bg-brand-default)"],
      ["Success", "var(--color-bg-success-default)"],
      ["Warning", "var(--color-bg-warning-default)"],
      ["Danger", "var(--color-bg-danger-default)"],
      ["Info", "var(--color-bg-info-default)"],
      ["Surface", "var(--color-bg-secondary)"],
    ];
    const typos = [
      "typography-display-md",
      "typography-headline-lg",
      "typography-body-md-base",
      "typography-label-sm-medium",
      "typography-caption",
    ];
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap gap-4">
          {swatches.map(([label, color]) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div
                className="h-16 w-16 rounded-lg border border-[var(--color-border-default)]"
                style={{ background: color }}
              />
              <Text variant="typography-caption">{label}</Text>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {typos.map((t) => (
            // biome-ignore lint/suspicious/noExplicitAny: showcase 데모용 동적 variant
            <Text key={t} variant={t as any}>
              {t}
            </Text>
          ))}
        </div>
      </div>
    );
  },

  text: () => (
    <div className="flex flex-col gap-2">
      <Text as="h2" variant="typography-headline-lg">
        Headline Large
      </Text>
      <Text variant="typography-body-md-base">
        본문 텍스트. 다형(as) prop 으로 원하는 태그로 렌더링한다.
      </Text>
      <Text variant="typography-caption">캡션 텍스트.</Text>
    </div>
  ),

  button: () => (
    <div className="flex flex-col gap-6">
      <Row label="Variants">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </Row>
      <Row label="Sizes">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </Row>
      <Row label="States">
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </Row>
    </div>
  ),

  badge: () => (
    <Row>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
    </Row>
  ),

  tag: () => {
    const TagDemo = () => {
      const [tags, setTags] = useState(["React", "TypeScript", "Vite"]);
      return (
        <Row>
          {tags.map((t) => (
            <Tag key={t} onRemove={() => setTags((prev) => prev.filter((x) => x !== t))}>
              {t}
            </Tag>
          ))}
          {tags.length === 0 && <Text variant="typography-caption">모두 제거됨</Text>}
        </Row>
      );
    };
    return <TagDemo />;
  },

  avatar: () => (
    <Row>
      <Avatar size="xs" fallback="XS" />
      <Avatar size="sm" fallback="SM" />
      <Avatar size="md" fallback="MD" />
      <Avatar size="lg" fallback="LG" />
      <Avatar size="xl" fallback="XL" />
      <Avatar size="md" shape="square" fallback="SQ" />
    </Row>
  ),

  spinner: () => (
    <Row>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </Row>
  ),

  progress: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Progress value={30} label="30%" showValue />
      <Progress value={70} label="70%" showValue />
      <Progress label="Indeterminate" />
    </div>
  ),

  skeleton: () => (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  ),

  input: () => {
    const InputDemo = () => {
      const [value, setValue] = useState("");
      return (
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Input
            placeholder="이름을 입력하세요"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Input placeholder="비활성" disabled />
        </div>
      );
    };
    return <InputDemo />;
  },

  textarea: () => (
    <div className="w-full max-w-sm">
      <Textarea placeholder="여러 줄 텍스트를 입력하세요" rows={4} />
    </div>
  ),

  checkbox: () => {
    const CheckboxDemo = () => {
      const [checked, setChecked] = useState(true);
      return (
        <div className="flex flex-col gap-3">
          <Checkbox
            label="이용 약관에 동의합니다"
            checked={checked}
            onCheckedChange={(v) => setChecked(Boolean(v))}
          />
          <Checkbox label="비활성 체크박스" disabled />
        </div>
      );
    };
    return <CheckboxDemo />;
  },

  switch: () => {
    const SwitchDemo = () => {
      const [on, setOn] = useState(true);
      return (
        <Row>
          <Switch checked={on} onCheckedChange={setOn} />
          <Text variant="typography-body-md-base">{on ? "켜짐" : "꺼짐"}</Text>
        </Row>
      );
    };
    return <SwitchDemo />;
  },

  card: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <Text variant="typography-body-lg-bold">카드 제목</Text>
      </CardHeader>
      <CardBody>
        <Text variant="typography-body-md-base">헤더·본문·푸터 슬롯을 조합하는 컨테이너.</Text>
      </CardBody>
      <CardFooter>
        <Button size="sm" variant="secondary">
          취소
        </Button>
        <Button size="sm">확인</Button>
      </CardFooter>
    </Card>
  ),

  alert: () => (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Alert variant="info" title="안내" description="정보성 메시지입니다." />
      <Alert variant="success" title="완료" description="작업이 성공했습니다." />
      <Alert variant="warning" title="주의" description="검토가 필요합니다." />
      <Alert variant="danger" title="오류" description="문제가 발생했습니다." dismissible />
    </div>
  ),

  "empty-state": () => (
    <div className="w-full max-w-md rounded-lg border border-[var(--color-border-default)] p-8">
      <EmptyState
        title="데이터가 없습니다"
        description="새 항목을 추가해 시작하세요."
        primaryAction={{ label: "항목 추가" }}
      />
    </div>
  ),

  "metric-card": () => (
    <Row>
      <MetricCard
        label="활성 사용자"
        value="1,284"
        unit="명"
        trend={{ direction: "up", value: "12%" }}
      />
      <MetricCard
        label="에러율"
        value="0.3"
        unit="%"
        trend={{ direction: "down", value: "0.1%" }}
      />
    </Row>
  ),

  "stat-card": () => (
    <Row>
      <StatCard
        label="CPU 사용률"
        tone="success"
        statusLabel="정상"
        value={42}
        unit="%"
        delta={{ direction: "up", text: "+4" }}
        progress={42}
      />
      <StatCard
        label="메모리"
        tone="warning"
        statusLabel="주의"
        value={83}
        unit="%"
        delta={{ direction: "up", text: "+11" }}
        progress={83}
      />
    </Row>
  ),
};
