import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import { Tooltip, type TooltipProps } from "../Tooltip";
import { useComponentDefaults } from "@sia-ui/headless";
import "./styles.css";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  radius?: "default" | "none" | "sm" | "lg" | "full";
  tooltip?: Omit<TooltipProps, "children">;
}

/**
 * Une action réduite à son icône.
 *
 * `label` est obligatoire : une icône seule n'a pas de nom, et un lecteur
 * d'écran annoncerait « bouton » sans dire lequel. Le libellé sert aussi
 * d'infobulle — ce que l'icône signifie doit rester atteignable à la
 * souris comme au clavier.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ label, icon, variant: variantProp, size: sizeProp, radius: radiusProp, tooltip, className, type = "button", ...props }, ref) => {
    const defaults = useComponentDefaults<IconButtonProps>("iconButton");
    const variant = variantProp ?? defaults.variant ?? "ghost";
    const size = sizeProp ?? defaults.size ?? "md";
    const radius = radiusProp ?? defaults.radius ?? "default";
    const button = <button ref={ref} type={type} aria-label={label} {...(!tooltip ? { title: label } : {})} className={cn("sia-icon-button", `sia-icon-button--${variant}`, `sia-icon-button--${size}`, `sia-radius--${radius}`, className)} {...props}>{icon}</button>;
    return tooltip ? <Tooltip {...tooltip}>{button}</Tooltip> : button;
  }
);

IconButton.displayName = "IconButton";
