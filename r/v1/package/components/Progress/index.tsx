import { type ReactNode } from "react";
import { cn, toneClass } from "@sia-ui/utils";
import type { ComponentSize, ComponentTone } from "@sia-ui/tokens";
import { useComponentDefaults, useSiaLocale } from "@sia-ui/headless";
import "./styles.css";

export interface ProgressProps {
  /** La valeur courante. Omise, la barre passe en indéterminé. */
  value?: number | undefined;
  max?: number;
  shape?: "bar" | "circle";
  tone?: ComponentTone;
  size?: ComponentSize;
  /** Épaisseur du trait, en pixels. Par défaut selon la taille. */
  thickness?: number | undefined;
  /** Affiche le pourcentage — au centre du cercle, en bout de barre. */
  showValue?: boolean;
  /** Remplace l'affichage par défaut. */
  format?: ((percent: number, value: number, max: number) => ReactNode) | undefined;
  label?: ReactNode;
  className?: string;
}

const BAR_HEIGHT: Record<ComponentSize, number> = { sm: 4, md: 8, lg: 12 };
const CIRCLE_SIZE: Record<ComponentSize, number> = { sm: 36, md: 56, lg: 84 };
const CIRCLE_STROKE: Record<ComponentSize, number> = { sm: 4, md: 6, lg: 8 };

/**
 * L'avancement d'une tâche.
 *
 * Sans `value`, le composant passe en indéterminé plutôt que d'afficher zéro :
 * « je travaille » et « je n'ai rien fait » ne se ressemblent pas.
 */
export function Progress(props: ProgressProps) {
  const defaults = useComponentDefaults<ProgressProps>("progress");
  const {
    value,
    max = 100,
    shape = "bar",
    tone = "primary",
    size = "md",
    thickness,
    showValue = false,
    format,
    label,
    className,
  } = { ...defaults, ...props };

  const locale = useSiaLocale();
  const indeterminate = value === undefined || value === null;
  const safeMax = max > 0 ? max : 100;
  const clamped = indeterminate ? 0 : Math.min(Math.max(value, 0), safeMax);
  const percent = Math.round((clamped / safeMax) * 100);
  const text = format
    ? format(percent, clamped, safeMax)
    : `${percent}\u00A0%`;

  const aria = {
    role: "progressbar" as const,
    "aria-valuemin": 0,
    "aria-valuemax": safeMax,
    ...(indeterminate ? {} : { "aria-valuenow": clamped }),
    ...(indeterminate ? { "aria-label": locale.loading } : {}),
  };

  if (shape === "circle") {
    const box = CIRCLE_SIZE[size];
    const stroke = thickness ?? CIRCLE_STROKE[size];
    const radius = (box - stroke) / 2;
    const circumference = 2 * Math.PI * radius;

    return (
      <div
        className={cn(
          "sia-progress",
          "sia-progress--circle",
          toneClass("sia-progress", tone),
          indeterminate && "sia-progress--indeterminate",
          className,
        )}
        {...aria}
      >
        <svg width={box} height={box} viewBox={`0 0 ${box} ${box}`} aria-hidden="true">
          <circle
            className="sia-progress__track"
            cx={box / 2}
            cy={box / 2}
            r={radius}
            strokeWidth={stroke}
          />
          <circle
            className="sia-progress__indicator"
            cx={box / 2}
            cy={box / 2}
            r={radius}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            // Le trait se dessine par le décalage du pointillé : une seule
            // propriété animée, sur le compositeur, sans reflow.
            strokeDashoffset={
              indeterminate
                ? circumference * 0.75
                : circumference - (clamped / safeMax) * circumference
            }
          />
        </svg>
        {(showValue || label) && (
          <span className="sia-progress__center">
            {showValue && !indeterminate && (
              <strong className="sia-progress__value">{text}</strong>
            )}
            {label && <span className="sia-progress__label">{label}</span>}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "sia-progress",
        "sia-progress--bar",
        toneClass("sia-progress", tone),
        indeterminate && "sia-progress--indeterminate",
        className,
      )}
    >
      {(label || (showValue && !indeterminate)) && (
        <div className="sia-progress__header">
          {label && <span className="sia-progress__label">{label}</span>}
          {showValue && !indeterminate && (
            <span className="sia-progress__value">{text}</span>
          )}
        </div>
      )}
      <div
        className="sia-progress__track"
        style={{ height: thickness ?? BAR_HEIGHT[size] }}
        {...aria}
      >
        <div
          className="sia-progress__indicator"
          style={indeterminate ? undefined : { width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
