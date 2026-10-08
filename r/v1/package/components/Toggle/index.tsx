import { useCallback, type ReactNode } from "react";
import { cn, toneClass } from "@sia-ui/utils";
import type { ComponentSize, ComponentTone } from "@sia-ui/tokens";
import { useControllableState } from "@sia-ui/react";
import "./styles.css";

export interface ToggleProps {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  children?: ReactNode;
  icon?: ReactNode;
  /** Obligatoire quand le contenu se réduit à une icône. */
  ariaLabel?: string;
  size?: ComponentSize;
  tone?: ComponentTone;
  variant?: "solid" | "outline" | "ghost";
  disabled?: boolean;
  className?: string;
}

/**
 * Un bouton à deux états.
 *
 * Ce n'est pas un `Switch` : un interrupteur décrit un réglage qui persiste,
 * une bascule décrit un état de l'interface ici et maintenant — gras, filtre
 * actif, colonne affichée. `aria-pressed` porte cette différence.
 */
export function Toggle({
  pressed: pressedProp,
  defaultPressed = false,
  onPressedChange,
  children,
  icon,
  ariaLabel,
  size = "md",
  tone = "primary",
  variant = "ghost",
  disabled = false,
  className,
}: ToggleProps) {
  const [pressed, setPressed] = useControllableState({
    value: pressedProp,
    defaultValue: defaultPressed,
    onChange: onPressedChange,
  });

  return (
    <button
      type="button"
      className={cn(
        "sia-toggle",
        `sia-toggle--${size}`,
        `sia-toggle--${variant}`,
        toneClass("sia-toggle", tone),
        className,
      )}
      aria-pressed={pressed}
      {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
      disabled={disabled}
      onClick={() => setPressed(!pressed)}
    >
      {icon && <span className="sia-toggle__icon" aria-hidden="true">{icon}</span>}
      {children && <span className="sia-toggle__label">{children}</span>}
    </button>
  );
}

export interface ToggleGroupOption {
  value: string;
  label?: ReactNode;
  icon?: ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
}

export interface ToggleGroupProps {
  options: ToggleGroupOption[];
  /** `single` : une valeur ou aucune. `multiple` : un tableau. */
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  /** Une chaîne en `single`, un tableau en `multiple` — comme `value`. */
  onValueChange?: (value: string | string[]) => void;
  size?: ComponentSize;
  tone?: ComponentTone;
  /** Autorise à tout désélectionner en `single`. */
  deselectable?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

/**
 * Plusieurs bascules qui partagent une valeur.
 *
 * Le repère glisse d'une option à l'autre au lieu de sauter : c'est la même
 * idée que les onglets, et c'est ce qui rend le changement lisible.
 */
export function ToggleGroup({
  options,
  type = "single",
  value: valueProp,
  defaultValue,
  onValueChange,
  size = "md",
  tone = "primary",
  deselectable = true,
  disabled = false,
  ariaLabel,
  className,
}: ToggleGroupProps) {
  const fallback: string | string[] = type === "single" ? "" : [];
  const [value, setValue] = useControllableState<string | string[]>({
    value: valueProp,
    defaultValue: defaultValue ?? fallback,
    ...(onValueChange ? { onChange: onValueChange } : {}),
  });

  const selected = useCallback(
    (option: string) =>
      Array.isArray(value) ? value.includes(option) : value === option,
    [value],
  );

  const toggle = useCallback(
    (option: string) => {
      if (Array.isArray(value)) {
        setValue(
          value.includes(option)
            ? value.filter((entry) => entry !== option)
            : [...value, option],
        );
        return;
      }
      if (value === option) setValue(deselectable ? "" : option);
      else setValue(option);
    },
    [deselectable, setValue, value],
  );

  return (
    <div
      className={cn(
        "sia-toggle-group",
        `sia-toggle-group--${size}`,
        toneClass("sia-toggle-group", tone),
        className,
      )}
      role={type === "single" ? "radiogroup" : "group"}
      {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
    >
      {options.map((option) => {
        const on = selected(option.value);
        return (
          <button
            key={option.value}
            type="button"
            className="sia-toggle-group__item"
            data-selected={on || undefined}
            {...(type === "single"
              ? { role: "radio" as const, "aria-checked": on }
              : { "aria-pressed": on })}
            {...(option.ariaLabel ? { "aria-label": option.ariaLabel } : {})}
            disabled={disabled || option.disabled}
            onClick={() => toggle(option.value)}
          >
            {option.icon && (
              <span className="sia-toggle-group__icon" aria-hidden="true">
                {option.icon}
              </span>
            )}
            {option.label && (
              <span className="sia-toggle-group__label">{option.label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
