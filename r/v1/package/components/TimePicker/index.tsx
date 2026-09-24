import { forwardRef, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { cn, toneClass } from "@sia-ui/utils";
import type { ComponentTone } from "@sia-ui/tokens";
import { CheckIcon, ChevronDownIcon, ClockIcon, XIcon } from "../Icons";
import { Overlay, type OverlayPlacement } from "../Overlay";
import { formatTimeValue, parseTimeValue, type TimeParts } from "../Timer";
import "./styles.css";

export interface TimePickerProps {
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  min?: string;
  max?: string;
  showSeconds?: boolean;
  minuteStep?: number;
  secondStep?: number;
  hourFormat?: 12 | 24;
  needConfirm?: boolean;
  allowClear?: boolean;
  placeholder?: string;
  disabledTime?: (value: TimeParts) => boolean;
  renderExtraFooter?: () => ReactNode;
  onValueChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
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

function steppedValues(limit: number, step: number) {
  return Array.from({ length: Math.ceil(limit / Math.max(step, 1)) }, (_, index) => index * Math.max(step, 1)).filter((value) => value < limit);
}

/**
 * Une heure, au pas voulu.
 *
 * `minuteStep` évite de faire défiler soixante minutes pour un rendez-vous
 * qui tombe au quart d'heure. Les secondes ne s'affichent que si on les
 * demande — la plupart des heures métier n'en ont pas.
 */
export const TimePicker = forwardRef<HTMLButtonElement, TimePickerProps>(function TimePicker({
  id, name, value, defaultValue = "", min, max, showSeconds = false, minuteStep = 1, secondStep = 1, hourFormat = 24, needConfirm = false, allowClear = true, placeholder = "Sélectionner une heure", disabledTime, renderExtraFooter, onValueChange, onOpenChange, open: openProp, placement = "bottom-start", tone = "primary", invalid = false, disabled = false, required = false, className, "aria-invalid": ariaInvalid, "aria-required": ariaRequired, ...ariaProps
}, forwardedRef) {
  const generatedId = useId();
  const controlId = id ?? `sia-time-picker-${generatedId.replace(/:/g, "")}`;
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [internalOpen, setInternalOpen] = useState(false);
  const current = value ?? internalValue;
  const [draft, setDraft] = useState<TimeParts>(() => parseTimeValue(current));
  const open = openProp ?? internalOpen;
  const setOpen = (next: boolean) => { if (next) setDraft(parseTimeValue(current)); if (openProp === undefined) setInternalOpen(next); onOpenChange?.(next); };
  const update = (next: string) => { if (value === undefined) setInternalValue(next); onValueChange?.(next); };
  const setRef = (node: HTMLButtonElement | null) => { anchorRef.current = node; if (typeof forwardedRef === "function") forwardedRef(node); else if (forwardedRef) forwardedRef.current = node; };
  const hours = useMemo(() => steppedValues(24, 1), []);
  const minutes = useMemo(() => steppedValues(60, minuteStep), [minuteStep]);
  const seconds = useMemo(() => steppedValues(60, secondStep), [secondStep]);
  const select = (partial: Partial<TimeParts>) => {
    const next = { ...draft, ...partial };
    setDraft(next);
    const serialized = formatTimeValue(next, showSeconds);
    if (!needConfirm && (!min || serialized >= min) && (!max || serialized <= max) && !disabledTime?.(next)) update(serialized);
  };
  const confirm = () => { const serialized = formatTimeValue(draft, showSeconds); if ((!min || serialized >= min) && (!max || serialized <= max) && !disabledTime?.(draft)) { update(serialized); setOpen(false); } };
  const renderColumn = (label: string, values: number[], selected: number, key: keyof TimeParts) => <div className="sia-time-panel__column" role="listbox" aria-label={label}>{values.map((option) => { const candidate = { ...draft, [key]: option }; const serialized = formatTimeValue(candidate, showSeconds); const optionDisabled = Boolean((min && serialized < min) || (max && serialized > max) || disabledTime?.(candidate)); const display = key === "hours" && hourFormat === 12 ? ((option + 11) % 12) + 1 : option; return <button type="button" role="option" aria-selected={selected === option} disabled={optionDisabled} key={option} onClick={() => select({ [key]: option })}><span>{String(display).padStart(2, "0")}</span>{selected === option && <CheckIcon />}</button>; })}</div>;
  return <div className={cn("sia-picker", "sia-time-picker", toneClass("sia-tone", tone), invalid && "sia-picker--invalid", disabled && "sia-picker--disabled", className)}>
    {name && <input type="hidden" name={name} value={current} />}
    <button ref={setRef} id={controlId} type="button" className="sia-picker__trigger" disabled={disabled} aria-haspopup="dialog" aria-expanded={open} aria-invalid={ariaInvalid ?? (invalid || undefined)} aria-required={ariaRequired ?? (required || undefined)} onClick={() => setOpen(!open)} {...ariaProps}><ClockIcon className="sia-picker__icon" /><span className={cn("sia-picker__value", !current && "sia-picker__placeholder")}>{current || placeholder}</span><span className="sia-picker__actions">{allowClear && current && <span className="sia-picker__clear" title="Effacer" aria-hidden="true" onClick={(event) => { event.stopPropagation(); update(""); }}><XIcon /></span>}<ChevronDownIcon /></span></button>
    <Overlay open={open} anchorRef={anchorRef} onOpenChange={setOpen} placement={placement} className="sia-picker__overlay"><div className={cn("sia-time-panel", toneClass("sia-tone", tone))}><div className="sia-time-panel__columns">{renderColumn("Heures", hours, draft.hours, "hours")}{renderColumn("Minutes", minutes, draft.minutes, "minutes")}{showSeconds && renderColumn("Secondes", seconds, draft.seconds, "seconds")}</div><footer className="sia-time-panel__footer">{renderExtraFooter?.()}<button type="button" className="sia-time-panel__now" onClick={() => setDraft(parseTimeValue(new Date().toTimeString().slice(0, 8)))}>Maintenant</button>{needConfirm && <button type="button" className="sia-time-panel__confirm" onClick={confirm}>OK</button>}</footer></div></Overlay>
  </div>;
});
TimePicker.displayName = "TimePicker";
