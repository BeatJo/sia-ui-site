import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import { Spinner, type SpinnerProps } from "../Spinner";
import { Tooltip, type TooltipProps } from "../Tooltip";
import { useComponentDefaults } from "@sia-ui/headless";
import type { ComponentTone } from "@sia-ui/tokens";
import "./styles.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost";
  /**
   * Le ton sémantique de l'action.
   *
   * `.sia-button--danger` existait dans la feuille de style sans qu'aucune
   * prop ne permette de l'atteindre : une action de suppression ne pouvait pas
   * être rouge sans `className` manuel.
   */
  tone?: ComponentTone;
  size?: "sm" | "md" | "lg";
  radius?: "default" | "none" | "sm" | "lg" | "full";
  loading?: boolean;
  loadingLabel?: string;
  spinnerProps?: Omit<SpinnerProps, "label">;
  tooltip?: Omit<TooltipProps, "children">;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

/**
 * L'action, sous toutes ses formes.
 *
 * Le chargement y est un état et non un remplacement : le bouton garde sa
 * taille et son libellé pendant l'appel. Un bouton qui devient un rond
 * tournant fait bouger la mise en page, et le clic suivant tombe à côté.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant: variantProp,
      tone: toneProp,
      size: sizeProp,
      radius: radiusProp,
      loading,
      loadingLabel: loadingLabelProp,
      spinnerProps,
      tooltip,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const defaults = useComponentDefaults<ButtonProps>("button");
    const variant = variantProp ?? defaults.variant ?? "solid";
    const tone = toneProp ?? defaults.tone ?? "primary";
    const size = sizeProp ?? defaults.size ?? "md";
    const radius = radiusProp ?? defaults.radius ?? "default";
    const loadingLabel =
      loadingLabelProp ?? defaults.loadingLabel ?? "Chargement";
    const button = (
      <button
        ref={ref}
        type="button"
        className={cn(
          "sia-button",
          `sia-button--${variant}`,
          `sia-button--${tone}`,
          `sia-button--${size}`,
          `sia-radius--${radius}`,
          className,
        )}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <Spinner
            size="sm"
            tone="current"
            {...spinnerProps}
            label={loadingLabel}
          />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!loading && rightIcon}
      </button>
    );

    return tooltip ? <Tooltip {...tooltip}>{button}</Tooltip> : button;
  },
);

Button.displayName = "Button";
