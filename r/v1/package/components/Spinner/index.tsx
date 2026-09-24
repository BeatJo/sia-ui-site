import { type HTMLAttributes } from "react";
import { cn } from "@sia-ui/utils";
import type { ComponentTone } from "@sia-ui/tokens";
import { useComponentDefaults } from "@sia-ui/headless";
import "./styles.css";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  label?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "dots" | "ring" | "double-ring";
  tone?: ComponentTone | "current";
}

/**
 * Une attente sans durée connue.
 *
 * Quand la durée est connue, une barre de progression en dit plus. Le ton
 * `current` reprend la couleur du texte environnant : un indicateur posé
 * dans un bouton doit suivre la couleur du bouton, pas celle du thème.
 */
export function Spinner({ label: labelProp, size: sizeProp, variant: variantProp, tone: toneProp, className, ...props }: SpinnerProps) {
  const defaults = useComponentDefaults<SpinnerProps>("spinner");
  const label = labelProp ?? defaults.label ?? "Chargement";
  const size = sizeProp ?? defaults.size ?? "md";
  const variant = variantProp ?? defaults.variant ?? "ring";
  const tone = toneProp ?? defaults.tone ?? "current";
  return (
    <span className={cn("sia-spinner-wrap", `sia-spinner-wrap--${tone}`, className)} role="status" {...props}>
      <span className={cn("sia-spinner", `sia-spinner--${size}`, `sia-spinner--${variant}`)} aria-hidden="true">
        {variant === "dots" && <span />}
      </span>
      <span className="sia-visually-hidden">{label}</span>
    </span>
  );
}
