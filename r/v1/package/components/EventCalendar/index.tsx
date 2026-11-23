import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@sia-ui/utils";
import {
  addDaysIso,
  addMonthsIso,
  dayToDate,
  eventDays,
  eventsByDay,
  isoDay,
  layoutDay,
  monthGrid,
  plural,
  useSiaLocale,
  visibleRange,
  weekDays,
  type CalendarEventInput,
  type CalendarView,
  type DayEvent,
  type EventCalendarMessages,
  useFormatLocale,
} from "@sia-ui/headless";
import type { ComponentTone } from "@sia-ui/tokens";
import { Button, type ButtonProps } from "../Button";
import { EmptyState, type EmptyStateProps } from "../EmptyState";
import { IconButton, type IconButtonProps } from "../IconButton";
import { Popover, type PopoverProps } from "../Popover";
import { RadioButton, RadioGroup, type RadioButtonProps, type RadioGroupProps } from "../RadioGroup";
import { Spinner, type SpinnerProps } from "../Spinner";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "../Icons";
import "./styles.css";

export type { CalendarView } from "@sia-ui/headless";

/** Un événement du calendrier. Les champs métier en plus passent tels quels. */
export interface CalendarEvent extends Omit<CalendarEventInput, "start"> {
  /** `2026-09-30` pour la journée, `2026-09-30T14:30` pour une heure. */
  start?: string | undefined;
  /** @deprecated Ancien nom de `start`, gardé pour les projets existants. */
  date?: string | undefined;
  // `| undefined` partout : le brouillon rendu par `EventManager` s'étale
  // dans un événement (`{ ...brouillon, id }`) sans transtypage.
  tone?: ComponentTone | undefined;
  description?: ReactNode | undefined;
  location?: ReactNode | undefined;
}

/**
 * Les libellés du calendrier : le groupe `eventCalendar` de la locale SIA.
 * « +N autres » se décline en `more_one` / `more_other`, avec `{count}`.
 */
export type EventCalendarLabels = EventCalendarMessages;

export interface EventCalendarProps<T extends CalendarEvent = CalendarEvent> {
  events: T[];

  /** La vue affichée — mois, semaine, agenda. */
  view?: CalendarView;
  defaultView?: CalendarView;
  onViewChange?: (view: CalendarView) => void;
  /** Les vues proposées. Une seule masque le sélecteur. */
  views?: CalendarView[];

  /**
   * L'habillage de la grille. `bordered` : des cases tracées, comme un
   * agenda papier. `minimal` : aucune bordure intérieure, les jours se
   * lisent à leur numéro. `soft` : des cases sur fond teinté, séparées par
   * des blancs.
   */
  variant?: "bordered" | "minimal" | "soft";
  /** Le rendu des événements : fond léger, plein, ou contour. */
  eventVariant?: "soft" | "solid" | "outline";
  /** `compact` resserre les cases et la grille horaire. */
  density?: "comfortable" | "compact";
  /** L'heure affichée en haut de la grille horaire à l'ouverture. 8 h par défaut. */
  scrollToHour?: number;

  /** Un jour de la période affichée (`2026-09-30`). Aujourd'hui par défaut. */
  date?: string;
  defaultDate?: string;
  onDateChange?: (date: string) => void;
  /** @deprecated Ancien nom de `defaultDate`. */
  defaultValue?: string;
  /** @deprecated Ancien nom de `defaultDate`, au mois près. */
  defaultMonth?: string;

  /**
   * La période visible, bornes incluses, à chaque changement de vue ou de
   * période — et au premier affichage. C'est elle qu'on demande au serveur.
   */
  onRangeChange?: (range: { start: string; end: string }, view: CalendarView) => void;

  /**
   * Un clic sur un jour, hors événement : le moment de créer. Dans la
   * grille horaire, `time` donne la demi-heure visée (`14:30`).
   */
  onDateClick?: (date: string, time?: string) => void;
  onEventClick?: (event: T) => void;

