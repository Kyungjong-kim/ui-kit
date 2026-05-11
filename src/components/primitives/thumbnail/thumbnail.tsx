import { cn } from "../../../utils/cn";

export type ThumbnailRatio = "1:1" | "16:9";

export interface ThumbnailProps {
  src?: string;
  alt?: string;
  ratio?: ThumbnailRatio;
  className?: string;
}

const ratioClassMap: Record<ThumbnailRatio, string> = {
  "1:1": "aspect-square",
  "16:9": "aspect-[16/9]",
};

export function Thumbnail({ src, alt = "", ratio = "1:1", className }: ThumbnailProps) {
  const hasSrc = !!src?.trim();

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[var(--color-neutral-200)]",
        ratioClassMap[ratio],
        className,
      )}
    >
      {hasSrc && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      )}
    </div>
  );
}
