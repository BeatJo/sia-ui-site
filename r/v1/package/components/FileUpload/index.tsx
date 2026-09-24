import {
  useRef,
  type ChangeEvent,
  type DragEvent,
  type InputHTMLAttributes,
} from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";

export interface FileUploadProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> {
  label?: string;
  description?: string;
  onFilesChange?: (files: File[]) => void;
}
/**
 * Un dépôt de fichiers, par clic ou par glisser.
 *
 * Le glisser-déposer seul exclut le clavier et le tactile; le bouton seul
 * ignore le geste que tout le monde essaie d'abord. Les deux mènent au même
 * champ natif.
 */
export function FileUpload({
  label = "Ajouter des fichiers",
  description = "Glissez les fichiers ici ou parcourez votre appareil.",
  onFilesChange,
  className,
  multiple = true,
  accept,
  disabled,
  ...props
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const emit = (files: FileList | null) =>
    onFilesChange?.(Array.from(files ?? []));
  const drop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!disabled) emit(event.dataTransfer.files);
  };
  const change = (event: ChangeEvent<HTMLInputElement>) =>
    emit(event.target.files);
  return (
    <div
      className={cn(
        "sia-file-upload",
        disabled && "sia-file-upload--disabled",
        className,
      )}
      onDragOver={(event) => event.preventDefault()}
      onDrop={drop}
    >
      <input
        {...props}
        ref={inputRef}
        hidden
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={change}
      />
      <strong>{label}</strong>
      <span>{description}</span>
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
      >
        Parcourir
      </button>
    </div>
  );
}
