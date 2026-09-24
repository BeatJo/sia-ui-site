import { useMemo, useState, type Key, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";

export interface TransferItem { key: Key; label: ReactNode; disabled?: boolean; }
export interface TransferProps { items: TransferItem[]; targetKeys: Key[]; onChange: (targetKeys: Key[]) => void; sourceTitle?: string; targetTitle?: string; className?: string; }
/**
 * Deux listes, et ce qui passe de l'une à l'autre.
 *
 * La forme qui convient quand le choix se compte en dizaines : une liste à
 * cocher de deux cents lignes ne montre plus ce qui est retenu, alors que
 * la colonne de droite ne contient que cela.
 */
export function Transfer({ items, targetKeys, onChange, sourceTitle = "Disponibles", targetTitle = "Sélectionnés", className }: TransferProps) { const [checked, setChecked] = useState<Key[]>([]); const target = useMemo(() => new Set(targetKeys), [targetKeys]); const renderList = (list: TransferItem[], title: string) => <section><header>{title} <span>{list.length}</span></header>{list.map((item) => <label key={item.key}><input type="checkbox" disabled={item.disabled} checked={checked.includes(item.key)} onChange={(event) => setChecked((current) => event.target.checked ? [...current, item.key] : current.filter((key) => key !== item.key))} />{item.label}</label>)}</section>; const sourceItems = items.filter((item) => !target.has(item.key)); const targetItems = items.filter((item) => target.has(item.key)); return <div className={cn("sia-transfer", className)}>{renderList(sourceItems, sourceTitle)}<div className="sia-transfer__actions"><button type="button" aria-label="Ajouter" onClick={() => { onChange([...new Set([...targetKeys, ...checked])]); setChecked([]); }}>→</button><button type="button" aria-label="Retirer" onClick={() => { onChange(targetKeys.filter((key) => !checked.includes(key))); setChecked([]); }}>←</button></div>{renderList(targetItems, targetTitle)}</div>; }
