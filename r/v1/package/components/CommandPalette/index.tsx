import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";

export interface CommandItem { id: string; label: string; description?: string; keywords?: string[]; icon?: ReactNode; disabled?: boolean; onSelect: () => void; }
export interface CommandPaletteProps { open: boolean; onOpenChange: (open: boolean) => void; items: CommandItem[]; placeholder?: string; emptyLabel?: string; className?: string; }
/**
 * Tout ce que l'application sait faire, au clavier.
 *
 * La recherche porte aussi sur des mots-clés invisibles : quelqu'un qui tape
 * « facture » doit trouver « Nouvelle vente » sans avoir appris comment
 * l'action s'appelle ici.
 */
export function CommandPalette({ open, onOpenChange, items, placeholder = "Rechercher une commande...", emptyLabel = "Aucune commande", className }: CommandPaletteProps) { const [query, setQuery] = useState(""); const [active, setActive] = useState(0); const inputRef = useRef<HTMLInputElement>(null); const filtered = useMemo(() => { const needle = query.trim().toLowerCase(); return items.filter((item) => !needle || [item.label, item.description, ...(item.keywords ?? [])].filter(Boolean).join(" ").toLowerCase().includes(needle)); }, [items, query]); useEffect(() => { if (!open) return; setQuery(""); setActive(0); requestAnimationFrame(() => inputRef.current?.focus()); }, [open]); if (!open) return null; const select = (item: CommandItem | undefined) => { if (!item || item.disabled) return; item.onSelect(); onOpenChange(false); }; return <div className="sia-command-palette__backdrop" onMouseDown={(event) => event.target === event.currentTarget && onOpenChange(false)}><section className={cn("sia-command-palette", className)} role="dialog" aria-modal="true" aria-label="Palette de commandes"><input ref={inputRef} value={query} placeholder={placeholder} aria-label={placeholder} onChange={(event) => { setQuery(event.target.value); setActive(0); }} onKeyDown={(event) => { if (event.key === "Escape") onOpenChange(false); if (event.key === "ArrowDown") { event.preventDefault(); setActive((value) => Math.min(value + 1, filtered.length - 1)); } if (event.key === "ArrowUp") { event.preventDefault(); setActive((value) => Math.max(value - 1, 0)); } if (event.key === "Enter") select(filtered[active]); }} /><div role="listbox">{filtered.length === 0 ? <p>{emptyLabel}</p> : filtered.map((item, index) => <button type="button" role="option" aria-selected={index === active} key={item.id} disabled={item.disabled} onMouseEnter={() => setActive(index)} onClick={() => select(item)}>{item.icon}<span><strong>{item.label}</strong>{item.description && <small>{item.description}</small>}</span></button>)}</div></section></div>; }
