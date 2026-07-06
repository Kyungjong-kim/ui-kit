import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import type * as React from "react";
import { cn } from "../../../utils/cn";

type Size = "sm" | "md";
type Variant = "primary" | "secondary" | "tertiary";
type AxisOrientation = "horizontal" | "vertical";
type Orientation = AxisOrientation | "both";
type ScrollbarClassNames = Partial<Record<AxisOrientation, string>>;

function ScrollArea({
  className,
  children,
  viewportRef,
  onViewportScroll,
  orientation = "vertical",
  size = "md",
  variant = "tertiary",
  maxHeight,
  noPadding = false,
  scrollbarClassNames,
  ...rootProps
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  viewportRef?: React.Ref<HTMLDivElement>;
  onViewportScroll?: React.UIEventHandler<HTMLDivElement>;
  orientation?: Orientation;
  size?: Size;
  variant?: Variant;
  maxHeight?: string;
  noPadding?: boolean;
  scrollbarClassNames?: ScrollbarClassNames;
}) {
  const scrollbarGutterSize = size === "sm" ? 12 : 14;
  const paddingStyle = noPadding
    ? undefined
    : orientation === "vertical"
      ? { paddingInlineEnd: `${scrollbarGutterSize}px` }
      : orientation === "horizontal"
        ? { paddingBlockEnd: `${scrollbarGutterSize}px` }
        : {
            paddingInlineEnd: `${scrollbarGutterSize}px`,
            paddingBlockEnd: `${scrollbarGutterSize}px`,
          };
  const viewportStyle = maxHeight !== undefined ? { ...paddingStyle, maxHeight } : paddingStyle;

  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative size-full", className)}
      {...rootProps}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        onScroll={onViewportScroll}
        data-slot="scroll-area-viewport"
        style={viewportStyle}
        className="size-full [&>div]:h-full outline-none transition-[color,box-shadow]"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>

      {orientation === "both" ? (
        <>
          <ScrollBar
            size={size}
            variant={variant}
            orientation="vertical"
            className={scrollbarClassNames?.vertical}
          />
          <ScrollBar
            size={size}
            variant={variant}
            orientation="horizontal"
            className={scrollbarClassNames?.horizontal}
          />
        </>
      ) : (
        <ScrollBar
          size={size}
          variant={variant}
          orientation={orientation}
          className={scrollbarClassNames?.[orientation]}
        />
      )}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  size = "md",
  variant = "primary",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & {
  size?: Size;
  variant?: Variant;
  orientation?: AxisOrientation;
}) {
  const thickness =
    orientation === "vertical"
      ? size === "sm"
        ? "w-[12px]"
        : "w-[14px]"
      : size === "sm"
        ? "h-[12px]"
        : "h-[14px]";
  const barVariantClassName =
    variant === "primary"
      ? "bg-surface-brand-subtle"
      : variant === "secondary"
        ? "bg-surface-stronger"
        : "bg-surface-muted";

  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none transition-colors select-none",
        orientation === "vertical" && `h-full px-inline-xs ${thickness}`,
        orientation === "horizontal" && `w-full flex-col py-inline-xs ${thickness}`,
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className={cn(thickness, barVariantClassName, "relative flex-1 rounded-full")}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
