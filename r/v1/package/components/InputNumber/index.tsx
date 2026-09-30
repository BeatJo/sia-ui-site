import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { cn } from "@sia-ui/utils";
import { useSiaLocale } from "@sia-ui/headless";
import { Input, type InputProps } from "../Input";
import { MinusIcon, PlusIcon } from "../Icons";
import "./styles.css";

export interface InputNumberProps
  extends Omit<InputProps, "value" | "defaultValue" | "onChange" | "type" | "right"> {
  value?: number | null;
  defaultValue?: number | null;
  onValueChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Nombre de décimales. Omis, la saisie est laissée telle quelle. */
  precision?: number;
  /** Cache les boutons et ne garde que les flèches du clavier. */
  hideControls?: boolean;
  /** Unité affichée à droite : kg, %, jours. */
  suffix?: string;
}

function clamp(value: number, min: number | undefined, max: number | undefined) {
  if (min !== undefined && value < min) return min;
  if (max !== undefined && value > max) return max;
  return value;
}

/**
 * Une saisie numérique avec incrément.
 *
 * Le champ reste en `type="text"` avec `inputMode="decimal"` : le `number`
 * natif refuse `maxLength`, accepte `1e5` et `--`, et perd silencieusement sa
 * valeur quand elle ne lui plaît pas. On garde le clavier numérique sur
 * mobile, on renonce au reste.
 */
export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      value: valueProp,
      defaultValue = null,
      onValueChange,
      min,
      max,
      step = 1,
      precision,
      hideControls = false,
      suffix,
      disabled,
      className,
      onBlur,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const locale = useSiaLocale();
    const controlled = valueProp !== undefined;
    const [internal, setInternal] = useState<number | null>(defaultValue);
    const value = controlled ? valueProp : internal;

    const format = useCallback(
      (next: number | null) =>
        next === null
          ? ""
          : precision !== undefined
            ? next.toFixed(precision)
            : String(next),
      [precision],
    );

    // Le texte est tenu à part du nombre : « 12, » et « 0, » sont des états
    // de frappe valides qui ne correspondent encore à aucune valeur.
    const [text, setText] = useState(() => format(value));
    const editing = useRef(false);

    useEffect(() => {
      if (!editing.current) setText(format(value));
    }, [format, value]);

    const commit = useCallback(
      (next: number | null) => {
        if (!controlled) setInternal(next);
        onValueChange?.(next);
      },
      [controlled, onValueChange],
    );

    const nudge = useCallback(
      (direction: 1 | -1) => {
        const base = value ?? min ?? 0;
        const raw = base + direction * step;
        // Le pas flottant produit 0.30000000000000004 : on arrondit au
        // nombre de décimales du pas, qui est la précision voulue.
        const decimals =
          precision ?? (String(step).split(".")[1]?.length ?? 0);
        const next = clamp(Number(raw.toFixed(decimals)), min, max);
        commit(next);
        setText(format(next));
      },
      [commit, format, max, min, precision, step, value],
    );

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;
      if (event.key === "ArrowUp") {
        event.preventDefault();
        nudge(1);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        nudge(-1);
      }
    };

    const atMin = min !== undefined && value !== null && value <= min;
    const atMax = max !== undefined && value !== null && value >= max;

    return (
      <Input
        {...props}
        ref={ref}
        type="text"
        inputMode="decimal"
        className={cn("sia-input-number", className)}
        disabled={disabled}
        value={text}
        role="spinbutton"
        {...(min !== undefined ? { "aria-valuemin": min } : {})}
        {...(max !== undefined ? { "aria-valuemax": max } : {})}
        {...(value !== null ? { "aria-valuenow": value } : {})}
        onChange={(event) => {
          editing.current = true;
          const raw = event.target.value;
          setText(raw);
          if (raw.trim() === "") {
            commit(null);
            return;
          }
          // La virgule est le séparateur décimal du clavier français.
          const parsed = Number(raw.replace(",", "."));
          if (Number.isFinite(parsed)) commit(parsed);
        }}
        onBlur={(event) => {
          editing.current = false;
          // Le recadrage attend la sortie du champ : borner pendant la frappe
          // transforme un « 5 » en route vers « 50 » en « 9 » sous les doigts.
          const next = value === null ? null : clamp(value, min, max);
          if (next !== value) commit(next);
          setText(format(next));
          onBlur?.(event);
        }}
        onKeyDown={handleKeyDown}
        right={
          hideControls && !suffix ? undefined : (
            <span className="sia-input-number__side">
              {suffix && <span className="sia-input-number__suffix">{suffix}</span>}
              {!hideControls && (
                <span className="sia-input-number__controls">
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-label={locale.decrement}
                    disabled={disabled || atMin}
                    onClick={() => nudge(-1)}
                  >
                    <MinusIcon />
                  </button>
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-label={locale.increment}
                    disabled={disabled || atMax}
                    onClick={() => nudge(1)}
                  >
                    <PlusIcon />
                  </button>
                </span>
              )}
            </span>
          )
        }
      />
    );
  },
);

InputNumber.displayName = "InputNumber";
