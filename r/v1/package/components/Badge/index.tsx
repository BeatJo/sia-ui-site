import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import { Spinner, type SpinnerProps } from "../Spinner";
import type { ComponentTone } from "@sia-ui/tokens";
import { useComponentDefaults, useSiaLocale } from "@sia-ui/headless";
import "./styles.css";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: ComponentTone;
  variant?: "soft" | "solid" | "outline";
  left?: ReactNode;
  right?: ReactNode;
  loading?: boolean;
  loadingLabel?: string;
  spinnerProps?: Omit<SpinnerProps, "label">;
}

/**
 * Une étiquette d'état, courte et dense.
 *
 * Elle porte un ton, jamais une action : un badge cliquable se confond avec
 * un bouton petit, et l'on découvre qu'il ne l'était pas en cliquant. Ce
 * qui agit est un bouton.
 */
export function Badge({
  tone: toneProp,
  variant: variantProp,
  left,
  right,
  loading = false,
  loadingLabel: loadingLabelProp,
  spinnerProps,
  className,
  children,
  ...props
}: BadgeProps) {
  const defaults = useComponentDefaults<BadgeProps>("badge");
  const tone = toneProp ?? defaults.tone ?? "neutral";
  const variant = variantProp ?? defaults.variant ?? "soft";
  const locale = useSiaLocale();
  const loadingLabel = loadingLabelProp ?? defaults.loadingLabel ?? locale.loading;
  return (
    <span
      className={cn(
        "sia-badge",
        `sia-badge--${tone}`,
        `sia-badge--${variant}`,
        loading && "sia-badge--loading",
        className,
      )}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <span className="sia-badge__left">
          <Spinner
            size="xs"
            tone="current"
            {...spinnerProps}
            label={loadingLabel}
          />
        </span>
      ) : (
        left && <span className="sia-badge__left">{left}</span>
      )}
      <span className="sia-badge__content">{children}</span>
      {right && <span className="sia-badge__right">{right}</span>}
    </span>
  );
}

/**
 * Le ton d'une valeur, lu dans une table de correspondance.
 *
 * Un statut, une action de journal, un environnement : chaque écran tenait
 * sa propre table et sa propre fonction pour la lire. Celle-ci est la seule.
 *
 * ```ts
 * const TONS = { payee: "success", attente: "warning", annulee: "danger" };
 * toneOf(TONS, facture.statut); // "success" | … | "neutral"
 * ```
 */
export function toneOf(
  tones: Readonly<Record<string, ComponentTone>> | undefined,
  value: unknown,
  fallback: ComponentTone = "neutral",
): ComponentTone {
  if (value === null || value === undefined) return fallback;
  return tones?.[String(value)] ?? fallback;
}

export interface StatusBadgeProps extends Omit<BadgeProps, "tone" | "children"> {
  /** La valeur brute : `"payee"`, `"prod"`, `"delete"`. */
  value: string | number | null | undefined;
  /** Le ton de chaque valeur. */
  tones?: Readonly<Record<string, ComponentTone>>;
  /** Le libellé de chaque valeur. À défaut, la valeur elle-même. */
  labels?: Readonly<Record<string, ReactNode>>;
  /** Le ton d'une valeur absente de `tones`. `neutral` par défaut. */
  fallbackTone?: ComponentTone;
  /** Ce qui s'affiche sans valeur. Rien par défaut. */
  empty?: ReactNode;
}

/**
 * Une valeur rendue en pastille, ton et libellé tirés de deux tables.
 *
 * Déclarées une fois par domaine — les statuts de facture, les actions du
 * journal — puis passées partout où la valeur s'affiche : colonne libre,
 * détail, carte. Une valeur inconnue garde une pastille neutre plutôt que de
 * disparaître.
 */
export function StatusBadge({
  value,
  tones,
  labels,
  fallbackTone = "neutral",
  empty = null,
  ...props
}: StatusBadgeProps) {
  if (value === null || value === undefined || value === "") return <>{empty}</>;
  const brut = String(value);
  return (
    <Badge tone={toneOf(tones, brut, fallbackTone)} {...props}>
      {labels?.[brut] ?? brut}
    </Badge>
  );
}
