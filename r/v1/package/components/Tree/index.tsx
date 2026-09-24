import { useState, type Key, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";

export interface TreeNode { key: Key; label: ReactNode; children?: TreeNode[]; disabled?: boolean; }
export interface TreeProps { nodes: TreeNode[]; defaultExpandedKeys?: Key[]; selectedKey?: Key | undefined; onSelect?: ((node: TreeNode) => void) | undefined; className?: string; }
function TreeBranch({ nodes, level, expanded, toggle, selectedKey, onSelect }: { nodes: TreeNode[]; level: number; expanded: Set<Key>; toggle: (key: Key) => void; selectedKey?: Key | undefined; onSelect?: ((node: TreeNode) => void) | undefined }) { return <ul role={level === 1 ? "tree" : "group"}>{nodes.map((node) => { const hasChildren = Boolean(node.children?.length); const isExpanded = expanded.has(node.key); return <li key={node.key} role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined} aria-selected={selectedKey === node.key} aria-disabled={node.disabled || undefined}><div className="sia-tree__row" style={{ paddingInlineStart: `${(level - 1) * 1.25}rem` }}>{hasChildren ? <button type="button" aria-label={isExpanded ? "Réduire" : "Développer"} onClick={() => toggle(node.key)}>{isExpanded ? "−" : "+"}</button> : <span className="sia-tree__spacer" />}<button type="button" disabled={node.disabled} className="sia-tree__label" onClick={() => onSelect?.(node)}>{node.label}</button></div>{hasChildren && isExpanded && <TreeBranch nodes={node.children ?? []} level={level + 1} expanded={expanded} toggle={toggle} selectedKey={selectedKey} onSelect={onSelect} />}</li>; })}</ul>; }
/**
 * Une arborescence qu'on déplie.
 *
 * Les branches ouvertes sont un état à part de la sélection : replier un
 * nœud ne désélectionne pas ce qu'il contient, et rouvrir l'écran ne doit
 * pas tout refermer.
 */
export function Tree({ nodes, defaultExpandedKeys = [], selectedKey, onSelect, className }: TreeProps) { const [expanded, setExpanded] = useState(new Set(defaultExpandedKeys)); const toggle = (key: Key) => setExpanded((current) => { const next = new Set(current); if (next.has(key)) next.delete(key); else next.add(key); return next; }); return <div className={cn("sia-tree", className)}><TreeBranch nodes={nodes} level={1} expanded={expanded} toggle={toggle} selectedKey={selectedKey} onSelect={onSelect} /></div>; }
