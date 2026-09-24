import { useState } from "react";
import { TimePicker, type TimePickerProps } from "../TimePicker";
import { cn, toneClass } from "@sia-ui/utils";
import type { ComponentTone } from "@sia-ui/tokens";
import { ArrowRightIcon } from "../Icons";
import { useSiaLocale } from "@sia-ui/headless";
import "./styles.css";

export interface TimeRangeValue { start: string; end: string; }
export interface TimeRangePickerProps extends Pick<TimePickerProps, "minuteStep" | "secondStep" | "showSeconds" | "hourFormat" | "needConfirm" | "allowClear"> {
  value?: TimeRangeValue;
  defaultValue?: TimeRangeValue;
  onValueChange?: (value: TimeRangeValue) => void;
  order?: boolean;
  startLabel?: string;
  endLabel?: string;
  tone?: ComponentTone;
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
}
/**
 * Une heure de début et une heure de fin.
 *
 * `order` impose que la fin suive le début. On peut le lever — une garde
 * de nuit finit le lendemain — mais il faut l'avoir écrit.
 */
export function TimeRangePicker({ value, defaultValue = { start: "", end: "" }, onValueChange, order = true, startLabel: startLabelProp, endLabel: endLabelProp, minuteStep = 1, secondStep = 1, showSeconds = false, hourFormat = 24, needConfirm = false, allowClear = true, tone = "primary", invalid, disabled, className }: TimeRangePickerProps) {
    const locale = useSiaLocale();
    const endLabel = endLabelProp ?? locale.endTime;
    const startLabel = startLabelProp ?? locale.startTime;
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;
  const update = (next: TimeRangeValue) => { const normalized = order && next.start && next.end && next.start > next.end ? { start: next.end, end: next.start } : next; if (value === undefined) setInternal(normalized); onValueChange?.(normalized); };
  const rangeInvalid = Boolean(invalid || (!order && current.start && current.end && current.start > current.end));
  const shared = { minuteStep, secondStep, showSeconds, hourFormat, needConfirm, allowClear, tone, ...(disabled !== undefined ? { disabled } : {}) };
  return <div className={cn("sia-time-range-picker", toneClass("sia-tone", tone), rangeInvalid && "sia-time-range-picker--invalid", className)}><TimePicker {...shared} aria-label={startLabel} value={current.start} {...(!order && current.end ? { max: current.end } : {})} invalid={rangeInvalid} onValueChange={(start) => update({ ...current, start })} /><ArrowRightIcon className="sia-range-picker__separator" /><TimePicker {...shared} aria-label={endLabel} value={current.end} {...(!order && current.start ? { min: current.start } : {})} invalid={rangeInvalid} onValueChange={(end) => update({ ...current, end })} /></div>;
}
