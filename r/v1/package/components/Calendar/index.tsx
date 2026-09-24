import { useMemo, useState, type ReactNode } from "react";
import { cn, toneClass } from "@sia-ui/utils";
import type { ComponentTone } from "@sia-ui/tokens";
import { ChevronLeftIcon, ChevronRightIcon } from "../Icons";

export interface CalendarDay {
  date: string;
  day: number;
  inCurrentMonth: boolean;
  isToday: boolean;
  disabled: boolean;
  selected: boolean;
  inRange: boolean;
  rangeEdge?: "start" | "end";
}
export interface CalendarRangeValue { start: string; end: string; }
export type CalendarMode = "month" | "year";
export interface CalendarProps {
  value?: string;
  defaultValue?: string;
  range?: CalendarRangeValue;
  defaultRange?: CalendarRangeValue;
  selectionMode?: "single" | "range";
  month?: string;
  defaultMonth?: string;
  mode?: CalendarMode;
  defaultMode?: CalendarMode;
  onValueChange?: (value: string) => void;
  onRangeChange?: (value: CalendarRangeValue) => void;
  onSelect?: (value: string, source: "date" | "month" | "year") => void;
  onMonthChange?: (month: string) => void;
  onPanelChange?: (month: string, mode: CalendarMode) => void;
  disabledDate?: (date: string) => boolean;
  validRange?: [string, string];
  renderDay?: (day: CalendarDay) => ReactNode;
  cellRender?: (day: CalendarDay, originNode: ReactNode) => ReactNode;
  headerRender?: (props: { month: string; mode: CalendarMode; onMonthChange: (month: string) => void; onModeChange: (mode: CalendarMode) => void }) => ReactNode;
  renderExtraFooter?: () => ReactNode;
  locale?: string;
  firstDayOfWeek?: 0 | 1;
  showWeek?: boolean;
  fullscreen?: boolean;
  tone?: ComponentTone;
  className?: string;
}
const pad = (value: number) => String(value).padStart(2, "0");
const iso = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const monthIso = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
const parseMonth = (value?: string) => {
  const source = value ? new Date(`${value.slice(0, 7)}-01T12:00:00`) : new Date();
  return Number.isNaN(source.getTime()) ? new Date() : source;
};
function weekNumber(value: string) {
  const date = new Date(`${value}T12:00:00`);
  const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  return Math.ceil((((target.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

/**
 * Un mois de dates, sélectionnables une à une ou par plage.
 *
 * Trois panneaux — jours, mois, années — plutôt qu'un défilement infini :
 * choisir une date de naissance demande de remonter trente ans, et trente
 * ans de défilement ne sont pas une navigation.
 *
 * Les dates circulent en chaînes `AAAA-MM-JJ`, jamais en objets `Date` : un
 * `Date` porte une heure et un fuseau dont une date de facture n'a que
 * faire, et qui la décalent d'un jour une fois sur deux.
 */
export function Calendar({
  value,
  defaultValue,
  range,
  defaultRange = { start: "", end: "" },
  selectionMode = "single",
  month,
  defaultMonth,
  mode,
  defaultMode = "month",
  onValueChange,
  onRangeChange,
  onSelect,
  onMonthChange,
  onPanelChange,
  disabledDate,
  validRange,
  renderDay,
  cellRender,
  headerRender,
  renderExtraFooter,
  locale = "fr-FR",
  firstDayOfWeek = 1,
  showWeek = false,
  fullscreen = false,
  tone = "primary",
  className,
}: CalendarProps) {
  const [selected, setSelected] = useState(defaultValue ?? "");
  const [selectedRange, setSelectedRange] = useState(defaultRange);
  const [view, setView] = useState(() => parseMonth(month ?? defaultMonth ?? value ?? defaultValue));
  const [panelMode, setPanelMode] = useState(defaultMode);
  const currentValue = value ?? selected;
  const currentRange = range ?? selectedRange;
  const currentMode = mode ?? panelMode;
  const controlledMonth = month ? parseMonth(month) : view;
  const year = controlledMonth.getFullYear();
  const monthIndex = controlledMonth.getMonth();
  const setMonth = (next: Date, sourceMode = currentMode) => {
    if (!month) setView(next);
    const nextMonth = monthIso(next);
    onMonthChange?.(nextMonth);
    onPanelChange?.(nextMonth, sourceMode);
  };
  const changeMonth = (offset: number) => setMonth(new Date(year, monthIndex + offset, 1, 12));
  const changeMode = (next: CalendarMode) => {
    if (mode === undefined) setPanelMode(next);
    onPanelChange?.(monthIso(controlledMonth), next);
  };
  const isDisabled = (date: string) => Boolean(
    disabledDate?.(date) ||
    (validRange && (date < validRange[0] || date > validRange[1])),
  );
  const selectDate = (date: string) => {
    if (isDisabled(date)) return;
    if (selectionMode === "range") {
      const next = !currentRange.start || currentRange.end
        ? { start: date, end: "" }
        : date < currentRange.start
          ? { start: date, end: currentRange.start }
          : { start: currentRange.start, end: date };
      if (range === undefined) setSelectedRange(next);
      onRangeChange?.(next);
    } else {
      if (value === undefined) setSelected(date);
      onValueChange?.(date);
    }
    onSelect?.(date, "date");
  };
  const days = useMemo(() => {
    const first = new Date(year, monthIndex, 1, 12);
    const offset = (first.getDay() - firstDayOfWeek + 7) % 7;
    const start = new Date(year, monthIndex, 1 - offset, 12);
    const today = iso(new Date());
    return Array.from({ length: 42 }, (_, index): CalendarDay => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      const dateString = iso(date);
      const rangeEdge = currentRange.start === dateString ? "start" : currentRange.end === dateString ? "end" : undefined;
      return {
        date: dateString,
        day: date.getDate(),
        inCurrentMonth: date.getMonth() === monthIndex,
        isToday: dateString === today,
        disabled: isDisabled(dateString),
        selected: currentValue === dateString || Boolean(rangeEdge),
        inRange: Boolean(currentRange.start && currentRange.end && dateString >= currentRange.start && dateString <= currentRange.end),
        ...(rangeEdge ? { rangeEdge } : {}),
      };
    });
  }, [year, monthIndex, firstDayOfWeek, disabledDate, validRange, currentValue, currentRange.start, currentRange.end]);
  const weekdays = Array.from({ length: 7 }, (_, index) => new Intl.DateTimeFormat(locale, { weekday: "short" }).format(new Date(2024, 0, 7 + firstDayOfWeek + index)));
  const monthName = new Intl.DateTimeFormat(locale, { month: "long" }).format(controlledMonth);
  const updateFromString = (next: string) => setMonth(parseMonth(next));

  return (
    <section className={cn("sia-calendar", `sia-calendar--${currentMode}`, fullscreen && "sia-calendar--fullscreen", toneClass("sia-tone", tone), className)}>
      {headerRender?.({ month: monthIso(controlledMonth), mode: currentMode, onMonthChange: updateFromString, onModeChange: changeMode }) ?? (
        <header className="sia-calendar__header">
          <button type="button" className="sia-calendar__nav" aria-label={currentMode === "month" ? "Mois précédent" : "Année précédente"} onClick={() => currentMode === "month" ? changeMonth(-1) : setMonth(new Date(year - 1, monthIndex, 1, 12))}><ChevronLeftIcon /></button>
          <div className="sia-calendar__heading">
            <button type="button" onClick={() => changeMode(currentMode === "month" ? "year" : "month")}>{currentMode === "month" ? monthName : year}</button>
            {currentMode === "month" && <button type="button" onClick={() => changeMode("year")}>{year}</button>}
          </div>
          <button type="button" className="sia-calendar__nav" aria-label={currentMode === "month" ? "Mois suivant" : "Année suivante"} onClick={() => currentMode === "month" ? changeMonth(1) : setMonth(new Date(year + 1, monthIndex, 1, 12))}><ChevronRightIcon /></button>
        </header>
      )}
      {currentMode === "year" ? (
        <div className="sia-calendar__months">
          {Array.from({ length: 12 }, (_, index) => {
            const date = new Date(year, index, 1, 12);
            return <button type="button" key={index} data-selected={index === monthIndex || undefined} onClick={() => { setMonth(date, "month"); changeMode("month"); onSelect?.(monthIso(date), "month"); }}>{new Intl.DateTimeFormat(locale, { month: "short" }).format(date)}</button>;
          })}
        </div>
      ) : (
        <>
          <div className={cn("sia-calendar__weekdays", showWeek && "sia-calendar__with-week")}>
            {weekdays.map((day) => <span key={day}>{day}</span>)}
          </div>
          <div className={cn("sia-calendar__grid", showWeek && "sia-calendar__with-week")}>
            {days.map((day, index) => {
              const originNode = <button type="button" disabled={day.disabled} aria-label={day.date} aria-pressed={day.selected} onClick={() => selectDate(day.date)}>{day.day}</button>;
              return <div className="sia-calendar__cell" key={day.date} data-outside={!day.inCurrentMonth || undefined} data-today={day.isToday || undefined} data-in-range={day.inRange || undefined} data-range-edge={day.rangeEdge}>{showWeek && index % 7 === 0 && <span className="sia-calendar__week-number">{weekNumber(day.date)}</span>}{cellRender?.(day, originNode) ?? originNode}{renderDay?.(day)}</div>;
            })}
          </div>
        </>
      )}
      {renderExtraFooter && <footer className="sia-calendar__footer">{renderExtraFooter()}</footer>}
    </section>
  );
}
