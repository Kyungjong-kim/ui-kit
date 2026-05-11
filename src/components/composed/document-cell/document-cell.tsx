import type { MouseEvent } from "react";
import { cn } from "../../../utils/cn";
import { Spinner } from "../../primitives/spinner";
import { Text } from "../../primitives/text";
import { FileIcon } from "../file-icon";
import type { IconButtonProps } from "../icon-button";
import { IconButton } from "../icon-button";

export type DocumentFile = {
  id: string;
  name: string;
};

export interface DocumentCellProps {
  file: DocumentFile;
  isLoading?: boolean;
  onRemove?: (id: string) => void;
  disabled?: boolean;
  iconButton?: Omit<IconButtonProps, "icon"> & { icon?: IconButtonProps["icon"] };
}

export function DocumentCell({
  file,
  isLoading = false,
  onRemove,
  iconButton,
  disabled,
}: DocumentCellProps) {
  const getFileExtension = (filename: string) => filename.split(".").pop()?.toUpperCase() ?? "";

  return (
    <div
      className={cn(
        "relative flex w-[240px] overflow-hidden items-start py-stack-sm px-inline-sm rounded-md ds-border-default border-border-default",
        disabled ? "bg-surface-subtle" : "bg-surface-default",
      )}
    >
      <div className="flex items-center gap-group-sm flex-1 min-w-0">
        <div
          className={cn(
            "relative flex shrink-0 items-center justify-center overflow-hidden rounded-sm w-[52px] h-[52px]",
            disabled ? "bg-surface-subtle" : "bg-surface-muted",
          )}
        >
          <FileIcon fileName={file.name} className={disabled ? "opacity-50" : ""} />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-overlay-medium-bg rounded-sm">
              <Spinner size="sm" className="border-white border-t-white" />
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-row items-center">
          <div className="flex min-w-0 flex-1 flex-col pr-inline-xs">
            <Text
              variant="typography-body-md-bold"
              className={cn(
                "block h-[20px] w-full overflow-hidden text-ellipsis whitespace-nowrap leading-[20px]",
                disabled ? "text-text-disabled" : "text-text-primary",
              )}
            >
              {file.name}
            </Text>
            <Text
              variant="typography-caption"
              className={cn(disabled ? "text-text-disabled" : "text-text-tertiary")}
            >
              {getFileExtension(file.name)}
            </Text>
          </div>
          {iconButton && (
            <IconButton
              icon="file"
              size="sm"
              variant="secondary"
              appearance="ghost"
              shape="square"
              {...iconButton}
              disabled={disabled || iconButton.disabled}
            />
          )}
        </div>
      </div>
      {onRemove && (
        <IconButton
          icon="x"
          size="xs"
          variant="secondary"
          shape="circle"
          aria-label="파일 삭제"
          color="inverse"
          disabled={disabled}
          className="right-[2px] top-[2px]"
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onRemove(file.id);
          }}
        />
      )}
    </div>
  );
}

DocumentCell.displayName = "DocumentCell";
