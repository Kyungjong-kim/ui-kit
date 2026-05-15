import { AlertCircleIcon, FileIcon, UploadIcon, XIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { type Accept, type FileRejection, useDropzone } from "react-dropzone";
import { cn } from "../../../utils/cn";

export interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  accept?: Accept;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  className?: string;
}

function getRejectionMessage(code: string, fileName: string): string {
  if (code === "file-too-large") return `${fileName}: 파일 크기 초과`;
  if (code === "file-invalid-type") return `${fileName}: 지원하지 않는 형식`;
  if (code === "too-many-files") return "파일 개수 초과";
  return `${fileName}: 업로드 실패`;
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
  const [errors, setErrors] = useState<string[]>([]);

  const onDrop = useCallback(
    (accepted: File[], rejected: FileRejection[]) => {
      // 중복 파일 제거 (이름 + 크기 기준)
      const deduped = accepted.filter(
        (f) => !files.some((existing) => existing.name === f.name && existing.size === f.size),
      );
      const next = [...files, ...deduped].slice(0, maxFiles);
      setFiles(next);
      onFilesChange(next);

      // 거부된 파일 에러 수집
      const newErrors: string[] = [];
      const seen = new Set<string>();
      for (const { file, errors: fileErrors } of rejected) {
        for (const e of fileErrors) {
          const msg = getRejectionMessage(e.code, file.name);
          if (!seen.has(msg)) {
            seen.add(msg);
            newErrors.push(msg);
          }
        }
      }
      setErrors(newErrors);
    },
    [files, maxFiles, onFilesChange],
  );

  const removeFile = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onFilesChange(next);
    setErrors([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
    disabled,
  });

  return (
    <div className={cn("flex flex-col gap-group-sm", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center rounded-md border-2 border-dashed p-inline-xxl transition-colors cursor-pointer",
          isDragActive
            ? "border-[var(--color-border-brand-default)] bg-[var(--color-bg-brand-subtle)]"
            : "border-[var(--color-border-default)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-secondary)]",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <input {...getInputProps()} />
        <UploadIcon
          className="mb-stack-sm h-size-icon-lg w-size-icon-lg text-[var(--color-text-tertiary)]"
          aria-hidden="true"
        />
        <p className="typography-label-md-medium text-[var(--color-text-primary)]">
          파일을 드래그하거나 클릭해서 업로드
        </p>
        <p className="mt-stack-xxs typography-caption text-[var(--color-text-tertiary)]">
          최대 {maxFiles}개, 파일당 {Math.round(maxSize / 1024 / 1024)}MB
        </p>
      </div>

      {errors.length > 0 && (
        <ul className="flex flex-col gap-group-xxs" role="alert" aria-live="polite">
          {errors.map((err) => (
            <li
              key={err}
              className="flex items-center gap-group-xs rounded-xs border border-[var(--color-border-danger-default)] bg-[var(--color-bg-danger-subtle)] px-inline-md py-stack-xs typography-caption text-[var(--color-text-danger-default)]"
            >
              <AlertCircleIcon className="h-size-icon-xs w-size-icon-xs shrink-0" aria-hidden="true" />
              {err}
            </li>
          ))}
        </ul>
      )}

      {files.length > 0 && (
        <ul className="flex flex-col gap-group-xs">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${file.size}`}
              className="flex items-center gap-group-sm rounded-sm border border-[var(--color-border-default)] px-inline-md py-stack-xs"
            >
              <FileIcon
                className="h-size-icon-sm w-size-icon-sm shrink-0 text-[var(--color-text-tertiary)]"
                aria-hidden="true"
              />
              <span className="flex-1 truncate typography-label-md-base text-[var(--color-text-primary)]">
                {file.name}
              </span>
              <span className="typography-caption text-[var(--color-text-tertiary)]">
                {(file.size / 1024).toFixed(0)}KB
              </span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                aria-label={`${file.name} 제거`}
                className="rounded-xxs p-stack-xxs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--color-border-focus)] transition-colors"
              >
                <XIcon className="h-size-icon-xs w-size-icon-xs" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
