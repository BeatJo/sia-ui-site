import { useMemo, useState, type TextareaHTMLAttributes } from "react";
import { Textarea } from "../Textarea";
import { cn } from "@sia-ui/utils";
import "./styles.css";
export interface JsonEditorProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "defaultValue" | "onChange"> { value?: string; defaultValue?: string; onValueChange?: (value: string, parsed: unknown | undefined) => void; formatOnBlur?: boolean; }
/**
 * Une zone de saisie qui connaît la forme de ce qu'on y écrit.
 *
 * Elle signale une syntaxe invalide pendant la frappe et rend l'objet
 * analysé à côté du texte : l'appelant reçoit donc les deux, et n'a pas à
 * refaire un `JSON.parse` dans un `try`.
 */
export function JsonEditor({ value, defaultValue = "{}", onValueChange, formatOnBlur = true, className, ...props }: JsonEditorProps) { const [internal, setInternal] = useState(defaultValue); const current = value ?? internal; const result = useMemo(() => { try { return { valid: true, parsed: JSON.parse(current) as unknown }; } catch { return { valid: false, parsed: undefined }; } }, [current]); const update = (next: string) => { let parsed: unknown | undefined; try { parsed = JSON.parse(next) as unknown; } catch { parsed = undefined; } if (value === undefined) setInternal(next); onValueChange?.(next, parsed); }; return <div className={cn("sia-code-editor", className)}><Textarea {...props} value={current} invalid={!result.valid} resize="vertical" spellCheck={false} onChange={(event) => update(event.target.value)} onBlur={(event) => { if (formatOnBlur && result.valid) update(JSON.stringify(result.parsed, null, 2)); props.onBlur?.(event); }} /><small className={result.valid ? "is-valid" : "is-invalid"}>{result.valid ? "JSON valide" : "JSON invalide"}</small></div>; }
