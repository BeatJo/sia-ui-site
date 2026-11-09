import { Calendar, type CalendarProps } from "../Calendar";
import { cn } from "@sia-ui/utils";
/**
 * Le même calendrier, en plus petit.
 *
 * Une variante de taille et non un composant à part : deux calendriers
 * séparés auraient divergé sur la sélection de plage, les jours désactivés
 * ou le premier jour de la semaine.
 */
export function MiniCalendar({ className, ...props }: CalendarProps) { return <Calendar {...props} className={cn("sia-calendar--mini", className)} />; }
