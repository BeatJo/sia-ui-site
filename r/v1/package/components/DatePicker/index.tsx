import { forwardRef, useId, useRef, useState, type ReactNode } from "react";
import { cn, toneClass } from "@sia-ui/utils";
import { Calendar, type CalendarProps } from "../Calendar";
import type { ComponentTone } from "@sia-ui/tokens";
import { CalendarIcon, ChevronDownIcon, XIcon } from "../Icons";
import { Overlay, type OverlayPlacement } from "../Overlay";

export interface DatePickerProps
  extends Pick<CalendarProps, "locale" | "firstDayOfWeek" | "disabledDate" | "cellRender" | "showWeek"> {
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  min?: string;
  max?: string;
  onValueChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  placeholder?: string;
  formatValue?: (value: string, locale: string) => ReactNode;
  allowClear?: boolean;
  showToday?: boolean;
  renderExtraFooter?: () => ReactNode;
  placement?: OverlayPlacement;
  tone?: ComponentTone;
  invalid?: boolean;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-labelledby"?: string;
  "aria-invalid"?: boolean;
  "aria-required"?: boolean;
}

function defaultFormat(value: string, locale: string) {
  if (!value) return null;
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short", year: "numeric" }).format(date);
}

/**
 * Une date, choisie au calendrier ou saisie au clavier.
 *
 * La valeur est une chaîne `AAAA-MM-JJ` : un objet `Date` porte une heure
 * et un fuseau dont une date d'échéance n'a que faire, et qui la décalent
 * d'un jour selon l'endroit d'où on la lit.
 */
export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(function DatePicker({
  id,
  name,
  value,
  defaultValue = "",
  min,
  max,
  onValueChange,
  onOpenChange,
  open: openProp,
  placeholder = "Sélectionner une date",
  formatValue = defaultFormat,
  allowClear = true,
  showToday = true,
  renderExtraFooter,
  placement = "bottom-start",
  tone = "primary",
  invalid = false,
  disabled = false,
  required = false,
  locale = "fr-FR",
  firstDayOfWeek = 1,
  disabledDate,
  cellRender,
  showWeek,
  className,
  "aria-invalid": ariaInvalid,
  "aria-required": ariaRequired,
  ...ariaProps
}, forwardedRef) {
  const generatedId = useId();
  const controlId = id ?? `sia-date-picker-${generatedId.replace(/:/g, "")}`;
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [internalOpen, setInternalOpen] = useState(false);
  const current = value ?? internalValue;
  const open = openProp ?? internalOpen;
  const setOpen = (next: boolean) => { if (openProp === undefined) setInternalOpen(next); onOpenChange?.(next); };
  const update = (next: string) => { if (value === undefined) setInternalValue(next); onValueChange?.(next); };
  const setRef = (node: HTMLButtonElement | null) => { anchorRef.current = node; if (typeof forwardedRef === "function") forwardedRef(node); else if (forwardedRef) forwardedRef.current = node; };
  const today = new Date();
  const todayValue = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return (
    <div className={cn("sia-picker", "sia-date-picker", toneClass("sia-tone", tone), invalid && "sia-picker--invalid", disabled && "sia-picker--disabled", className)}>
      {name && <input type="hidden" name={name} value={current} />}
      <button ref={setRef} id={controlId} type="button" className="sia-picker__trigger" disabled={disabled} aria-haspopup="dialog" aria-expanded={open} aria-invalid={ariaInvalid ?? (invalid || undefined)} aria-required={ariaRequired ?? (required || undefined)} onClick={() => setOpen(!open)} {...ariaProps}>
        <CalendarIcon className="sia-picker__icon" />
        <span className={cn("sia-picker__value", !current && "sia-picker__placeholder")}>{current ? formatValue(current, locale) : placeholder}</span>
        <span className="sia-picker__actions">
          {allowClear && current && <span className="sia-picker__clear" title="Effacer" aria-hidden="true" onClick={(event) => { event.stopPropagation(); update(""); }}><XIcon /></span>}
          <ChevronDownIcon />
        </span>
      </button>
      <Overlay open={open} anchorRef={anchorRef} onOpenChange={setOpen} placement={placement} className="sia-picker__overlay">
        <Calendar value={current} defaultMonth={current} {...(min && max ? { validRange: [min, max] as [string, string] } : {})} disabledDate={(date) => Boolean((min && date < min) || (max && date > max) || disabledDate?.(date))} locale={locale} firstDayOfWeek={firstDayOfWeek} {...(cellRender ? { cellRender } : {})} {...(showWeek !== undefined ? { showWeek } : {})} tone={tone} onValueChange={(next) => { update(next); setOpen(false); }} renderExtraFooter={() => <div className="sia-picker__footer">{showToday && <button type="button" disabled={Boolean((min && todayValue < min) || (max && todayValue > max) || disabledDate?.(todayValue))} onClick={() => { update(todayValue); setOpen(false); }}>Aujourd'hui</button>}{renderExtraFooter?.()}</div>} />
      </Overlay>
    </div>
  );
});
DatePicker.displayName = "DatePicker";
