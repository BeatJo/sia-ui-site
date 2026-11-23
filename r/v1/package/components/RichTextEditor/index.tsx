import { useEffect, useRef, type HTMLAttributes } from "react";
import { cn } from "@sia-ui/utils";
import { useSiaLocale } from "@sia-ui/headless";
import "./styles.css";
export interface RichTextEditorProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> { value?: string; defaultValue?: string; onValueChange?: (html: string) => void; placeholder?: string; disabled?: boolean; }
/**
 * Une saisie de texte mis en forme.
 *
 * Elle rend du HTML, pas une structure à elle : ce qui sort se stocke, se
 * renvoie et s'affiche partout ailleurs sans qu'un convertisseur soit
 * nécessaire.
 */
export function RichTextEditor({ value, defaultValue = "", onValueChange, placeholder: placeholderProp, disabled, className, ...props }: RichTextEditorProps) { const messages = useSiaLocale().richTextEditor; const placeholder = placeholderProp ?? messages.placeholder; const editorRef = useRef<HTMLDivElement>(null); useEffect(() => { if (value !== undefined && editorRef.current && editorRef.current.innerHTML !== value) editorRef.current.innerHTML = value; }, [value]); const command = (name: string) => { editorRef.current?.focus(); document.execCommand(name); onValueChange?.(editorRef.current?.innerHTML ?? ""); }; return <div className={cn("sia-rich-text-editor", disabled && "sia-rich-text-editor--disabled", className)}><div className="sia-editor-toolbar"><button type="button" disabled={disabled} aria-label={messages.bold} onClick={() => command("bold")}><strong>B</strong></button><button type="button" disabled={disabled} aria-label={messages.italic} onClick={() => command("italic")}><em>I</em></button><button type="button" disabled={disabled} aria-label={messages.bulletList} onClick={() => command("insertUnorderedList")}>• {messages.bulletList}</button></div><div {...props} ref={editorRef} role="textbox" aria-multiline="true" contentEditable={!disabled} suppressContentEditableWarning data-placeholder={placeholder} dangerouslySetInnerHTML={value === undefined ? { __html: defaultValue } : undefined} onInput={(event) => onValueChange?.(event.currentTarget.innerHTML)} /></div>; }
