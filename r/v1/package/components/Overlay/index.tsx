import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@sia-ui/utils";
import { computeFloatingPosition } from "@sia-ui/headless";
import type { Placement } from "@sia-ui/headless";
import "./styles.css";

/**
 * Les douze placements du moteur de géométrie.
 *
 * Ce composant n'en exposait que quatre — haut et bas — parce qu'il calculait
 * lui-même sa position, en vertical seulement. Le calcul vit dans
 * `@sia-ui/headless`, sait basculer et recadrer dans les deux axes, et sert
 * déjà le natif : le refaire ici privait tous les flottants des côtés.
 */
export type OverlayPlacement = Placement;

export interface OverlayProps {
  open: boolean;
  anchorRef: RefObject<HTMLElement | null>;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  placement?: OverlayPlacement;
  offset?: number;
  matchAnchorWidth?: boolean;
  viewportPadding?: number;
  className?: string;
  id?: string;
  role?: string;
}

type Position = CSSProperties & { visibility: "hidden" | "visible" };

/**
 * Ce qui flotte à côté d'un élément.
 *
 * Le socle des menus, des listes déroulantes et des infobulles. Il place le
 * panneau parmi douze positions, le retourne quand le bord de la fenêtre
 * approche, et le ramène dans la vue plutôt que de le laisser déborder.
 *
 * Le calcul vit dans `@sia-ui/headless` : il ne dépend d'aucun rendu, et
 * sert donc aussi à ce qui n'est pas le DOM.
 */
export function Overlay({
  open,
  anchorRef,
  onOpenChange,
  children,
  placement = "bottom-start",
  offset = 6,
  matchAnchorWidth = false,
  viewportPadding = 8,
  className,
  ...props
}: OverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<Position>({
    position: "fixed",
    top: 0,
    left: 0,
    visibility: "hidden",
  });

  const updatePosition = useCallback(() => {
    const anchor = anchorRef.current;
    const overlay = overlayRef.current;
    if (!anchor || !overlay) return;

    const anchorRect = anchor.getBoundingClientRect();
    const overlayRect = overlay.getBoundingClientRect();

    // `Select` veut un panneau au moins aussi large que son champ : la largeur
    // entre donc dans le calcul, sinon le placement serait fait sur une taille
    // que le panneau n'aura pas.
    const width = matchAnchorWidth
      ? Math.max(anchorRect.width, overlayRect.width)
      : overlayRect.width;

    const { top, left } = computeFloatingPosition(
      anchorRect,
      { width, height: overlayRect.height },
      { width: window.innerWidth, height: window.innerHeight },
      placement,
      { offset, padding: viewportPadding },
    );

    setStyle({
      position: "fixed",
      top,
      left,
      minWidth: matchAnchorWidth ? anchorRect.width : undefined,
      maxWidth: `calc(100vw - ${viewportPadding * 2}px)`,
      visibility: "visible",
    });
  }, [anchorRef, matchAnchorWidth, offset, placement, viewportPadding]);

  useLayoutEffect(() => {
    if (open) updatePosition();
  }, [children, open, updatePosition]);

  useEffect(() => {
    if (!open) return;
    const closeOnOutsidePress = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !anchorRef.current?.contains(target) &&
        !overlayRef.current?.contains(target)
      ) {
        onOpenChange(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    const reposition = () => updatePosition();
    document.addEventListener("pointerdown", closeOnOutsidePress, true);
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress, true);
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [anchorRef, onOpenChange, open, updatePosition]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={overlayRef}
      className={cn("sia-overlay", className)}
      style={style}
      {...props}
    >
      {children}
    </div>,
    document.body,
  );
}
