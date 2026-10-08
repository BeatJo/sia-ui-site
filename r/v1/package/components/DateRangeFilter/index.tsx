import { type ReactNode } from "react";
import { DateRangePicker, type DateRangePickerProps, type DateRangeValue } from "../DateRangePicker";
import { cn } from "@sia-ui/utils";
import { useSiaLocale } from "@sia-ui/headless";
import "./styles.css";

export interface DateRangePreset { label: ReactNode; value: DateRangeValue; }
export interface DateRangeFilterProps {
  value: DateRangeValue;
  onValueChange: (value: DateRangeValue) => void;
  presets?: DateRangePreset[];
  onClear?: () => void;
  /** Réglages du sélecteur de période — bornes, libellés, jours désactivés. */
  dateRangePickerProps?: Partial<Omit<DateRangePickerProps, "value" | "defaultValue" | "onValueChange">>;
  className?: string;
}
/**
 * Une période, avec ses raccourcis.
 *
 * Les périodes utiles se comptent sur une main — ce mois, le trimestre,
 * l'exercice — et les proposer évite de saisir deux dates pour la question
 * que tout le monde pose en premier.
 */
export function DateRangeFilter({ value, onValueChange, presets = [], onClear, dateRangePickerProps, className }: DateRangeFilterProps) { const locale = useSiaLocale(); return <section className={cn("sia-date-range-filter", className)}><div className="sia-date-range-filter__presets">{presets.map((preset, index) => <button type="button" key={index} onClick={() => onValueChange(preset.value)}>{preset.label}</button>)}</div><DateRangePicker {...dateRangePickerProps} value={value} onValueChange={onValueChange} />{onClear && (value.start || value.end) && <button type="button" className="sia-date-range-filter__clear" onClick={onClear}>{locale.clear}</button>}</section>; }
