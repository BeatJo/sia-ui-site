import { useState, type KeyboardEvent } from "react";
import { cn } from "@sia-ui/utils";
import { XIcon } from "../Icons";
import "./styles.css";
export interface TagsInputProps { id?: string; value?: string[]; defaultValue?: string[]; onValueChange?: (value: string[]) => void; placeholder?: string; separators?: string[]; maxTags?: number; disabled?: boolean; className?: string; "aria-describedby"?: string; "aria-labelledby"?: string; "aria-invalid"?: boolean; "aria-required"?: boolean; }
/**
 * Une liste de mots, saisis à la volée.
 *
 * Les séparateurs sont déclarés : la virgule et l'entrée par défaut, parce
 * que ce sont les deux touches que l'on presse sans y penser après avoir
 * tapé un mot.
 */
export function TagsInput({ id, value, defaultValue = [], onValueChange, placeholder = "Ajouter un tag", separators = ["Enter", ","], maxTags, disabled, className, ...ariaProps }: TagsInputProps) { const [internal, setInternal] = useState(defaultValue); const [draft, setDraft] = useState(""); const current = value ?? internal; const update = (next: string[]) => { if (value === undefined) setInternal(next); onValueChange?.(next); }; const add = () => { const tag = draft.trim().replace(/,$/, ""); if (!tag || current.includes(tag) || (maxTags !== undefined && current.length >= maxTags)) return; update([...current, tag]); setDraft(""); }; return <div id={id} className={cn("sia-tags-input", className)} {...ariaProps}>{current.map((tag) => <span key={tag}>{tag}<button type="button" disabled={disabled} aria-label={`Retirer ${tag}`} onClick={() => update(current.filter((item) => item !== tag))}><XIcon /></button></span>)}<input value={draft} disabled={disabled} placeholder={placeholder} onChange={(event) => setDraft(event.target.value)} onBlur={add} onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => { if (separators.includes(event.key)) { event.preventDefault(); add(); } if (event.key === "Backspace" && !draft && current.length) update(current.slice(0, -1)); }} /></div>; }
