import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@sia-ui/utils";
import {
  toast,
  toastStore,
  useSiaLocale,
  useToasts,
  type ToastId,
  type ToastOptions,
  type ToastPlacement,
  type ToastRecord,
  type ToastTone,
} from "@sia-ui/headless";
import { usePortal } from "@sia-ui/react";
import { AlertCircleIcon, CheckIcon, InfoIcon, XIcon } from "../Icons";
import { Spinner } from "../Spinner";
import "./styles.css";

export type { ToastId, ToastOptions, ToastPlacement, ToastTone };

/**
 * L'API des annonces, appelable de n'importe où.
 *
 * `toast("Enregistré")`, `toast.success(…)`, `toast.promise(…)`. Ce n'est pas
 * un hook : le magasin vit hors de React, donc un intercepteur HTTP ou une
 * fonction utilitaire peut poser une annonce sans être un composant.
 */
export { toast, toastStore };

const TONE_ICON: Record<ToastTone, ReactNode> = {
  neutral: null,
  primary: <InfoIcon />,
  info: <InfoIcon />,
  success: <CheckIcon />,
  warning: <AlertCircleIcon />,
  danger: <AlertCircleIcon />,
  loading: <Spinner size="sm" tone="current" />,
};

/** Le temps laissé à l'animation de sortie avant le retrait définitif. */
const EXIT_DELAY = 260;

