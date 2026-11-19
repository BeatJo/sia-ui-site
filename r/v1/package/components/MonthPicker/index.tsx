import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@sia-ui/utils";
export interface MonthPickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> { onValueChange?: (value: string) => void; invalid?: boolean; }
/**
 * Un mois, sans le jour.
 *
 * C'est le grain d'un exercice comptable ou d'un rapport mensuel : demander
 * un jour obligerait à en choisir un arbitrairement, et le premier du mois
 * finirait par être pris pour une vraie date.
 */
export const MonthPicker = forwardRef<HTMLInputElement, MonthPickerProps>(({ onValueChange, invalid, className, ...props }, ref) => <input {...props} ref={ref} type="month" className={cn("sia-month-picker", invalid && "sia-picker--invalid", className)} aria-invalid={invalid || undefined} onChange={(event) => onValueChange?.(event.target.value)} />);
MonthPicker.displayName = "MonthPicker";
