import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type InputHTMLAttributes,
} from "react";
import { cn } from "@sia-ui/utils";
import { useSiaLocale } from "@sia-ui/headless";
import {
  captureFileDrop,
  readUploadEntries,
  FileUploadReadError,
  type FileDropSource,
  type FileUploadEntry,
  type FileUploadLimits,
} from "./files";
import "./styles.css";
export type { FileUploadReadError } from "./files";
export type {
  FileUploadEntry,
  FileUploadErrorCode,
  FileUploadLimits,
} from "./files";

export interface FileUploadProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange">,
    FileUploadLimits {
  /** Titre de la zone, traduit et adapté au mode dossier par défaut. */
  label?: string;
  description?: string;
  browseLabel?: string;
  /** Sélection de dossier et parcours des dossiers déposés. */
  directory?: boolean;
  onFilesChange?: (files: File[]) => void;
  /** Fichiers et chemins relatifs, dossier racine compris, sélection et dépôt confondus. */
  onEntriesChange?: (entries: FileUploadEntry[]) => void;
  /** Lecture refusée : aucune sélection partielle n'est émise. */
  onReadError?: (error: FileUploadReadError) => void;
}
/** Sélection ou dépôt de fichiers et de dossiers, sans envoi réseau automatique. */
export function FileUpload({
  label: labelProp,
  description: descriptionProp,
  browseLabel: browseLabelProp,
  onFilesChange,
  onEntriesChange,
  onReadError,
  directory = false,
  maxFiles,
  maxFileSize,
  maxTotalSize,
  maxDepth,
  className,
  multiple = true,
  accept,
  disabled,
  "aria-describedby": describedBy,
  ...props
}: FileUploadProps) {
  const messages = useSiaLocale().fileUpload;
  const label =
    labelProp ?? (directory ? messages.directoryTitle : messages.title);
  const description =
    descriptionProp ??
    (directory ? messages.directoryDescription : messages.description);
  const browseLabel =
    browseLabelProp ?? (directory ? messages.directoryBrowse : messages.browse);
  const inputRef = useRef<HTMLInputElement>(null);
  const controller = useRef<AbortController | null>(null);
  const [reading, setReading] = useState(false);
  const [error, setError] = useState<FileUploadReadError | null>(null);
  const statusId = useId();
  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => {
    if (disabled) {
      controller.current?.abort();
      setReading(false);
    }
  }, [disabled]);
  const read = async (source: File[] | FileDropSource) => {
    controller.current?.abort();
    const job = new AbortController();
    controller.current = job;
    setReading(true);
    setError(null);
    try {
      const entries = await readUploadEntries(source, {
        directory,
        signal: job.signal,
        ...(maxFiles !== undefined ? { maxFiles } : {}),
        ...(maxFileSize !== undefined ? { maxFileSize } : {}),
        ...(maxTotalSize !== undefined ? { maxTotalSize } : {}),
        ...(maxDepth !== undefined ? { maxDepth } : {}),
      });
      if (job.signal.aborted) return;
      if (!directory && !multiple && entries.length > 1)
        throw new FileUploadReadError("max-files");
      onEntriesChange?.(entries);
      onFilesChange?.(entries.map((entry) => entry.file));
    } catch (cause) {
      if (job.signal.aborted) return;
      const failure =
        cause instanceof FileUploadReadError
          ? cause
          : new FileUploadReadError("read-error");
      setError(failure);
      onReadError?.(failure);
    } finally {
      if (controller.current === job) {
        controller.current = null;
        setReading(false);
      }
    }
  };
  const drop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!disabled) void read(captureFileDrop(event.dataTransfer));
  };
  const change = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = ""; // Permet de choisir à nouveau le même dossier.
    if (!disabled && files.length) void read(files);
  };
  return (
    <div
      className={cn(
        "sia-file-upload",
        disabled && "sia-file-upload--disabled",
        className,
      )}
      onDragOver={(event) => event.preventDefault()}
      onDrop={drop}
      aria-busy={reading || undefined}
    >
      <input
        {...props}
        {...(directory ? { webkitdirectory: "" } : {})}
        ref={inputRef}
        hidden
        type="file"
        accept={accept}
        multiple={directory || multiple}
        disabled={disabled}
        onChange={change}
        aria-describedby={[describedBy, statusId].filter(Boolean).join(" ")}
      />
      <strong>{label}</strong>
      <span>{description}</span>
      <button
        type="button"
        disabled={disabled || reading}
        onClick={() => inputRef.current?.click()}
        aria-describedby={statusId}
      >
        {browseLabel}
      </button>
      <span id={statusId} role="status" aria-live="polite">
        {reading ? messages.reading : error ? messages.errors[error.code] : ""}
      </span>
      {reading && (
        <button
          type="button"
          onClick={() => {
            controller.current?.abort();
            controller.current = null;
            setReading(false);
          }}
        >
          {messages.cancel}
        </button>
      )}
    </div>
  );
}
