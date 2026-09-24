import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import { Spinner, type SpinnerProps } from "../Spinner";
import type { ComponentTone } from "@sia-ui/tokens";
import { useComponentDefaults } from "@sia-ui/headless";
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
  const loadingLabel = loadingLabelProp ?? defaults.loadingLabel ?? "Chargement";
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
