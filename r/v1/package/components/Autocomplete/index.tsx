import { useMemo, useState } from "react";
import { cn } from "@sia-ui/utils";
import type { SelectOption } from "../Select";
import { useSiaLocale } from "@sia-ui/headless";
export interface AutocompleteProps { id?: string; options: SelectOption[]; value?: string; defaultValue?: string; onValueChange?: (value: string, option?: SelectOption) => void; placeholder?: string; allowCustomValue?: boolean; disabled?: boolean; className?: string; "aria-describedby"?: string; "aria-labelledby"?: string; "aria-invalid"?: boolean; "aria-required"?: boolean; }
/**
 * Un champ qui propose, sans imposer.
 *
 * `allowCustomValue` est vrai par défaut : la liste aide à trouver, elle ne
 * dit pas ce qui existe. Un nom de client absent du référentiel reste
 * saisissable, quitte à être créé ensuite.
 */
export function Autocomplete({ id, options, value, defaultValue = "", onValueChange, placeholder: placeholderProp, allowCustomValue = true, disabled, className, ...ariaProps }: AutocompleteProps) {
    const locale = useSiaLocale();
    const placeholder = placeholderProp ?? locale.searchPlaceholder; const initialLabel = options.find((option) => option.value === defaultValue)?.label; const [internal, setInternal] = useState(defaultValue); const [query, setQuery] = useState(initialLabel ? String(initialLabel) : defaultValue); const [open, setOpen] = useState(false); const current = value ?? internal; const filtered = useMemo(() => { const needle = query.toLowerCase(); return options.filter((option) => [String(option.label), ...(option.keywords ?? [])].join(" ").toLowerCase().includes(needle)); }, [options, query]); const select = (option: SelectOption) => { if (value === undefined) setInternal(option.value); setQuery(String(option.label)); setOpen(false); onValueChange?.(option.value, option); }; return <div id={id} className={cn("sia-autocomplete", className)} {...ariaProps}><input value={query} placeholder={placeholder} disabled={disabled} role="combobox" aria-expanded={open} aria-controls={`${id ?? "sia-autocomplete"}-list`} onFocus={() => setOpen(true)} onChange={(event) => { const next = event.target.value; setQuery(next); setOpen(true); if (allowCustomValue) { if (value === undefined) setInternal(next); onValueChange?.(next); } }} onBlur={() => window.setTimeout(() => setOpen(false), 120)} />{open && <div id={`${id ?? "sia-autocomplete"}-list`} role="listbox">{filtered.map((option) => <button type="button" role="option" aria-selected={current === option.value} key={option.value} disabled={option.disabled} onMouseDown={(event) => event.preventDefault()} onClick={() => select(option)}>{option.label}</button>)}</div>}</div>; }
