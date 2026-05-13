import type { MouseEvent } from "react";
import { useState } from "react";
import { cn } from "../../../utils/cn";
import { Skeleton } from "../../primitives/skeleton";
import { Spinner } from "../../primitives/spinner";
import { Thumbnail } from "../../primitives/thumbnail";
import { IconButton } from "../icon-button";

export type ImageFile = {
  id: string;
  src: string;
  alt: string;
};

export interface ImageCellProps {
  image: ImageFile;
  size: "sm" | "lg" | "xlg";
  isLoading?: boolean;
  loadingType?: "spinner" | "skeleton";
  selected?: boolean;
  onChange?: (selected: boolean) => void;
  className?: string;
  onRemove?: (id: string) => void;
  onClick?: (file: ImageFile) => void;
}

const sizeClassMap: Record<"sm" | "lg" | "xlg", string> = {
  sm: "w-size-image-sm h-size-image-sm",
  lg: "w-size-image-lg h-size-image-lg",
  xlg: "w-size-image-xxl h-size-image-xxl",
};

const roundedClassMap: Record<"sm" | "lg" | "xlg", string> = {
  sm: "rounded-sm",
  lg: "rounded-md",
  xlg: "rounded-lg",
};

export function ImageCell({
  image,
  size = "sm",
  isLoading = false,
  loadingType = "spinner",
  selected,
  onChange,
  onClick,
  onRemove,
  className,
}: ImageCellProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [internalSelected, setInternalSelected] = useState(false);

  const shouldShowOverlay = loadingType === "spinner" && (isHovered || isLoading);
  const isControlled = selected !== undefined;
  const isSelected = isControlled ? selected : internalSelected;
  const isSelectionEnabled = selected !== undefined || onChange !== undefined;

  return (
    <div
      className={cn(
        "relative",
        roundedClassMap[size],
        sizeClassMap[size],
        "bg-[var(--color-bg-primary)]",
        "focus:outline-none focus-visible:outline-none focus-visible:ring-0",
        isSelected
          ? "border-[var(--color-border-brand-default)]"
          : "border-[var(--color-border-default)]",
        size === "xlg" ? "border-2" : "border",
      )}
    >
      <button
        type="button"
        className={cn(
          "relative flex h-full w-full items-center justify-center overflow-hidden",
          roundedClassMap[size],
          className,
        )}
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          onClick?.(image);
          if (!isSelectionEnabled) return;
          if (e.defaultPrevented) return;
          const nextSelected = !isSelected;
          if (!isControlled) setInternalSelected(nextSelected);
          onChange?.(nextSelected);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isLoading && loadingType === "skeleton" ? (
          <Skeleton className="absolute inset-0" rounded="none" />
        ) : (
          <Thumbnail src={image.src} alt={image.alt} className="w-full h-full" />
        )}

        {shouldShowOverlay && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            {isLoading && loadingType === "spinner" && (
              <Spinner size={size === "sm" ? "sm" : "lg"} className="border-white border-t-white" />
            )}
          </div>
        )}
      </button>

      {onRemove && !(isLoading && loadingType === "skeleton") && (
        <IconButton
          icon="x"
          size={size === "sm" ? "xs" : "sm"}
          variant="secondary"
          shape="circle"
          aria-label="파일 삭제"
          color="inverse"
          className="z-10"
          style={{ position: "absolute", top: "-5px", right: "-5px" }}
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onRemove(image.id);
          }}
        />
      )}
    </div>
  );
}

ImageCell.displayName = "ImageCell";
