import { useState, type Key } from "react";
import { Tree, type TreeNode } from "../Tree";
import { cn } from "@sia-ui/utils";
import { useSiaLocale } from "@sia-ui/headless";
import "./styles.css";

export interface TreeSelectProps { nodes: TreeNode[]; value?: Key | undefined; onValueChange?: (value: Key, node: TreeNode) => void; placeholder?: string; className?: string; }
/**
 * Un choix dans une arborescence.
 *
 * Là où une liste plate perdrait le chemin : « Ventes › Règlements › En
 * attente » ne se réduit pas à « En attente » sans devenir ambigu dès qu'un
 * autre nœud porte le même nom.
 */
export function TreeSelect({ nodes, value, onValueChange, placeholder: placeholderProp, className }: TreeSelectProps) {
    const locale = useSiaLocale();
    const placeholder = placeholderProp ?? locale.select; const [open, setOpen] = useState(false); const find = (items: TreeNode[]): TreeNode | undefined => { for (const item of items) { if (item.key === value) return item; const child = item.children ? find(item.children) : undefined; if (child) return child; } }; const selected = find(nodes); return <div className={cn("sia-tree-select", className)}><button type="button" className="sia-tree-select__trigger" aria-expanded={open} onClick={() => setOpen(!open)}>{selected?.label ?? placeholder}</button>{open && <div className="sia-tree-select__panel"><Tree nodes={nodes} defaultExpandedKeys={nodes.map((node) => node.key)} selectedKey={value} onSelect={(node) => { onValueChange?.(node.key, node); setOpen(false); }} /></div>}</div>; }
