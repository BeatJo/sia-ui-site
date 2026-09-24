import {
  cloneElement,
  isValidElement,
  useRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@sia-ui/utils";
import { useHoverIntent } from "@sia-ui/headless";
import { Overlay, type OverlayPlacement } from "../Overlay";
import "./styles.css";

export interface HoverCardProps {
  content: ReactNode;
  children: ReactElement<{ onMouseEnter?: () => void; onFocus?: () => void }>;
  /**
   * Délai avant ouverture. Il n'est pas cosmétique : sans lui, traverser la
   * page avec la souris ouvre et ferme une dizaine de panneaux au passage.
   */
  openDelay?: number;
  /** Délai avant fermeture, le temps d'atteindre le panneau à la souris. */
  closeDelay?: number;
  placement?: OverlayPlacement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  width?: number | string;
  className?: string;
}

/**
 * Un aperçu au survol.
 *
 * Ce n'est pas un `Tooltip` : celui-ci porte une phrase et se lit d'un coup
 * d'œil, celui-là porte du contenu — une fiche, un résumé, une image — que
 * l'on peut vouloir survoler à son tour, voire sélectionner.
 */
export function HoverCard({
  content,
  children,
  openDelay = 300,
  closeDelay = 150,
  placement = "bottom-start",
  open: openProp,
  onOpenChange,
  width = 20 * 16,
  className,
}: HoverCardProps) {
  const anchorRef = useRef<HTMLElement>(null);

  // Les deux délais vivent dans `@sia-ui/headless` : le volet de navigation
  // du `Sidebar` pose exactement la même question, et deux réglages qui
  // divergent donnent deux sensations différentes dans la même application.
  const { open, triggerProps, panelProps, setOpen } = useHoverIntent({
    openDelay,
    closeDelay,
    ...(openProp !== undefined ? { open: openProp } : {}),
    ...(onOpenChange ? { onOpenChange } : {}),
  });

  const trigger = isValidElement(children)
    ? cloneElement(children, {
        ref: anchorRef,
        ...triggerProps,
        onFocus: () => {
          children.props.onFocus?.();
          triggerProps.onFocus();
        },
        onMouseEnter: () => {
          children.props.onMouseEnter?.();
          triggerProps.onMouseEnter();
        },
      } as never)
    : children;

  return (
    <span className="sia-hover-card-anchor">
      {trigger}
      <Overlay
        open={open}
        anchorRef={anchorRef}
        onOpenChange={setOpen}
        placement={placement}
        className={cn("sia-hover-card", className)}
        role="dialog"
      >
        <div
          style={{ width }}
          className="sia-hover-card__body"
          // Survoler le panneau le maintient ouvert : sans cela il se ferme
          // dès que la souris quitte le déclencheur pour y aller.
          {...panelProps}
        >
          {content}
        </div>
      </Overlay>
    </span>
  );
}
