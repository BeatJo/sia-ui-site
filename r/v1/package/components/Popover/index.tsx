import { cloneElement, isValidElement, useRef, useState, type ReactElement, type ReactNode } from "react";
import { cn, toneClass } from "@sia-ui/utils";
import type { ComponentTone } from "@sia-ui/tokens";
import { Overlay, type OverlayPlacement } from "../Overlay";
import "./styles.css";

export interface PopoverProps { content: ReactNode; title?: ReactNode; children: ReactElement<{ onClick?: () => void; "aria-expanded"?: boolean }>; open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void; placement?: OverlayPlacement; trigger?: "click" | "hover"; variant?: "solid" | "outline"; tone?: ComponentTone; disabled?: boolean; className?: string; }
/**
 * Un panneau attaché à un élément, avec du contenu qu'on peut viser.
 *
 * À la différence d'une infobulle, il reste ouvert : on y met un lien, un
 * bouton, un petit formulaire. Une infobulle qui contient un bouton est une
 * infobulle cassée — elle disparaît dès qu'on va vers lui.
 */
export function Popover({ content, title, children, open: openProp, defaultOpen = false, onOpenChange, placement = "bottom-start", trigger = "click", variant = "outline", tone = "neutral", disabled = false, className }: PopoverProps) {
  const anchorRef = useRef<HTMLElement>(null); const [internalOpen, setInternalOpen] = useState(defaultOpen); const open = openProp ?? internalOpen; const setOpen = (next: boolean) => { if (disabled) return; if (openProp === undefined) setInternalOpen(next); onOpenChange?.(next); };
  const child = isValidElement(children) ? cloneElement(children, { ref: anchorRef, "aria-expanded": open, ...(trigger === "click" ? { onClick: () => { children.props.onClick?.(); setOpen(!open); } } : {}) } as never) : children;
  return <span className="sia-popover-anchor" onMouseEnter={trigger === "hover" ? () => setOpen(true) : undefined} onMouseLeave={trigger === "hover" ? () => setOpen(false) : undefined}>{child}<Overlay open={open} anchorRef={anchorRef} onOpenChange={setOpen} placement={placement} className={cn("sia-popover", `sia-popover--${variant}`, toneClass("sia-tone", tone), className)} role="dialog">{title && <strong className="sia-popover__title">{title}</strong>}<div className="sia-popover__content">{content}</div></Overlay></span>;
}
