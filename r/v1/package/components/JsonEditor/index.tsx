import { useMemo, useState, type TextareaHTMLAttributes } from "react";
import { Textarea, type TextareaProps } from "../Textarea";
import { cn } from "@sia-ui/utils";
import { useSiaLocale } from "@sia-ui/headless";
import "./styles.css";
export interface JsonEditorProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "defaultValue" | "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, parsed: unknown | undefined) => void;
  formatOnBlur?: boolean;
  /**
   * La zone de saisie elle-même : `resize`, classe, correcteur.
   *
   * La valeur, la saisie et `invalid` suivent l'analyse du JSON ; `onBlur`
   * se passe au composant, qui l'enchaîne après le formatage.
   */
  textareaProps?: Partial<
    Omit<TextareaProps, "value" | "defaultValue" | "onChange" | "invalid" | "onBlur">
  >;
}
/**
 * Une zone de saisie qui connaît la forme de ce qu'on y écrit.
 *
 * Elle signale une syntaxe invalide pendant la frappe et rend l'objet
 * analysé à côté du texte : l'appelant reçoit donc les deux, et n'a pas à
 * refaire un `JSON.parse` dans un `try`.
 */
export function JsonEditor({ value, defaultValue = "{}", onValueChange, formatOnBlur = true, className, textareaProps, ...props }: JsonEditorProps) { const messages = useSiaLocale().jsonEditor; const [internal, setInternal] = useState(defaultValue); const current = value ?? internal; const result = useMemo(() => { try { return { valid: true, parsed: JSON.parse(current) as unknown }; } catch { return { valid: false, parsed: undefined }; } }, [current]); const update = (next: string) => { let parsed: unknown | undefined; try { parsed = JSON.parse(next) as unknown; } catch { parsed = undefined; } if (value === undefined) setInternal(next); onValueChange?.(next, parsed); }; return <div className={cn("sia-code-editor", className)}><Textarea {...props} resize="vertical" spellCheck={false} {...textareaProps} value={current} invalid={!result.valid} onChange={(event) => update(event.target.value)} onBlur={(event) => { if (formatOnBlur && result.valid) update(JSON.stringify(result.parsed, null, 2)); props.onBlur?.(event); }} /><small className={result.valid ? "is-valid" : "is-invalid"}>{result.valid ? messages.valid : messages.invalid}</small></div>; }
