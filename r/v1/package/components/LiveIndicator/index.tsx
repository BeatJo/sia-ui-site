import { type HTMLAttributes } from "react";
import { cn } from "@sia-ui/utils";
import { useSiaLocale } from "@sia-ui/headless";
import "./styles.css";

export type LiveStatus = "connecting" | "open" | "closed";

export interface LiveIndicatorProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** L'état de la connexion — `useRealtimeStatus(source)` le fournit. */
  status: LiveStatus;
  /** Les libellés de chaque état. Par défaut, ceux de la locale. */
  labels?: Partial<Record<LiveStatus, string>>;
  /** Le point seul, le libellé restant pour les lecteurs d'écran. */
  compact?: boolean;
}

/**
 * Dit si l'écran se met à jour tout seul.
 *
 * Sans lui, une liste qui ne bouge plus après une coupure réseau ressemble à
 * une liste à jour. Le point pulse en direct, clignote en connexion, s'éteint
 * hors ligne ; le libellé est annoncé quand il change.
 */
export function LiveIndicator({
  status,
  labels,
  compact = false,
  className,
  ...props
}: LiveIndicatorProps) {
  const locale = useSiaLocale();
  const libelle = labels?.[status] ?? locale.liveIndicator[status];
  return (
    <span
      role="status"
      className={cn("sia-live", `sia-live--${status}`, compact && "sia-live--compact", className)}
      {...props}
    >
      <span className="sia-live__dot" aria-hidden="true" />
      <span className={compact ? "sia-visually-hidden" : "sia-live__label"}>{libelle}</span>
    </span>
  );
}