const PLACEMENTS: ToastPlacement[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

export interface ToasterProps {
  /** Coin par défaut des annonces qui n'en précisent pas. */
  placement?: ToastPlacement;
  /** Nombre visible simultanément. Au-delà, la plus ancienne s'efface. */
  limit?: number;
  /** Durée par défaut, pour les tons qui n'en imposent pas une. */
  duration?: number;
  /** Largeur d'une annonce. */
  width?: number | string;
  /** Décalage depuis le bord de l'écran. */
  offset?: number | string;
  /**
   * Où rendre la pile. Par défaut, un nœud créé sous `document.body`.
   *
   * À fournir quand le thème est porté par un conteneur plutôt que par la
   * racine du document : sorties de ce conteneur, les annonces perdraient
   * ses variables et s'afficheraient dans le thème clair.
   */
  container?: HTMLElement | null | undefined;
  className?: string;
}

/**
 * La pile visible.
 *
 * Un seul `<Toaster />` à la racine de l'application. Il rend les six coins :
 * une annonce peut choisir le sien, ce qui permet à une confirmation
 * d'apparaître près du geste qui l'a déclenchée et à une panne générale de
 * s'imposer en haut de l'écran.
 */
export function Toaster({
  placement = "bottom-right",
  limit,
  duration,
  width = "24rem",
  offset = "1rem",
  container,
  className,
}: ToasterProps) {
  const records = useToasts<ReactNode>();
  const node = usePortal(container ? { container } : { id: "sia-toaster" });
  const locale = useSiaLocale();

  useEffect(() => {
    toastStore.configure({
      ...(limit !== undefined ? { limit } : {}),
      ...(duration !== undefined ? { defaultDuration: duration } : {}),
    });
  }, [duration, limit]);

  const byPlacement = useMemo(() => {
    const groups = new Map<ToastPlacement, Array<ToastRecord<ReactNode>>>();
    for (const record of records) {
      const corner = record.placement ?? placement;
      const list = groups.get(corner);
      if (list) list.push(record);
      else groups.set(corner, [record]);
    }
    return groups;
  }, [placement, records]);

  if (!node) return null;

  return createPortal(
    <>
      {PLACEMENTS.filter((corner) => byPlacement.has(corner)).map((corner) => {
        const list = byPlacement.get(corner) ?? [];
        // En haut, la plus récente arrive au-dessus de la pile; en bas, elle
        // arrive au-dessous. Dans les deux cas elle est la plus proche du
        // bord, donc la première lue.
        const ordered = corner.startsWith("top") ? [...list].reverse() : list;

        return (
          <div
            key={corner}
            className={cn("sia-toaster", `sia-toaster--${corner}`, className)}
            style={
              {
                "--sia-toaster-width": typeof width === "number" ? `${width}px` : width,
                "--sia-toaster-offset":
                  typeof offset === "number" ? `${offset}px` : offset,
              } as CSSProperties
            }
            role="region"
            aria-label={locale.notifications}
          >
            {ordered.map((record) => (
              <ToastItem
                key={record.id}
                record={record}
                placement={corner}
                closeLabel={locale.close}
              />
            ))}
          </div>
        );
      })}
    </>,
    node,
  );
}

interface ToastItemProps {
  record: ToastRecord<ReactNode>;
  placement: ToastPlacement;
  closeLabel: string;
}

function ToastItem({ record, placement, closeLabel }: ToastItemProps) {
  const tone = record.tone ?? "neutral";
  const icon = record.icon === undefined ? TONE_ICON[tone] : record.icon;
  const closable = record.closable ?? tone !== "loading";
  const duration = toastStore.durationOf(record);
  const timed = Number.isFinite(duration) && duration > 0;

  const dismiss = useCallback(() => toastStore.dismiss(record.id), [record.id]);

  // Le retrait définitif est déclenché par une minuterie, pas par la fin de
  // l'animation : `animationend` ne se produit pas si l'animation n'a jamais
  // tourné — préférence de mouvement réduit, onglet en arrière-plan — et
  // l'annonce resterait alors dans le magasin pour toujours.
  useEffect(() => {
    if (record.open) return undefined;
    const timer = setTimeout(() => toastStore.remove(record.id), EXIT_DELAY);
    return () => clearTimeout(timer);
  }, [record.id, record.open]);

  // La fermeture automatique, suspendue au survol et au focus clavier.
  const [paused, setPaused] = useState(false);
  const remaining = useRef(duration);
  const startedAt = useRef(Date.now());

  // Une mise à jour — ce que fait `toast.promise` — rend son temps entier à
  // l'annonce : la nouvelle phrase doit pouvoir être lue.
  //
  // La remise à zéro se fait pendant le rendu, pas dans un effet. Un effet
  // s'exécuterait *après* celui qui arme la minuterie, qui lirait alors la
  // durée précédente. Quand elle valait `Infinity` — le cas d'une annonce
  // en chargement qui devient un succès — `setTimeout` reçoit une valeur
  // qui déborde son entier 32 bits et se déclenche immédiatement : la carte
  // de succès disparaissait avant d'avoir été vue.
  const signature = `${duration}|${record.title}|${record.description}|${record.tone}`;
  const lastSignature = useRef(signature);
  if (lastSignature.current !== signature) {
    lastSignature.current = signature;
    remaining.current = duration;
  }

  useEffect(() => {
    if (!timed || !record.open || paused) return undefined;
    if (!Number.isFinite(remaining.current)) return undefined;

    startedAt.current = Date.now();
    const timer = setTimeout(dismiss, remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current = Math.max(
        0,
        remaining.current - (Date.now() - startedAt.current),
      );
    };
  }, [dismiss, paused, record.open, signature, timed]);

  const swipe = useSwipeToDismiss(placement, dismiss);

  const run = (action: NonNullable<ToastRecord["action"]>) => {
    action.onSelect();
    if (action.dismiss ?? true) dismiss();
  };

  return (
    <div
      className={cn(
        "sia-toast",
        `sia-toast--${tone}`,
        `sia-toast--from-${edgeOf(placement)}`,
        record.className,
      )}
      data-state={record.open ? "open" : "closed"}
      data-swiping={swipe.swiping || undefined}
      style={swipe.style}
      // `alert` interrompt la lecture d'écran, `status` attend une pause. Une
      // erreur mérite l'interruption; une confirmation ne la mérite pas.
      role={tone === "danger" ? "alert" : "status"}
      aria-live={tone === "danger" ? "assertive" : "polite"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onPointerDown={swipe.onPointerDown}
      onPointerMove={swipe.onPointerMove}
      onPointerUp={swipe.onPointerUp}
      onPointerCancel={swipe.onPointerUp}
    >
      {record.render ? (
        record.render({ id: record.id, dismiss })
      ) : (
        <>
          {icon && (
            <span className="sia-toast__icon" aria-hidden="true">
              {icon}
            </span>
          )}

          <div className="sia-toast__body">
            {record.title && (
              <strong className="sia-toast__title">{record.title}</strong>
            )}
            {record.description && (
              <p className="sia-toast__description">{record.description}</p>
            )}

            {(record.action || record.cancel) && (
              <div className="sia-toast__actions">
                {record.action && (
                  <button
                    type="button"
                    className="sia-toast__action"
                    onClick={() => run(record.action!)}
                  >
                    {record.action.label}
                  </button>
                )}
                {record.cancel && (
                  <button
                    type="button"
                    className="sia-toast__cancel"
                    onClick={() => run(record.cancel!)}
                  >
                    {record.cancel.label}
                  </button>
                )}
              </div>
            )}
          </div>

          {closable && (
            <button
              type="button"
              className="sia-toast__close"
              aria-label={closeLabel}
              onClick={dismiss}
            >
              <XIcon />
            </button>
          )}

          {timed && record.open && (
            <span
              className="sia-toast__timer"
              style={{ animationDuration: `${duration}ms` }}
              data-paused={paused || undefined}
              aria-hidden="true"
            />
          )}
        </>
      )}
    </div>
  );
}

function edgeOf(placement: ToastPlacement): "left" | "right" | "center" {
  if (placement.endsWith("left")) return "left";
  if (placement.endsWith("center")) return "center";
  return "right";
}

/** Seuil, en pixels, au-delà duquel le geste ferme l'annonce. */
const SWIPE_THRESHOLD = 60;

/**
 * Balayer pour écarter.
 *
 * Le sens suit le bord le plus proche : une annonce à droite se chasse vers
 * la droite. Une pile au centre se chasse verticalement, vers le bord dont
 * elle vient.
 */
function useSwipeToDismiss(placement: ToastPlacement, dismiss: () => void) {
  const axis = placement.endsWith("center") ? "y" : "x";
  const sign = useMemo(() => {
    if (axis === "y") return placement.startsWith("top") ? -1 : 1;
    return placement.endsWith("left") ? -1 : 1;
  }, [axis, placement]);

  const origin = useRef<{ x: number; y: number } | null>(null);
  const [offset, setOffset] = useState(0);
  const [swiping, setSwiping] = useState(false);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    // Un clic sur un bouton n'est pas un balayage : capter le pointeur ici
    // avalerait l'action.
    if ((event.target as HTMLElement).closest("button")) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;

    origin.current = { x: event.clientX, y: event.clientY };
    setSwiping(true);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!origin.current) return;

    const delta =
      axis === "x"
        ? event.clientX - origin.current.x
        : event.clientY - origin.current.y;

    // Seul le sens de la sortie répond; tirer dans l'autre sens ne fait rien,
    // ce qui évite de décoller la carte de son bord.
    setOffset(delta * sign > 0 ? delta : 0);
  };

  const onPointerUp = () => {
    if (!origin.current) return;
    origin.current = null;
    setSwiping(false);

    if (Math.abs(offset) >= SWIPE_THRESHOLD) dismiss();
    else setOffset(0);
  };

  return {
    swiping,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    style:
      offset === 0
        ? undefined
        : ({
            transform:
              axis === "x"
                ? `translate3d(${offset}px, 0, 0)`
                : `translate3d(0, ${offset}px, 0)`,
            opacity: Math.max(0.3, 1 - Math.abs(offset) / 160),
          } as CSSProperties),
  };
}

export interface ToastProviderProps extends PropsWithChildren, ToasterProps {}

/**
 * Enveloppe les enfants et monte le `Toaster`.
 *
 * Aucun contexte : le magasin vit hors de React. Ce composant n'existe que
 * pour monter la pile au bon endroit sans y penser.
 */
export function ToastProvider({ children, ...props }: ToastProviderProps) {
  return (
    <>
      {children}
      <Toaster {...props} />
    </>
  );
}

/**
 * L'API des annonces, pour ceux qui préfèrent un hook.
 *
 * Elle rend exactement l'objet `toast`, dont l'identité ne change jamais :
 * l'appeler dans un `useCallback` ou un `useEffect` ne relance rien.
 */
export function useToast() {
  return toast;
}
