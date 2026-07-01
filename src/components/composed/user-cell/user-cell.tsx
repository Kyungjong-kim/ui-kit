import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import type { AvatarProps } from "../../primitives/avatar";
import { Avatar } from "../../primitives/avatar";
import { Text } from "../../primitives/text";

export interface UserCellProps {
  /** 사용자 이름 (주 텍스트) */
  name: string;
  /** 부가 정보 — 이메일·역할 등 (하단 회색 텍스트) */
  description?: ReactNode;
  /** 아바타 이미지 src */
  avatarSrc?: string;
  /** 아바타 이미지 대체 텍스트 (기본값: name) */
  avatarAlt?: string;
  /** 아바타 fallback 텍스트 — 미지정 시 이름 첫 글자를 사용한다 */
  avatarFallback?: string;
  /** 아바타 사이즈 */
  size?: AvatarProps["size"];
  className?: string;
}

/**
 * UserCell — 테이블 셀용 사용자 표시.
 *
 * Avatar를 재사용해 아바타 + 이름(+부가 정보)을 한 행에 배치한다.
 * fallback 텍스트 미지정 시 이름 첫 글자를 자동으로 사용한다.
 */
export function UserCell({
  name,
  description,
  avatarSrc,
  avatarAlt,
  avatarFallback,
  size = "sm",
  className,
}: UserCellProps) {
  const fallback = avatarFallback ?? name.trim().charAt(0);

  return (
    <div className={cn("flex items-center gap-group-sm min-w-0", className)}>
      <Avatar src={avatarSrc} alt={avatarAlt ?? name} fallback={fallback} size={size} />
      <div className="flex min-w-0 flex-col">
        <Text
          variant="typography-body-sm-medium"
          className="truncate text-[var(--color-text-primary)]"
        >
          {name}
        </Text>
        {description != null && description !== "" && (
          <Text variant="typography-caption" className="truncate text-[var(--color-text-tertiary)]">
            {description}
          </Text>
        )}
      </div>
    </div>
  );
}

UserCell.displayName = "UserCell";
