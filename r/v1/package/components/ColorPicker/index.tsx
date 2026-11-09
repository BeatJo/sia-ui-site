import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";
export interface ColorPickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> { onValueChange?: (value: string) => void; showValue?: boolean; }
/**
 * Le choix d'une couleur.
 *
 * La valeur hexadécimale est affichée à côté du nuancier : deux bleus
 * voisins ne se distinguent pas à l'œil sur un écran mal calibré, alors que
 * leurs codes, si.
 */
export const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>(({ className, onValueChange, showValue = true, value, defaultValue = "#2563eb", ...props }, ref) => { const [internal, setInternal] = useState(String(defaultValue)); const current = value === undefined ? internal : String(value); return <span className={cn("sia-color-picker", className)}><input {...props} ref={ref} type="color" value={current} onChange={(event) => { if (value === undefined) setInternal(event.target.value); onValueChange?.(event.target.value); }} />{showValue && <code>{current}</code>}</span>; });
ColorPicker.displayName = "ColorPicker";