  /** Événements visibles par case en vue mois ; le reste passe dans « +N ». */
  maxEventsPerDay?: number;
  firstDayOfWeek?: 0 | 1;
  /** La langue des dates. Par défaut, celle de la locale SIA. */
  locale?: string;
  /** Remplace le contenu d'un événement. Le bouton qui l'entoure reste. */
  renderEvent?: (event: T, placement: DayEvent<T & CalendarEventInput>) => ReactNode;
  /** Actions à droite de la barre : « Nouvel événement », un filtre. */
  toolbarActions?: ReactNode;
  loading?: boolean;
  /** Remplace, clé par clé, les textes du groupe `eventCalendar` de la locale. */
  labels?: Partial<EventCalendarLabels>;

  /** Le bouton « Aujourd'hui ». */
  toolbarButtonProps?: Partial<Omit<ButtonProps, "onClick" | "children">>;
  /** Le sélecteur de vue — un `RadioGroup` en boutons. */
  viewSwitchProps?: Partial<Omit<RadioGroupProps, "value" | "defaultValue" | "onValueChange" | "children">>;
  /** Chaque bouton de vue. */
  viewButtonProps?: Partial<Omit<RadioButtonProps, "value" | "children">>;
  /** Le bouton « +N autres » d'une case chargée. */
  moreButtonProps?: Partial<Omit<ButtonProps, "onClick" | "children">>;
  /** L'agenda vide. */
  emptyStateProps?: Partial<EmptyStateProps>;
  /** Le témoin de chargement de la barre. */
  spinnerProps?: Partial<Omit<SpinnerProps, "label">>;
  /** Les flèches de période. */
  navButtonProps?: Partial<Omit<IconButtonProps, "onClick" | "label" | "icon">>;
  /** La liste complète d'un jour chargé (« +N autres »). */
  popoverProps?: Partial<Omit<PopoverProps, "content" | "children">>;
  className?: string;
}

/** Les événements d'hier, écrits `date` au lieu de `start`. */
function normaliser<T extends CalendarEvent>(events: T[]): Array<T & CalendarEventInput> {
  return events
    .filter((e) => e.start ?? e.date)
    .map((e) => (e.start ? e : { ...e, start: e.date! })) as Array<T & CalendarEventInput>;
}

/** La largeur sous laquelle la grille passe en points et liste le jour. */
const SEUIL_COMPACT = 640;

/**
 * Un calendrier d'événements : mois, semaine, agenda.
 *
 * Il affiche et signale ; il ne gère pas. Un clic sur un jour appelle
 * `onDateClick`, un clic sur un événement `onEventClick` — `EventManager`
 * s'y branche pour créer, consulter, modifier et supprimer. Les données
 * viennent du serveur : `onRangeChange` donne la période à charger.
 *
 * Étroit, la grille du mois n'affiche plus que des points de couleur, et les
 * événements du jour choisi s'affichent dessous : une case de 45 px ne se lit
 * pas, une liste si.
 */
