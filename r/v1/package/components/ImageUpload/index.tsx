import { useEffect, useState } from "react";
import { FileUpload, type FileUploadProps } from "../FileUpload";
import { cn } from "@sia-ui/utils";
import "./styles.css";
export interface ImageUploadProps extends Omit<FileUploadProps, "accept" | "onFilesChange"> { accept?: string; value?: string; onValueChange?: (file: File | null, previewUrl?: string) => void; previewAlt?: string; }
/**
 * Un dépôt de fichier qui montre ce qu'on vient de choisir.
 *
 * L'aperçu est local, construit avant tout envoi : attendre le retour du
 * serveur pour afficher l'image laisse un carré vide au moment précis où
 * l'on veut vérifier qu'on n'a pas pris la mauvaise.
 */
export function ImageUpload({ accept = "image/*", value, onValueChange, previewAlt = "Aperçu de l'image", className, ...props }: ImageUploadProps) { const [preview, setPreview] = useState(value); useEffect(() => setPreview(value), [value]); useEffect(() => () => { if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview); }, [preview]); const select = (files: File[]) => { const file = files[0]; if (!file) return; const next = URL.createObjectURL(file); setPreview(next); onValueChange?.(file, next); }; return <div className={cn("sia-image-upload", className)}>{preview && <div className="sia-image-upload__preview"><img src={preview} alt={previewAlt} /><button type="button" onClick={() => { setPreview(undefined); onValueChange?.(null); }}>Supprimer</button></div>}<FileUpload {...props} accept={accept} multiple={false} onFilesChange={select} /></div>; }
