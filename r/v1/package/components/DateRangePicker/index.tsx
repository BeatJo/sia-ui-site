import { useRef, useState } from "react";
import { cn, toneClass } from "@sia-ui/utils";
import { Calendar, type CalendarProps, type CalendarRangeValue } from "../Calendar";
import type { ComponentTone } from "@sia-ui/tokens";
import { ArrowRightIcon, CalendarIcon, ChevronDownIcon, XIcon } from "../Icons";
import { Overlay, type OverlayPlacement } from "../Overlay";

export type DateRangeValue = CalendarRangeValue;
export interface DateRangePickerProps extends Pick<CalendarProps, "locale" | "firstDayOfWeek" | "disabledDate" | "cellRender" | "showWeek"> {
  value?: DateRangeValue;
  defaultValue?: DateRangeValue;
  onValueChange?: (value: DateRangeValue) => void;
  min?: string;
  max?: string;
  startLabel?: string;
  endLabel?: string;
  allowClear?: boolean;
  placement?: OverlayPlacement;
  tone?: ComponentTone;
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
}
/**
 * Un début et une fin, choisis ensemble.
 *
 * Deux champs séparés laissent poser une fin antérieure au début, et il
 * faut alors décider lequel des deux avait tort. Ici les deux bornes sont
 * une seule valeur, et le calendrier les tient dans l'ordre.
 */
export function DateRangePicker({ value, defaultValue = { start: "", end: "" }, onValueChange, min, max, startLabel = "Date de début", endLabel = "Date de fin", allowClear = true, placement = "bottom-start", tone = "primary", invalid, disabled, locale = "fr-FR", firstDayOfWeek = 1, disabledDate, cellRender, showWeek, className }: DateRangePickerProps) {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [internal, setInternal] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const current = value ?? internal;
  const update = (next: DateRangeValue) => { if (value === undefined) setInternal(next); onValueChange?.(next); };
  const rangeInvalid = Boolean(invalid || (current.start && current.end && current.start > current.end));
  const format = (date: string) => date ? new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${date}T12:00:00`)) : null;
  return <div className={cn("sia-picker", "sia-range-picker", "sia-date-range-picker", toneClass("sia-tone", tone), rangeInvalid && "sia-picker--invalid", disabled && "sia-picker--disabled", className)}>
    <button ref={anchorRef} type="button" className="sia-picker__trigger sia-range-picker__trigger" disabled={disabled} aria-haspopup="dialog" aria-expanded={open} aria-invalid={rangeInvalid || undefined} onClick={() => setOpen(!open)}><CalendarIcon className="sia-picker__icon" /><span className={cn("sia-range-picker__part", !current.start && "sia-picker__placeholder")}>{format(current.start) ?? startLabel}</span><ArrowRightIcon className="sia-range-picker__separator" /><span className={cn("sia-range-picker__part", !current.end && "sia-picker__placeholder")}>{format(current.end) ?? endLabel}</span><span className="sia-picker__actions">{allowClear && (current.start || current.end) && <span className="sia-picker__clear" title="Effacer" aria-hidden="true" onClick={(event) => { event.stopPropagation(); update({ start: "", end: "" }); }}><XIcon /></span>}<ChevronDownIcon /></span></button>
    <Overlay open={open} anchorRef={anchorRef} onOpenChange={setOpen} placement={placement} className="sia-picker__overlay"><Calendar selectionMode="range" range={current} defaultMonth={current.start || current.end} locale={locale} firstDayOfWeek={firstDayOfWeek} disabledDate={(date) => Boolean((min && date < min) || (max && date > max) || disabledDate?.(date))} {...(cellRender ? { cellRender } : {})} {...(showWeek !== undefined ? { showWeek } : {})} tone={tone} onRangeChange={(next) => { update(next); if (next.end) setOpen(false); }} /></Overlay>
  </div>;
}