export function EventCalendar<T extends CalendarEvent = CalendarEvent>({
  events,
  view: viewProp,
  defaultView = "month",
  onViewChange,
  views = ["month", "week", "day", "agenda"],
  variant = "bordered",
  eventVariant = "soft",
  density = "comfortable",
  scrollToHour = 8,
  date: dateProp,
  defaultDate,
  defaultValue,
  defaultMonth,
  onDateChange,
  onRangeChange,
  onDateClick,
  onEventClick,
  maxEventsPerDay = 3,
  firstDayOfWeek = 1,
  locale: localeProp,
  renderEvent,
  toolbarActions,
  loading = false,
  labels: labelsProp,
  toolbarButtonProps,
  viewSwitchProps,
  viewButtonProps,
  moreButtonProps,
  emptyStateProps,
  spinnerProps,
  navButtonProps,
  popoverProps,
  className,
}: EventCalendarProps<T>) {
  const messages = useSiaLocale();
  const formatLocale = useFormatLocale("date");
  const locale = localeProp ?? formatLocale;
  const labels = { ...messages.eventCalendar, ...labelsProp };
  const aujourdhui = isoDay(new Date());

  const [vueInterne, setVueInterne] = useState<CalendarView>(defaultView);
  const vue = viewProp ?? vueInterne;
  const [ancreInterne, setAncreInterne] = useState(
    () =>
      defaultDate ??
      defaultValue ??
      (defaultMonth ? `${defaultMonth.slice(0, 7)}-01` : aujourdhui),
  );
  const ancre = dateProp ?? ancreInterne;
  const [jourChoisi, setJourChoisi] = useState(ancre);

  const racine = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const noeud = racine.current;
    if (!noeud || typeof ResizeObserver === "undefined") return undefined;
    const observateur = new ResizeObserver(([entree]) =>
      setCompact((entree?.contentRect.width ?? SEUIL_COMPACT) < SEUIL_COMPACT),
    );
    observateur.observe(noeud);
    return () => observateur.disconnect();
  }, []);

  const changerVue = (suivante: CalendarView) => {
    if (viewProp === undefined) setVueInterne(suivante);
    onViewChange?.(suivante);
  };
  const changerAncre = (suivante: string) => {
    if (dateProp === undefined) setAncreInterne(suivante);
    setJourChoisi(suivante);
    onDateChange?.(suivante);
  };

  const periode = useMemo(
    () => visibleRange(vue, ancre, firstDayOfWeek),
    [ancre, firstDayOfWeek, vue],
  );

  // La période à charger, à chaque changement et au premier affichage.
  const annoncer = useRef(onRangeChange);
  annoncer.current = onRangeChange;
  useEffect(() => {
    annoncer.current?.(periode, vue);
  }, [periode.start, periode.end, vue]); // eslint-disable-line react-hooks/exhaustive-deps

  const normalises = useMemo(() => normaliser(events), [events]);

  const jours = useMemo(() => {
    if (vue === "week") return weekDays(ancre, firstDayOfWeek);
    if (vue === "day") return [ancre];
    if (vue === "month") return monthGrid(ancre, firstDayOfWeek);
    const liste: string[] = [];
    for (let j = periode.start; j <= periode.end; j = addDaysIso(j, 1)) liste.push(j);
    return liste;
  }, [ancre, firstDayOfWeek, periode.end, periode.start, vue]);

  const parJour = useMemo(() => eventsByDay(normalises, jours), [jours, normalises]);

  const fmt = (options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(locale, options);
  const titre =
    vue === "week"
      ? formatSemaine(jours[0]!, jours[6]!, locale)
      : vue === "day"
        ? capitaliser(fmt({ weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(dayToDate(ancre)))
        : capitaliser(fmt({ month: "long", year: "numeric" }).format(dayToDate(ancre)));

  const deplacer = (sens: 1 | -1) =>
    changerAncre(
      vue === "week"
        ? addDaysIso(ancre, 7 * sens)
        : vue === "day"
          ? addDaysIso(ancre, sens)
          : addMonthsIso(ancre, sens),
    );

  const nomsDesJours = weekDays("2026-09-28", firstDayOfWeek).map((j) =>
    capitaliser(fmt({ weekday: "short" }).format(dayToDate(j)).replace(".", "")),
  );

  const cliquerJour = (jour: string, evenement: MouseEvent) => {
    // Seul le fond de la case compte : un clic sur un événement ou sur « +N »
    // a son propre sens.
    if ((evenement.target as HTMLElement).closest("button")) return;
    if (compact) setJourChoisi(jour);
    else onDateClick?.(jour);
  };

  const puce = (placement: DayEvent<T & CalendarEventInput>) => {
    const { event } = placement;
    const barre = event.allDay || placement.continuesBefore || placement.continuesAfter || !placement.time;
    return (
      <button
        type="button"
        key={event.id}
        className={cn(
          "sia-ec__event",
          `sia-ec__event--${event.tone ?? "primary"}`,
          barre ? "sia-ec__event--bar" : "sia-ec__event--timed",
          placement.continuesBefore && "sia-ec__event--continues-before",
          placement.continuesAfter && "sia-ec__event--continues-after",
        )}
        // Le titre entier au survol : dans une case, il est souvent coupé.
        title={placement.time ? `${placement.time} · ${event.title}` : event.title}
        onClick={() => onEventClick?.(event)}
      >
        {renderEvent ? (
          renderEvent(event, placement)
        ) : (
          <>
            {!barre && <span className="sia-ec__dot" aria-hidden="true" />}
            {placement.time && <span className="sia-ec__time">{placement.time}</span>}
            <span className="sia-ec__title">{event.title}</span>
          </>
        )}
      </button>
    );
  };

  const libelleJour = (jour: string) =>
    capitaliser(fmt({ weekday: "long", day: "numeric", month: "long" }).format(dayToDate(jour)));

  const listeDuJour = (jour: string) => {
    const liste = parJour.get(jour) ?? [];
    return liste.length === 0 ? (
      <p className="sia-ec__empty-day">{labels.emptyDay}</p>
    ) : (
      <div className="sia-ec__list">{liste.map(puce)}</div>
    );
  };

  const moisCourant = ancre.slice(0, 7);

  const toucheCase = (jour: string) => (event: KeyboardEvent) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (compact) setJourChoisi(jour);
      else onDateClick?.(jour);
    }
  };

  const grilleMois = (
    <div className="sia-ec__month" role="grid" aria-label={titre}>
      <div className="sia-ec__weekdays" role="row">
        {nomsDesJours.map((nom) => (
          <span key={nom} role="columnheader" className="sia-ec__weekday">
            {nom}
          </span>
        ))}
      </div>
      {Array.from({ length: 6 }, (_, semaine) => (
        <div key={semaine} className="sia-ec__week" role="row">
          {jours.slice(semaine * 7, semaine * 7 + 7).map((jour) => {
            const liste = parJour.get(jour) ?? [];
            const visibles = liste.slice(0, maxEventsPerDay);
            const caches = liste.length - visibles.length;
            const jourSemaine = dayToDate(jour).getDay();
            return (
              <div
                key={jour}
                role="gridcell"
                tabIndex={0}
                aria-label={`${libelleJour(jour)}${liste.length ? `, ${plural(labels, "dayEvents", liste.length, locale)}` : ""}`}
                aria-selected={compact ? jour === jourChoisi : undefined}
                className={cn(
                  "sia-ec__day",
                  jour.slice(0, 7) !== moisCourant && "sia-ec__day--outside",
                  jour === aujourdhui && "sia-ec__day--today",
                  (jourSemaine === 0 || jourSemaine === 6) && "sia-ec__day--weekend",
                  compact && jour === jourChoisi && "sia-ec__day--selected",
                )}
                onClick={(event) => cliquerJour(jour, event)}
                onKeyDown={toucheCase(jour)}
              >
                <span className="sia-ec__day-number">{Number(jour.slice(8))}</span>
                {compact ? (
                  <span className="sia-ec__dots" aria-hidden="true">
                    {liste.slice(0, 3).map(({ event }) => (
                      <span key={event.id} className={cn("sia-ec__dot", `sia-ec__dot--${event.tone ?? "primary"}`)} />
                    ))}
                  </span>
                ) : (
                  <div className="sia-ec__events">
                    {visibles.map(puce)}
                    {caches > 0 && (
                      <Popover
                        placement="bottom-start"
                        title={libelleJour(jour)}
                        {...popoverProps}
                        content={<div className="sia-ec__list">{liste.map(puce)}</div>}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          {...moreButtonProps}
                          className={cn("sia-ec__more", moreButtonProps?.className)}
                        >
                          {plural(labels, "more", caches, locale)}
                        </Button>
                      </Popover>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  // L'heure qui passe, pour la ligne rouge d'aujourd'hui.
  const [maintenant, setMaintenant] = useState(() => {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  });
  const grilleVisible = vue === "week" || vue === "day";
  useEffect(() => {
    if (!grilleVisible) return undefined;
    const minuteur = window.setInterval(() => {
      const d = new Date();
      setMaintenant(d.getHours() * 60 + d.getMinutes());
    }, 60_000);
    return () => window.clearInterval(minuteur);
  }, [grilleVisible]);

  // À l'ouverture, la grille se place sur le début de journée plutôt que sur
  // minuit : personne ne travaille à 1 h du matin.
  const corps = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const noeud = corps.current;
    if (!noeud) return;
    const heure = noeud.querySelector<HTMLElement>(".sia-ec__hour");
    const hauteur = heure?.offsetHeight ?? 48;
    noeud.scrollTop = scrollToHour * hauteur;
  }, [grilleVisible, scrollToHour]);

  /** La demi-heure visée par un clic dans une colonne. */
  const cliquerCreneau = (jour: string, evenement: MouseEvent<HTMLDivElement>) => {
    if ((evenement.target as HTMLElement).closest("button")) return;
    const cadre = evenement.currentTarget.getBoundingClientRect();
    const minutes = ((evenement.clientY - cadre.top) / cadre.height) * 24 * 60;
    const creneau = Math.max(0, Math.min(23 * 60 + 30, Math.floor(minutes / 30) * 30));
    onDateClick?.(jour, `${String(Math.floor(creneau / 60)).padStart(2, "0")}:${String(creneau % 60).padStart(2, "0")}`);
  };

  const heures = Array.from({ length: 24 }, (_, h) => h);
  const grilleHoraire = (
    <div
      className={cn("sia-ec__timegrid", vue === "day" && "sia-ec__timegrid--day")}
      style={{ ["--sia-ec-days" as string]: jours.length }}
    >
      <div className="sia-ec__tg-head">
        <span className="sia-ec__tg-gutter" aria-hidden="true" />
        {jours.map((jour) => (
          <button
            type="button"
            key={jour}
            className={cn("sia-ec__tg-dayhead", jour === aujourdhui && "sia-ec__tg-dayhead--today")}
            onClick={() => {
              changerAncre(jour);
              if (vue === "week" && views.includes("day")) changerVue("day");
            }}
            aria-label={libelleJour(jour)}
          >
            <span className="sia-ec__tg-weekday">
              {capitaliser(fmt({ weekday: "short" }).format(dayToDate(jour)).replace(".", ""))}
            </span>
            <span className="sia-ec__tg-daynum">{Number(jour.slice(8))}</span>
          </button>
        ))}
      </div>

      <div className="sia-ec__tg-allday">
        <span className="sia-ec__tg-gutter">{labels.allDay}</span>
        {jours.map((jour) => (
          <div key={jour} className="sia-ec__tg-allday-cell">
            {(parJour.get(jour) ?? [])
              .filter((p) => p.event.allDay || p.continuesBefore || p.continuesAfter || !p.time)
              .map(puce)}
          </div>
        ))}
      </div>

      <div className="sia-ec__tg-body" ref={corps}>
        <div className="sia-ec__tg-hours" aria-hidden="true">
          {heures.map((h) => (
            <span key={h} className="sia-ec__hour">
              {h === 0 ? "" : `${String(h).padStart(2, "0")}:00`}
            </span>
          ))}
        </div>
        {jours.map((jour) => (
          <div
            key={jour}
            className={cn("sia-ec__tg-col", jour === aujourdhui && "sia-ec__tg-col--today")}
            onClick={(evenement) => cliquerCreneau(jour, evenement)}
            aria-label={libelleJour(jour)}
            role="group"
          >
            {layoutDay(parJour.get(jour) ?? []).map((p) => (
              <button
                type="button"
                key={p.event.id}
                className={cn("sia-ec__slot", `sia-ec__event--${p.event.tone ?? "primary"}`)}
                style={{
                  top: `${(p.start / 1440) * 100}%`,
                  height: `${((p.end - p.start) / 1440) * 100}%`,
                  left: `calc(${(p.column / p.columns) * 100}% + 2px)`,
                  width: `calc(${100 / p.columns}% - 4px)`,
                }}
                onClick={() => onEventClick?.(p.event)}
              >
                {renderEvent ? (
                  renderEvent(p.event, { event: p.event, continuesBefore: false, continuesAfter: false, time: formatMinutes(p.start) })
                ) : (
                  <>
                    <span className="sia-ec__slot-title">{p.event.title}</span>
                    <span className="sia-ec__slot-time">
                      {formatMinutes(p.start)} – {formatMinutes(p.end)}
                    </span>
                  </>
                )}
              </button>
            ))}
            {jour === aujourdhui && (
              <span
                className="sia-ec__now"
                style={{ top: `${(maintenant / 1440) * 100}%` }}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const joursAvecEvenements = jours.filter((jour) => (parJour.get(jour) ?? []).length > 0);
  const agenda = (
    <div className="sia-ec__agenda">
      {joursAvecEvenements.length === 0 ? (
        <EmptyState compact title={labels.empty} {...emptyStateProps} />
      ) : (
        joursAvecEvenements.map((jour) => (
          <section key={jour} className="sia-ec__agenda-day">
            <h3 className={cn("sia-ec__agenda-date", jour === aujourdhui && "sia-ec__agenda-date--today")}>
              {libelleJour(jour)}
            </h3>
            <div className="sia-ec__list">
              {(parJour.get(jour) ?? []).map((placement) => (
                <div key={placement.event.id} className="sia-ec__agenda-row">
                  {puce(placement)}
                  {placement.event.location && (
                    <span className="sia-ec__location">{placement.event.location}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );

  return (
    <div
      ref={racine}
      className={cn(
        "sia-ec",
        `sia-ec--${variant}`,
        `sia-ec--events-${eventVariant}`,
        density === "compact" && "sia-ec--dense",
        compact && "sia-ec--compact",
        loading && "sia-ec--loading",
        className,
      )}
      aria-busy={loading || undefined}
    >
      <div className="sia-ec__toolbar">
        <div className="sia-ec__nav">
          <Button
            variant="outline"
            size="sm"
            {...toolbarButtonProps}
            onClick={() => changerAncre(aujourdhui)}
          >
            {labels.today}
          </Button>
          <IconButton variant="ghost" size="sm" {...navButtonProps} label={labels.previous} icon={<ChevronLeftIcon />} onClick={() => deplacer(-1)} />
          <IconButton variant="ghost" size="sm" {...navButtonProps} label={labels.next} icon={<ChevronRightIcon />} onClick={() => deplacer(1)} />
          <h2 className="sia-ec__period" aria-live="polite">
            {titre}
          </h2>
          {loading && <Spinner size="sm" {...spinnerProps} label={labels.loading} />}
        </div>
        <div className="sia-ec__tools">
          {toolbarActions}
          {views.length > 1 && (
            <RadioGroup
              orientation="horizontal"
              size="sm"
              label={<span className="sia-visually-hidden">{labels.viewSwitch}</span>}
              {...viewSwitchProps}
              className={cn("sia-ec__views", viewSwitchProps?.className)}
              value={vue}
              onValueChange={(v) => changerVue(v as CalendarView)}
            >
              {views.map((v) => (
                <RadioButton key={v} {...viewButtonProps} value={v}>
                  {labels[v]}
                </RadioButton>
              ))}
            </RadioGroup>
          )}
        </div>
      </div>

      {vue === "month" ? grilleMois : grilleVisible ? grilleHoraire : agenda}

      {compact && vue === "month" && (
        <section className="sia-ec__selected" aria-live="polite">
          <header className="sia-ec__selected-head">
            <h3>{libelleJour(jourChoisi)}</h3>
            {onDateClick && (
              <IconButton
                variant="outline"
                size="sm"
                {...navButtonProps}
                label={labels.add}
                icon={<PlusIcon />}
                onClick={() => onDateClick(jourChoisi)}
              />
            )}
          </header>
          {listeDuJour(jourChoisi)}
        </section>
      )}
    </div>
  );
}

/** 870 → « 14:30 ». */
function formatMinutes(minutes: number) {
  const bornees = Math.min(minutes, 24 * 60 - 1);
  return `${String(Math.floor(bornees / 60)).padStart(2, "0")}:${String(bornees % 60).padStart(2, "0")}`;
}

function capitaliser(texte: string) {
  return texte.charAt(0).toUpperCase() + texte.slice(1);
}

/** « 28 sept. – 4 oct. 2026 », sans répéter le mois ni l'année s'ils ne changent pas. */
function formatSemaine(debut: string, fin: string, locale: string) {
  const d = dayToDate(debut);
  const f = dayToDate(fin);
  const memeMois = debut.slice(0, 7) === fin.slice(0, 7);
  const gauche = new Intl.DateTimeFormat(locale, memeMois ? { day: "numeric" } : { day: "numeric", month: "short" }).format(d);
  const droite = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" }).format(f);
  return `${gauche} – ${droite}`;
}

/** Les jours qu'un événement occupe — exporté pour qui compose sa propre vue. */
export { eventDays };
