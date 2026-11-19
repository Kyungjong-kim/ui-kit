import { useState } from "react";
import { cn } from "../../../utils/cn";

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  shape?: "circle" | "square";
  className?: string;
}

export function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  shape = "circle",
  className,
}: AvatarProps) {
  // 실패한 src 를 기억해 두면 src 가 바뀔 때 자동으로 다시 시도한다
  const [failedSrc, setFailedSrc] = useState<string>();
  const showImage = Boolean(src) && failedSrc !== src;
  const sizeClasses = {
    xs: "h-size-avatar-xs w-size-avatar-xs typography-label-xs",
    sm: "h-size-avatar-sm w-size-avatar-sm typography-label-xs",
    md: "h-size-avatar-md w-size-avatar-md typography-label-sm-base",
    lg: "h-size-avatar-lg w-size-avatar-lg typography-label-md-base",
    xl: "h-size-avatar-xl w-size-avatar-xl typography-label-lg-base",
  };

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-[var(--color-bg-brand-subtle)]",
        shape === "circle" ? "rounded-full" : "rounded-sm",
        sizeClasses[size],
        className,
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt ?? "avatar"}
          className="h-full w-full object-cover"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <span className="typography-label-md-medium text-[var(--color-text-brand-default)] select-none">
          {fallback}
        </span>
      )}
    </div>
  );
}
