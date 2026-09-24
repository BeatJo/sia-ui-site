import { useState } from "react";
import { DatePicker, type DatePickerProps } from "../DatePicker";
import { TimePicker, type TimePickerProps } from "../TimePicker";
import { cn, toneClass } from "@sia-ui/utils";
import type { ComponentTone } from "@sia-ui/tokens";

export interface DateTimeValue { date: string; time: string; }
export interface DateTimePickerProps {
  value?: DateTimeValue;
  defaultValue?: DateTimeValue;
  onValueChange?: (value: DateTimeValue) => void;
  minuteStep?: number;
  secondStep?: number;
  showSeconds?: boolean;
  hourFormat?: 12 | 24;
  needConfirm?: boolean;
  minDate?: string;
  maxDate?: string;
  tone?: ComponentTone;
  invalid?: boolean;
  disabled?: boolean;
  dateProps?: Omit<DatePickerProps, "value" | "defaultValue" | "onValueChange" | "tone" | "invalid" | "disabled">;
  timeProps?: Omit<TimePickerProps, "value" | "defaultValue" | "onValueChange" | "tone" | "invalid" | "disabled">;
  className?: string;
}
/**
 * Une date et une heure, dans un seul champ.
 *
 * `needConfirm` existe parce que l'heure se choisit après la date : sans
 * validation explicite, le panneau se referme sur la date et l'heure reste
 * celle de la veille.
 */
export function DateTimePicker({ value, defaultValue = { date: "", time: "" }, onValueChange, minuteStep = 1, secondStep = 1, showSeconds = false, hourFormat = 24, needConfirm = false, minDate, maxDate, tone = "primary", invalid, disabled, dateProps, timeProps, className }: DateTimePickerProps) {
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;
  const update = (next: DateTimeValue) => { if (value === undefined) setInternal(next); onValueChange?.(next); };
  const stateProps = { ...(invalid !== undefined ? { invalid } : {}), ...(disabled !== undefined ? { disabled } : {}) };
  return <div className={cn("sia-date-time-picker", toneClass("sia-tone", tone), className)}><DatePicker {...dateProps} value={current.date} {...(minDate ? { min: minDate } : {})} {...(maxDate ? { max: maxDate } : {})} tone={tone} {...stateProps} aria-label="Date" onValueChange={(date) => update({ ...current, date })} /><TimePicker {...timeProps} value={current.time} minuteStep={minuteStep} secondStep={secondStep} showSeconds={showSeconds} hourFormat={hourFormat} needConfirm={needConfirm} tone={tone} {...stateProps} aria-label="Heure" onValueChange={(time) => update({ ...current, time })} /></div>;
}
