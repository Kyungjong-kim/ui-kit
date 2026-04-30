import { FileIcon, UploadIcon, XIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { type Accept, useDropzone } from "react-dropzone";
import { cn } from "../../../utils/cn";

export interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  accept?: Accept;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  className?: string;
}

export function FileUpload({
  onFilesChange,
  accept,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024,
  disabled,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (accepted: File[]) => {
      const next = [...files, ...accepted].slice(0, maxFiles);
      setFiles(next);
      onFilesChange(next);
    },
    [files, maxFiles, onFilesChange],
  );

  const removeFile = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onFilesChange(next);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
    disabled,
  });

  return (
    <div className={cn("space-y-2", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors cursor-pointer",
          isDragActive
            ? "border-[var(--color-border-brand-default)] bg-[var(--color-bg-brand-subtle)]"
            : "border-[var(--color-border-default)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-secondary)]",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <input {...getInputProps()} />
        <UploadIcon className="mb-3 h-8 w-8 text-[var(--color-text-tertiary)]" />
        <p className="text-sm font-medium text-[var(--color-text-primary)]">
          파일을 드래그하거나 클릭해서 업로드
        </p>
        <p className="mt-1 text-xs text-[var(--color-text-tertiary)]">
          최대 {maxFiles}개, 파일당 {Math.round(maxSize / 1024 / 1024)}MB
        </p>
      </div>
      {files.length > 0 && (
        <ul className="space-y-1.5">
          {files.map((file, i) => (
            <li
              key={file.name}
              className="flex items-center gap-2 rounded-md border border-[var(--color-border-default)] px-3 py-2"
            >
              <FileIcon className="h-4 w-4 shrink-0 text-[var(--color-text-tertiary)]" />
              <span className="flex-1 truncate text-sm text-[var(--color-text-primary)]">
                {file.name}
              </span>
              <span className="text-xs text-[var(--color-text-tertiary)]">
                {(file.size / 1024).toFixed(0)}KB
              </span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="rounded p-0.5 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)]"
              >
                <XIcon className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
