import { useSiaLocale } from "@sia-ui/headless";
import { useColorMode } from "@sia-ui/react";
import { IconButton, type IconButtonProps } from "../IconButton";
import { MoonIcon, SunIcon } from "../Icons";

export interface ColorModeToggleProps
  extends Partial<Omit<IconButtonProps, "icon" | "onClick" | "aria-pressed">> {
  /** Le nom du bouton en mode clair. Par défaut, celui de la locale. */
  darkLabel?: string;
  /** Le nom du bouton en mode sombre. Par défaut, celui de la locale. */
  lightLabel?: string;
}

/**
 * Le bouton de bascule clair / sombre.
 *
 * Il lit et écrit le mode de `SiaProvider` — persistance et script
 * anti-clignotement compris — plutôt que de tenir le sien. L'icône montre le
 * mode vers lequel on part, comme le libellé : le soleil en mode sombre.
 * Toutes les props d'`IconButton` passent, sauf ce qu'il pilote.
 */
export function ColorModeToggle({
  darkLabel: darkLabelProp,
  lightLabel: lightLabelProp,
  variant = "ghost",
  ...props
}: ColorModeToggleProps) {
  const m = useSiaLocale().colorModeToggle;
  const darkLabel = darkLabelProp ?? m.toDark;
  const lightLabel = lightLabelProp ?? m.toLight;
  const { resolvedColorMode, toggleColorMode } = useColorMode();
  const sombre = resolvedColorMode === "dark";

  return (
    <IconButton
      variant={variant}
      {...props}
      label={props.label ?? (sombre ? lightLabel : darkLabel)}
      icon={sombre ? <SunIcon /> : <MoonIcon />}
      aria-pressed={sombre}
      onClick={toggleColorMode}
    />
  );
}
