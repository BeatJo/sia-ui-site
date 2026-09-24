import { cn } from "@sia-ui/utils";
export interface YearPickerProps { value?: number; defaultValue?: number; min?: number; max?: number; onValueChange?: (year: number) => void; className?: string; }
/**
 * Une année, choisie dans une plage.
 *
 * Les bornes sont déclarées parce qu'elles dépendent du sujet : une année
 * d'exercice comptable et une année de naissance n'ouvrent pas la même
 * liste.
 */
export function YearPicker({ value, defaultValue = new Date().getFullYear(), min = 1970, max = new Date().getFullYear() + 20, onValueChange, className }: YearPickerProps) { const years = Array.from({ length: Math.max(0, max - min + 1) }, (_, index) => max - index); return <select className={cn("sia-year-picker", className)} value={value} defaultValue={value === undefined ? defaultValue : undefined} onChange={(event) => onValueChange?.(Number(event.target.value))}>{years.map((year) => <option key={year} value={year}>{year}</option>)}</select>; }
