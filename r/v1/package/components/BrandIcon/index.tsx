import { type CSSProperties, type SVGAttributes } from "react";
import { cn } from "@sia-ui/utils";
import { luminance } from "@sia-ui/tokens";
import "./styles.css";

/**
 * Une icône de marque, dans la forme d'un objet `simple-icons` : `path` est
 * le tracé d'un SVG 24×24, `hex` la couleur de la marque, sans dièse.
 */
export interface BrandIconData {
  title: string;
  path: string;
  hex: string;
}

export interface BrandIconProps
  extends Omit<SVGAttributes<SVGSVGElement>, "children" | "title"> {
  icon: BrandIconData;
  /** La taille du carré. `1em` par défaut : l'icône suit le texte. */
  size?: number | string;
  /** La couleur de la marque (défaut), ou `currentColor` quand il vaut `false`. */
  colored?: boolean;
  /** Le nom accessible. Par défaut, `icon.title`. */
  title?: string;
  /** Masquée des lecteurs d'écran : l'icône accompagne un texte qui la nomme déjà. */
  decorative?: boolean;
}

/** En dessous, la marque est quasi noire ; au-dessus, quasi blanche. */
const SOMBRE = 0.08;
const CLAIRE = 0.85;

/**
 * Le logo d'un service tiers — Vercel, Supabase, GitHub — sans dépendance.
 *
 * Le système ne livre aucun logo : il prend l'objet d'icône que le projet
 * importe lui-même, et ne dépend donc ni d'un paquet d'icônes ni de sa
 * version.
 *
 * ```tsx
 * import { siVercel } from "simple-icons";
 * <BrandIcon icon={siVercel} />
 * ```
 *
 * Une marque quasi noire (Vercel, GitHub) disparaîtrait sur un fond sombre,
 * une marque quasi blanche sur un fond clair : sur le thème où elle serait
 * illisible, elle prend la couleur du texte plutôt que la sienne.
 */
export function BrandIcon({
  icon,
  size = "1em",
  colored = true,
  title,
  decorative = false,
  className,
  style,
  ...props
}: BrandIconProps) {
  const name = title ?? icon.title;
  const lum = colored ? luminance(icon.hex) : undefined;
  const contrast =
    lum === undefined || Number.isNaN(lum)
      ? undefined
      : lum < SOMBRE
        ? "dark"
        : lum > CLAIRE
          ? "light"
          : undefined;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      focusable="false"
      {...(decorative
        ? { "aria-hidden": true }
        : { role: "img", "aria-label": name })}
      {...props}
      className={cn(
        "sia-brand-icon",
        colored && "sia-brand-icon--colored",
        contrast && `sia-brand-icon--${contrast}`,
        className,
      )}
      style={
        colored
          ? ({
              "--sia-brand-icon-color": `#${icon.hex.replace(/^#/, "")}`,
              ...style,
            } as CSSProperties)
          : style
      }
    >
      {!decorative && <title>{name}</title>}
      <path d={icon.path} />
    </svg>
  );
}
