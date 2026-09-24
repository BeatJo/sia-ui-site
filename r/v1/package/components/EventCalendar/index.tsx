import { Calendar, type CalendarDay, type CalendarProps } from "../Calendar";
import type { ComponentTone } from "@sia-ui/tokens";
import "./styles.css";

export interface CalendarEvent { id: string; date: string; title: string; tone?: ComponentTone; }
export interface EventCalendarProps extends Omit<CalendarProps, "renderDay"> { events: CalendarEvent[]; maxEventsPerDay?: number; onEventClick?: (event: CalendarEvent) => void; }
/**
 * Un calendrier qui porte des événements.
 *
 * `maxEventsPerDay` plafonne l'affichage : une journée à douze rendez-vous
 * déformerait toute la grille, et les douze ne se lisent de toute façon pas
 * dans une case de calendrier.
 */
export function EventCalendar({ events, maxEventsPerDay = 2, onEventClick, ...props }: EventCalendarProps) { const renderDay = (day: CalendarDay) => { const matches = events.filter((event) => event.date === day.date).slice(0, maxEventsPerDay); return <span className="sia-event-calendar__events">{matches.map((event) => <button type="button" key={event.id} className={`sia-event-calendar__event sia-event-calendar__event--${event.tone ?? "primary"}`} onClick={() => onEventClick?.(event)}>{event.title}</button>)}</span>; }; return <Calendar {...props} className={cnEvent(props.className)} renderDay={renderDay} />; }
function cnEvent(className?: string) { return ["sia-event-calendar", className].filter(Boolean).join(" "); }
