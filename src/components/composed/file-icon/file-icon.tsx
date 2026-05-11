import { Icon } from "../../primitives/icon";

export interface FileIconProps {
  fileName: string;
  className?: string;
}

export function getFileIcon(fileName: string, className?: string) {
  const ext = fileName.split(".").pop()?.toLowerCase() || "";

  if (
    ["pdf", "doc", "docx", "ppt", "pptx", "txt", "md", "rtf", "odt", "ods", "odp"].includes(ext)
  ) {
    return <Icon name="formatDocument" className={className} />;
  }

  if (
    [
      "html",
      "js",
      "css",
      "scss",
      "sass",
      "yaml",
      "yml",
      "ini",
      "toml",
      "env",
      "gitignore",
      "properties",
      "cfg",
      "conf",
      "config",
      "lock",
      "sql",
      "proto",
    ].includes(ext)
  ) {
    return <Icon name="code" className={className} />;
  }

  if (
    [
      "csv",
      "tsv",
      "xml",
      "json",
      "jsonl",
      "parquet",
      "feather",
      "arrow",
      "hdf5",
      "h5",
      "pickle",
      "pkl",
      "npy",
      "npz",
      "joblib",
      "sqlite",
      "db",
      "ipynb",
    ].includes(ext)
  ) {
    return <Icon name="formatData" className={className} />;
  }

  if (["mp3", "wav", "ogg", "mp4", "webm"].includes(ext)) {
    return <Icon name="media" className={className} />;
  }

  if (
    [
      "py",
      "pyc",
      "pyd",
      "pyx",
      "pxd",
      "pyi",
      "pth",
      "whl",
      "egg",
      "pt",
      "mlmodel",
      "onnx",
      "pb",
      "jinja2",
      "jinja",
    ].includes(ext)
  ) {
    return <Icon name="formatPython" className={className} />;
  }

  if (["ttf"].includes(ext)) {
    return <Icon name="font" className={className} />;
  }

  return <Icon name="file" className={className} />;
}

export function FileIcon({ fileName, className }: FileIconProps) {
  return getFileIcon(fileName, className);
}

FileIcon.displayName = "FileIcon";
