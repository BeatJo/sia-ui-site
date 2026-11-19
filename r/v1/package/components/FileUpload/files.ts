/** Même contrat pour un fichier choisi et un fichier déposé. Racine comprise. */
export interface FileUploadEntry {
  file: File;
  relativePath: string;
}
export type FileUploadErrorCode =
  | "max-files"
  | "max-file-size"
  | "max-total-size"
  | "max-depth"
  | "invalid-path"
  | "unsupported-directory"
  | "read-error";
export class FileUploadReadError extends Error {
  constructor(public readonly code: FileUploadErrorCode) {
    super(code);
    this.name = "FileUploadReadError";
  }
}
export interface FileUploadLimits {
  /** Nombre de fichiers, 1000 par défaut en mode dossier. */
  maxFiles?: number;
  /** Taille d'un fichier en octets. */
  maxFileSize?: number;
  /** Taille cumulée en octets, 100 Mio par défaut en mode dossier. */
  maxTotalSize?: number;
  /** Nombre de dossiers dans un chemin, 20 par défaut. */
  maxDepth?: number;
}

// L'API Entries est aussi implémentée avec le préfixe webkit hors de WebKit.
interface Entry {
  name: string;
  isFile: boolean;
  isDirectory: boolean;
  file?: (
    success: (file: File) => void,
    error: (error: DOMException) => void,
  ) => void;
  createReader?: () => {
    readEntries: (
      success: (entries: Entry[]) => void,
      error: (error: DOMException) => void,
    ) => void;
  };
}
export type FileDropSource = { files: File[]; entries: Array<Entry | null> };

/** À appeler pendant l'événement drop, avant toute attente asynchrone. */
export function captureFileDrop(transfer: DataTransfer): FileDropSource {
  return {
    files: Array.from(transfer.files),
    entries: Array.from(transfer.items ?? [])
      .filter((item) => item.kind === "file")
      .map((item) => (item.webkitGetAsEntry?.() as Entry | null) ?? null),
  };
}

function readNative<T>(
  start: (
    resolve: (value: T) => void,
    reject: (error: unknown) => void,
  ) => void,
  signal: AbortSignal,
): Promise<T> {
  return new Promise((resolve, reject) => {
    signal.throwIfAborted();
    const abort = () => reject(signal.reason);
    signal.addEventListener("abort", abort, { once: true });
    const finish = (run: () => void) => {
      signal.removeEventListener("abort", abort);
      run();
    };
    try {
      start(
        (value) => finish(() => resolve(value)),
        (error) => finish(() => reject(error)),
      );
    } catch (error) {
      finish(() => reject(error));
    }
  });
}

export async function readUploadEntries(
  source: File[] | FileDropSource,
  options: FileUploadLimits & { directory: boolean; signal: AbortSignal },
): Promise<FileUploadEntry[]> {
  const {
    signal,
    directory,
    maxFiles = directory ? 1000 : Infinity,
    maxFileSize = Infinity,
    maxTotalSize = directory ? 100 * 1024 * 1024 : Infinity,
    maxDepth = 20,
  } = options;
  for (const limit of [maxFiles, maxFileSize, maxTotalSize, maxDepth]) {
    if (Number.isNaN(limit) || limit < 0)
      throw new RangeError("FileUpload limits must be positive.");
  }
  const result: FileUploadEntry[] = [];
  const paths = new Set<string>();
  let total = 0;
  const checkPath = (path: string, folder = false) => {
    const parts = path.split("/");
    if (
      parts.some((part) => !part || part === "." || part === "..") ||
      /[\\\0]/.test(path) ||
      paths.has(path)
    )
      throw new FileUploadReadError("invalid-path");
    if (parts.length - (folder ? 0 : 1) > maxDepth)
      throw new FileUploadReadError("max-depth");
  };
  const add = (file: File, path: string) => {
    signal.throwIfAborted();
    checkPath(path);
    if (result.length >= maxFiles) throw new FileUploadReadError("max-files");
    if (file.size > maxFileSize) throw new FileUploadReadError("max-file-size");
    if (total + file.size > maxTotalSize)
      throw new FileUploadReadError("max-total-size");
    total += file.size;
    paths.add(path);
    result.push({ file, relativePath: path });
  };
  const visit = async (entry: Entry, prefix = "") => {
    signal.throwIfAborted();
    const path = `${prefix}${entry.name}`;
    if (entry.isFile && entry.file) {
      const file = await readNative<File>(
        (resolve, reject) => entry.file!(resolve, reject),
        signal,
      );
      add(file, path);
    } else if (entry.isDirectory && entry.createReader) {
      checkPath(path, true);
      const reader = entry.createReader();
      while (true) {
        signal.throwIfAborted();
        const batch = await readNative<Entry[]>(
          (resolve, reject) => reader.readEntries(resolve, reject),
          signal,
        );
        if (!batch.length) break;
        for (const child of batch) await visit(child, `${path}/`);
      }
    } else throw new FileUploadReadError("read-error");
  };
  signal.throwIfAborted();
  if (Array.isArray(source)) {
    for (const file of source)
      add(file, directory ? file.webkitRelativePath || file.name : file.name);
  } else if (directory) {
    if (!source.entries.length || source.entries.some((entry) => !entry))
      throw new FileUploadReadError("unsupported-directory");
    for (const entry of source.entries) if (entry) await visit(entry);
  } else {
    if (source.entries.some((entry) => entry?.isDirectory))
      throw new FileUploadReadError("unsupported-directory");
    for (const file of source.files) add(file, file.name);
  }
  signal.throwIfAborted();
  return directory
    ? result.sort((a, b) => a.relativePath.localeCompare(b.relativePath))
    : result;
}
