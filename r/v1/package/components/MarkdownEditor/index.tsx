import { useState, type ReactNode, type TextareaHTMLAttributes } from "react";
import { Textarea } from "../Textarea";
import { cn } from "@sia-ui/utils";
export interface MarkdownEditorProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "defaultValue" | "onChange"> { value?: string; defaultValue?: string; onValueChange?: (value: string) => void; preview?: (value: string) => ReactNode; }
/**
 * Une saisie Markdown, avec son aperçu.
 *
 * Le rendu n'est pas fourni : `preview` reçoit le texte et rend ce qu'il
 * veut. Embarquer un moteur Markdown imposerait le nôtre à un projet qui a
 * déjà le sien — et ferait grossir le paquet pour tous les autres.
 */
export function MarkdownEditor({ value, defaultValue = "", onValueChange, preview, className, ...props }: MarkdownEditorProps) { const [internal, setInternal] = useState(defaultValue); const [mode, setMode] = useState<"write" | "preview">("write"); const current = value ?? internal; const update = (next: string) => { if (value === undefined) setInternal(next); onValueChange?.(next); }; return <div className={cn("sia-markdown-editor", className)}><div className="sia-editor-toolbar"><button type="button" aria-pressed={mode === "write"} onClick={() => setMode("write")}>Écrire</button><button type="button" aria-pressed={mode === "preview"} onClick={() => setMode("preview")}>Aperçu</button></div>{mode === "write" ? <Textarea {...props} value={current} onChange={(event) => update(event.target.value)} /> : <div className="sia-editor-preview">{preview ? preview(current) : <pre>{current}</pre>}</div>}</div>; }
