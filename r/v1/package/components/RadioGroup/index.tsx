import { createContext, useContext, useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { cn, toneClass } from "@sia-ui/utils";
import type { ComponentTone } from "@sia-ui/tokens";
import "./styles.css";

type RadioValue = string | number;
type RadioContextValue = { name: string; value: RadioValue | undefined; setValue: (value: RadioValue) => void; disabled: boolean | undefined; size: "sm" | "md" | "lg"; tone: ComponentTone; };
const RadioGroupContext = createContext<RadioContextValue | null>(null);

export interface RadioGroupProps {
  id?: string; name?: string; label?: ReactNode; value?: RadioValue; defaultValue?: RadioValue; onValueChange?: (value: RadioValue) => void; orientation?: "horizontal" | "vertical"; disabled?: boolean; size?: "sm" | "md" | "lg"; tone?: ComponentTone; className?: string; "aria-describedby"?: string; "aria-labelledby"?: string; "aria-invalid"?: boolean; "aria-required"?: boolean; children: ReactNode;
}
/**
 * Un choix parmi plusieurs, tous visibles.
 *
 * Au-delà de cinq ou six options, une liste déroulante lit mieux : des
 * boutons radio en montrent la totalité, ce qui est leur intérêt tant qu'on
 * peut encore les embrasser du regard.
 */
export function RadioGroup({ id, name, label, value, defaultValue, onValueChange, orientation = "vertical", disabled, size = "md", tone = "primary", className, children, ...ariaProps }: RadioGroupProps) {
  const generatedName = useId(); const [internal, setInternal] = useState(defaultValue); const current = value ?? internal;
  const setValue = (next: RadioValue) => { if (value === undefined) setInternal(next); onValueChange?.(next); };
  return <fieldset id={id} className={cn("sia-radio-group", `sia-radio-group--${orientation}`, toneClass("sia-tone", tone), className)} disabled={disabled} {...ariaProps}>{label && <legend className="sia-radio-group__legend">{label}</legend>}<RadioGroupContext.Provider value={{ name: name ?? generatedName, value: current, setValue, disabled, size, tone }}>{children}</RadioGroupContext.Provider></fieldset>;
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "name" | "value" | "size"> { value: RadioValue; label?: ReactNode; children?: ReactNode; }
export function Radio({ value, label, children, className, disabled, onChange, ...props }: RadioProps) {
  const group = useContext(RadioGroupContext); if (!group) throw new Error("Radio must be used inside RadioGroup."); const checked = group.value === value; const resolvedDisabled = Boolean(disabled || group.disabled);
  return <label className={cn("sia-radio", `sia-radio--${group.size}`, toneClass("sia-tone", group.tone), checked && "sia-radio--checked", resolvedDisabled && "sia-radio--disabled", className)}><input {...props} className="sia-visually-hidden" type="radio" name={group.name} value={value} checked={checked} disabled={resolvedDisabled} onChange={(event) => { group.setValue(value); onChange?.(event); }} /><span className="sia-radio__dot" aria-hidden="true" /><span className="sia-radio__label">{label ?? children}</span></label>;
}

export interface RadioButtonProps { value: RadioValue; disabled?: boolean; children: ReactNode; className?: string; }
export function RadioButton({ value, disabled, children, className }: RadioButtonProps) {
  const group = useContext(RadioGroupContext); if (!group) throw new Error("RadioButton must be used inside RadioGroup."); const checked = group.value === value; const resolvedDisabled = Boolean(disabled || group.disabled);
  return <button type="button" role="radio" aria-checked={checked} disabled={resolvedDisabled} className={cn("sia-radio-button", `sia-radio-button--${group.size}`, toneClass("sia-tone", group.tone), checked && "sia-radio-button--checked", className)} onClick={() => group.setValue(value)}>{children}</button>;
}
