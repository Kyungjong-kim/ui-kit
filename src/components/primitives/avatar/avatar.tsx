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
      {src ? (
        <img
          src={src}
          alt={alt ?? "avatar"}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <span className="typography-label-md-medium text-[var(--color-text-brand-default)] select-none">
          {fallback}
        </span>
      )}
    </div>
  );
}
