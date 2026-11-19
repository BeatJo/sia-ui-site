import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import type { ComponentSize, ComponentTone } from "@sia-ui/tokens";
import { cn } from "@sia-ui/utils";
import { computeFloatingPosition, type Placement } from "@sia-ui/headless";
import { Portal } from "@sia-ui/react";
import "./styles.css";

export type TooltipVariant = "solid" | "outline";

export interface TooltipProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "content"> {
  content?: ReactNode;
  children: ReactNode;
  tone?: ComponentTone;
  /** Seules `sm`, `md` et `lg` sont dessinées — voir `styles.css`. */
  size?: ComponentSize;
  placement?: Placement;
  variant?: TooltipVariant;
  /** Délai avant apparition, en millisecondes. */
  delay?: number;
  disabled?: boolean;
}

/** Alias historique, conservé pour les composants venus du registre. */
export type ITooltipProps = TooltipProps;
export type ITooltipVariant = TooltipVariant;

/**
 * Bulle d'aide positionnée hors du flux.
 *
 * Le contenu passe par un portail plutôt que par un `position: absolute` dans
 * le flux : un tooltip posé dans une `Card` ou une cellule de `DataTable` —
 * toutes deux en `overflow: hidden` — serait sinon rogné.
 */
export function Tooltip({
  content,
  children,
  placement = "top",
  variant = "solid",
  tone = "neutral",
  size = "md",
  delay = 150,
  disabled,
  className,
  ...props
}: TooltipProps) {
  const id = useId();
  const triggerRef = useRef<HTMLSpanElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
    placement: Placement;
  } | null>(null);

  const clear = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  const show = useCallback(() => {
    if (disabled) return;
    clear();
    timer.current = setTimeout(() => setOpen(true), delay);
  }, [clear, delay, disabled]);

  const hide = useCallback(() => {
    clear();
    setOpen(false);
    setPosition(null);
  }, [clear]);

  useEffect(() => clear, [clear]);

  useEffect(() => {
    if (!open) return undefined;

    const update = () => {
      const trigger = triggerRef.current?.getBoundingClientRect();
      const bubble = bubbleRef.current?.getBoundingClientRect();
      if (!trigger || !bubble) return;
      setPosition(
        computeFloatingPosition(
          trigger,
          { width: bubble.width, height: bubble.height },
          // La mesure de la fenêtre est le seul apport du web ici : le calcul
          // lui-même ne connaît aucune plateforme.
          { width: window.innerWidth, height: window.innerHeight },
          (placement ?? "top") as Placement,
          { offset: 6 },
        ),
      );
    };

    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") hide();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [hide, open, placement]);

  return (
    <>
      <span
        ref={triggerRef}
        className={cn("sia-tooltip-trigger", className)}
        aria-describedby={open ? id : undefined}
        onPointerEnter={show}
        onPointerLeave={hide}
        onFocus={show}
        onBlur={hide}
        {...props}
      >
        {children}
      </span>

      {open && !disabled && content != null && (
        <Portal>
          <span
            ref={bubbleRef}
            id={id}
            role="tooltip"
            className={cn(
              "sia-tooltip",
              `sia-tooltip-${variant}`,
              `sia-tooltip-${tone}`,
              `sia-tooltip-size-${size}`,
              position && `sia-tooltip-at-${position.placement}`,
            )}
            style={{
              top: position?.top ?? 0,
              left: position?.left ?? 0,
              visibility: position ? "visible" : "hidden",
            }}
          >
            {content}
          </span>
        </Portal>
      )}
    </>
  );
}
