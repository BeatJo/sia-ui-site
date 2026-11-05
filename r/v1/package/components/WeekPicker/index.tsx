import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@sia-ui/utils";
export interface WeekPickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> { onValueChange?: (value: string) => void; invalid?: boolean; }
/**
 * Une semaine, désignée par son numéro.
 *
 * Le numéro de semaine est l'unité des plannings et des relevés d'activité,
 * et il ne se déduit pas d'une date sans convention — celle du navigateur
 * est celle de la norme ISO.
 */
export const WeekPicker = forwardRef<HTMLInputElement, WeekPickerProps>(({ onValueChange, invalid, className, ...props }, ref) => <input {...props} ref={ref} type="week" className={cn("sia-week-picker", invalid && "sia-picker--invalid", className)} aria-invalid={invalid || undefined} onChange={(event) => onValueChange?.(event.target.value)} />);
WeekPicker.displayName = "WeekPicker";
