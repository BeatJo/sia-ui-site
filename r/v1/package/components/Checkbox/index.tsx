import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn, toneClass } from "@sia-ui/utils";
import type { ComponentTone } from "@sia-ui/tokens";
import "./styles.css";

type CheckboxValue = string | number;
type CheckboxGroupContextValue = {
  value: CheckboxValue[];
  toggle: (value: CheckboxValue) => void;
  disabled: boolean | undefined;
  variant: "default" | "button";
  size: "sm" | "md" | "lg";
  tone: ComponentTone;
};
const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(
  null,
);

export interface CheckboxGroupProps {
  value?: CheckboxValue[];
  defaultValue?: CheckboxValue[];
  onValueChange?: (value: CheckboxValue[]) => void;
  disabled?: boolean;
  variant?: "default" | "button";
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  tone?: ComponentTone;
  className?: string;
  children: ReactNode;
}

/**
 * Une case, ou un groupe de cases.
 *
 * `CheckboxGroup` gère la liste des valeurs cochées; la case seule gère la
 * sienne. L'état indéterminé est une troisième valeur, pas un entre-deux
 * visuel : il dit « certains enfants sont cochés », ce qu'aucun booléen ne
 * sait exprimer.
 */
export function CheckboxGroup({
  value,
  defaultValue = [],
  onValueChange,
  disabled,
  variant = "default",
  orientation = "vertical",
  size = "md",
  tone = "primary",
  className,
  children,
}: CheckboxGroupProps) {
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;
  const toggle = (item: CheckboxValue) => {
    const next = current.includes(item)
      ? current.filter((value) => value !== item)
      : [...current, item];
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };
  return (
    <CheckboxGroupContext.Provider
      value={{ value: current, toggle, disabled, variant, size, tone }}
    >
      <div
        role="group"
        className={cn(
          "sia-checkbox-group",
          `sia-checkbox-group--${orientation}`,
          `sia-checkbox-group--${variant}`,
          toneClass("sia-tone", tone),
          className,
        )}
      >
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
}

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "size"
> {
  value?: CheckboxValue;
  label?: ReactNode;
  children?: ReactNode;
  description?: ReactNode;
  indeterminate?: boolean;
  onValueChange?: (checked: boolean) => void;
  size?: "sm" | "md" | "lg";
  tone?: ComponentTone;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      className,
      value,
      label,
      children,
      description,
      indeterminate = false,
      onValueChange,
      size = "md",
      tone = "primary",
      disabled,
      checked,
      defaultChecked,
      onChange,
      ...props
    },
    forwardedRef,
  ) {
    const group = useContext(CheckboxGroupContext);
    const localRef = useRef<HTMLInputElement>(null);
    const grouped = Boolean(group && value !== undefined);

    // Sans cet état, une case hors groupe et sans `checked` restait peinte
    // « décochée » pour toujours : l'`<input>` réel basculait bien, mais il est
    // masqué, et la case visible n'est dessinée que par la classe plus bas —
    // qui, elle, ne bougeait pas.
    const [internalChecked, setInternalChecked] = useState(
      Boolean(defaultChecked),
    );
    const isControlled = checked !== undefined;
    const resolvedChecked = grouped
      ? group!.value.includes(value!)
      : isControlled
        ? checked
        : internalChecked;
    const resolvedDisabled = Boolean(disabled || group?.disabled);
    const resolvedSize = group?.size ?? size;
    const resolvedTone = group?.tone ?? tone;
    const variant = group?.variant ?? "default";
    useEffect(() => {
      if (localRef.current) localRef.current.indeterminate = indeterminate;
    }, [indeterminate]);
    const setRef = (node: HTMLInputElement | null) => {
      localRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    };
    return (
      <label
        className={cn(
          "sia-checkbox",
          `sia-checkbox--${variant}`,
          `sia-checkbox--${resolvedSize}`,
          toneClass("sia-tone", resolvedTone),
          resolvedChecked && "sia-checkbox--checked",
          indeterminate && "sia-checkbox--indeterminate",
          resolvedDisabled && "sia-checkbox--disabled",
          className,
        )}
      >
        <input
          {...props}
          ref={setRef}
          // Le contrôle natif reste focusable et annoncé, mais sorti du rendu :
          // en simple `opacity:0` il restait peint sous la case, et son propre
          // dessin clignotait au clic.
          className="sia-visually-hidden"
          type="checkbox"
          value={value}
          checked={resolvedChecked}
          disabled={resolvedDisabled}
          onChange={(event) => {
            if (grouped) group!.toggle(value!);
            else if (!isControlled) setInternalChecked(event.target.checked);
            onValueChange?.(event.target.checked);
            onChange?.(event);
          }}
        />
        <span className="sia-checkbox__box" aria-hidden="true">
          <span />
        </span>
        {(label ?? children ?? description) && (
          <span className="sia-checkbox__content">
            {(label ?? children) && (
              <span className="sia-checkbox__label">{label ?? children}</span>
            )}
            {description && (
              <span className="sia-checkbox__description">{description}</span>
            )}
          </span>
        )}
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";
