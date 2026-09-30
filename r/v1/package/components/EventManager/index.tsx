import { useState, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import {
  dayToDate,
  eventDays,
  hasFormErrors,
  useSiaLocale,
  useLocalForm,
  type FormErrors,
  type EventManagerMessages,
  type FormSubmitResult,
} from "@sia-ui/headless";
import type { ComponentTone } from "@sia-ui/tokens";
import { Badge, type BadgeProps } from "../Badge";
import { Button, type ButtonProps } from "../Button";
import { Descriptions, type DescriptionsProps } from "../Descriptions";
import { ConfirmDialog, type ConfirmDialogProps } from "../ConfirmDialog";
import {
  EventCalendar,
  type CalendarEvent,
  type EventCalendarProps,
} from "../EventCalendar";
import { Form, type FormEntry, type FormProps, type FormShape } from "../Form";
import { Modal, type ModalProps } from "../Modal";
import { PlusIcon } from "../Icons";
import "./styles.css";

/** Ce que le formulaire rend : un événement prêt à envoyer, champs métier compris. */
export interface EventDraft {
  title: string;
  start: string;
  end?: string | undefined;
  allDay: boolean;
  tone?: ComponentTone | undefined;
  location?: string | undefined;
  description?: string | undefined;
  /** Les champs déclarés dans `extraFields`, sous leur nom. */
  [champ: string]: unknown;
}

type Resultat = FormSubmitResult<FormShape> | Promise<FormSubmitResult<FormShape>>;

/** Les libellés du gestionnaire : le groupe `eventManager` de la locale SIA. */
export type EventManagerLabels = EventManagerMessages;

/** Les couleurs proposées par défaut, nommées par la locale. */
function tonsDe(labels: EventManagerLabels): Array<{ value: ComponentTone; label: string }> {
  return [
    { value: "primary", label: labels.tonePrimary },
    { value: "success", label: labels.toneSuccess },
    { value: "warning", label: labels.toneWarning },
    { value: "danger", label: labels.toneDanger },
    { value: "info", label: labels.toneInfo },
    { value: "neutral", label: labels.toneNeutral },
  ];
}

export interface EventManagerProps<T extends CalendarEvent = CalendarEvent> {
  events: T[];
  /** Absent : pas de création. Rendre `{ champ: message }` garde le formulaire ouvert. */
  onCreate?: (draft: EventDraft) => Resultat;
  /** Absent : les événements se consultent sans se modifier. */
  onUpdate?: (event: T, draft: EventDraft) => Resultat;
  /** Absent : pas de suppression. Confirmée d'office. */
  onDelete?: (event: T) => void | Promise<void>;

  /** Des champs métier en plus : participants, salle, rappel. Leurs valeurs arrivent dans le brouillon. */
  extraFields?: FormEntry[];
  /** Les valeurs de départ de ces champs, et comment les relire sur un événement. */
  extraDefaults?: FormShape;
  /** Les couleurs proposées. Par défaut, les tons du système, nommés par la locale. */
  toneOptions?: Array<{ value: ComponentTone; label: string }>;
  /** Remplace le contenu de la fiche d'un événement. */
  renderDetail?: (event: T) => ReactNode;
  /** Remplace, clé par clé, les textes du groupe `eventManager` de la locale. */
  labels?: Partial<EventManagerLabels>;
  /** La langue des dates de la fiche. Par défaut, celle de la locale SIA. */
  locale?: string;

  /** Le calendrier lui-même : vues, variantes, période, rendu des événements. */
  calendarProps?: Partial<
    Omit<EventCalendarProps<T>, "events" | "onDateClick" | "onEventClick">
  >;
  /** Les boîtes de fiche et de formulaire. */
  modalProps?: Partial<Omit<ModalProps, "open" | "onOpenChange" | "children" | "title" | "footer">>;
  /** Le formulaire, hors champs, valeurs et envoi qu'il reçoit d'ici. */
  formProps?: Partial<Omit<FormProps, "fields" | "form" | "defaultValues" | "validate" | "onSubmit">>;
  /** La confirmation de suppression. */
  confirmDialogProps?: Partial<Omit<ConfirmDialogProps, "open" | "onOpenChange" | "onConfirm">>;
  /** Le bouton « Nouvel événement » de la barre. */
  createButtonProps?: Partial<Omit<ButtonProps, "onClick">>;
  /** La fiche d'un événement, hors rubriques qu'elle tire de l'événement. */
  descriptionsProps?: Partial<Omit<DescriptionsProps, "items">>;
  /** La pastille d'une couleur, dans la fiche et dans le choix des couleurs. */
  toneBadgeProps?: Partial<Omit<BadgeProps, "tone" | "children">>;
  className?: string;
}

type Etat<T> =
  | { mode: "create"; date: string; time?: string | undefined }
  | { mode: "view"; event: T }
  | { mode: "edit"; event: T }
  | null;

const aujourdhui = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const heureDe = (valeur: string | undefined) => (valeur ? /T(\d{2}:\d{2})/.exec(valeur)?.[1] : undefined);

/** Une heure plus tard, sans passer minuit. */
function uneHeureApres(heure: string) {
  const [h, m] = heure.split(":").map(Number) as [number, number];
  return `${String(Math.min(23, h + 1)).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Les valeurs du formulaire d'un événement existant, ou d'un nouveau. */
function valeursDe<T extends CalendarEvent>(etat: Exclude<Etat<T>, null>, extraDefaults: FormShape): FormShape {
  if (etat.mode === "create") {
    const debut = etat.time ?? "09:00";
    return {
      title: "",
      date: etat.date,
      endDate: "",
      allDay: false,
      startTime: debut,
      endTime: uneHeureApres(debut),
      tone: "primary",
      location: "",
      description: "",
      ...extraDefaults,
    };
  }

  const { event } = etat;
  const start = event.start ?? event.date ?? aujourdhui();
  const jours = eventDays({ id: event.id, title: event.title, start, end: event.end });
  const allDay = Boolean(event.allDay) || !heureDe(start);
  const extras: FormShape = {};
  for (const cle of Object.keys(extraDefaults)) {
    const valeur = (event as Record<string, unknown>)[cle];
    extras[cle] = (valeur ?? extraDefaults[cle]) as FormShape[string];
  }
  return {
    title: event.title,
    date: jours.start,
    endDate: jours.end !== jours.start ? jours.end : "",
    allDay,
    startTime: heureDe(start) ?? "09:00",
    endTime: heureDe(event.end) ?? uneHeureApres(heureDe(start) ?? "09:00"),
    tone: event.tone ?? "primary",
    location: typeof event.location === "string" ? event.location : "",
    description: typeof event.description === "string" ? event.description : "",
    ...extras,
  };
}

/** Le brouillon d'événement que rend un formulaire rempli. */
function brouillonDe(valeurs: FormShape, extras: string[]): EventDraft {
  const allDay = Boolean(valeurs.allDay);
  const date = String(valeurs.date);
  const fin = String(valeurs.endDate || "") || date;
  const brouillon: EventDraft = {
    title: String(valeurs.title).trim(),
    allDay,
    start: allDay ? date : `${date}T${valeurs.startTime}`,
    end: allDay
      ? fin !== date ? fin : undefined
      : valeurs.endTime
        ? `${fin}T${valeurs.endTime}`
        : undefined,
    tone: (valeurs.tone || undefined) as ComponentTone | undefined,
    location: String(valeurs.location || "") || undefined,
    description: String(valeurs.description || "") || undefined,
  };
  for (const cle of extras) brouillon[cle] = valeurs[cle];
  return brouillon;
}

/**
 * Un calendrier où l'on gère ses événements.
 *
 * Il assemble ce qui existe — \`EventCalendar\` pour voir, \`Modal\` et
 * \`Form\` pour saisir, \`ConfirmDialog\` pour supprimer — et tient le reste :
 *
 * - un clic sur un jour ouvre la création à cette date, et à la demi-heure
 *   visée dans la grille horaire ;
 * - un clic sur un événement ouvre sa fiche, d'où l'on modifie ou supprime ;
 * - un refus du serveur garde le formulaire ouvert, erreurs sous les champs.
 *
 * Les données restent à l'appelant : `onCreate`, `onUpdate` et `onDelete`
 * reçoivent un brouillon prêt à envoyer, et le calendrier affiche ce qu'on
 * lui repasse dans `events`.
 */
export function EventManager<T extends CalendarEvent = CalendarEvent>({
  events,
  onCreate,
  onUpdate,
  onDelete,
  extraFields = [],
  extraDefaults = {},
  toneOptions: toneOptionsProp,
  renderDetail,
  labels: labelsProp,
  locale: localeProp,
  calendarProps,
  modalProps,
  formProps,
  confirmDialogProps,
  createButtonProps,
  descriptionsProps,
  toneBadgeProps,
  className,
}: EventManagerProps<T>) {
  const messages = useSiaLocale();
  const locale = localeProp ?? messages.language;
  const labels = { ...messages.eventManager, ...labelsProp };
  const toneOptions = toneOptionsProp ?? tonsDe(labels);
  const [etat, setEtat] = useState<Etat<T>>(null);
  const [aSupprimer, setASupprimer] = useState<T | null>(null);

  const fermer = () => setEtat(null);

  const creer = onCreate
    ? (date: string, time?: string) => setEtat({ mode: "create", date, time })
    : undefined;

  return (
    <div className={cn("sia-event-manager", className)}>
      <EventCalendar<T>
        {...calendarProps}
        events={events}
        {...(creer ? { onDateClick: creer } : {})}
        onEventClick={(event) => setEtat({ mode: "view", event })}
        toolbarActions={
          <>
            {calendarProps?.toolbarActions}
            {creer && (
              <Button size="sm" leftIcon={<PlusIcon />} {...createButtonProps} onClick={() => creer(aujourdhui())}>
                {createButtonProps?.children ?? labels.create}
              </Button>
            )}
          </>
        }
      />

      {etat?.mode === "view" && (
        <Modal
          {...modalProps}
          open
          onOpenChange={(ouvert) => !ouvert && fermer()}
          title={etat.event.title}
          className={cn("sia-event-manager__detail", modalProps?.className)}
          footer={
            (onUpdate || onDelete) && (
              <div className="sia-event-manager__actions">
                {onDelete && (
                  <Button variant="ghost" tone="danger" onClick={() => setASupprimer(etat.event)}>
                    {labels.delete}
                  </Button>
                )}
                {onUpdate && (
                  <Button onClick={() => setEtat({ mode: "edit", event: etat.event })}>{labels.edit}</Button>
                )}
              </div>
            )
          }
        >
          {renderDetail ? (
            renderDetail(etat.event)
          ) : (
            <Fiche
              event={etat.event}
              locale={locale}
              labels={labels}
              toneOptions={toneOptions}
              descriptionsProps={descriptionsProps}
              toneBadgeProps={toneBadgeProps}
            />
          )}
        </Modal>
      )}

      {(etat?.mode === "create" || etat?.mode === "edit") && (
        <Modal
          {...modalProps}
          open
          onOpenChange={(ouvert) => !ouvert && fermer()}
          title={etat.mode === "create" ? labels.newEvent : labels.editEvent}
          className={cn("sia-event-manager__form", modalProps?.className)}
        >
          <FormulaireEvenement
            // Remonté à chaque ouverture : les valeurs de départ sont figées
            // à la première passe de \`useLocalForm\`.
            key={etat.mode === "edit" ? `edit-${etat.event.id}` : `create-${etat.date}-${etat.time ?? ""}`}
            depart={valeursDe(etat, extraDefaults)}
            extraFields={extraFields}
            toneOptions={toneOptions}
            toneBadgeProps={toneBadgeProps}
            labels={labels}
            formProps={formProps}
            envoyer={async (brouillon) => {
              const resultat =
                etat.mode === "create"
                  ? await onCreate?.(brouillon)
                  : await onUpdate?.(etat.event, brouillon);
              if (hasFormErrors(resultat)) return resultat;
              fermer();
              return undefined;
            }}
          />
        </Modal>
      )}

      {aSupprimer && onDelete && (
        <ConfirmDialog
          title={labels.deleteTitle}
          description={labels.deleteDescription}
          confirmLabel={labels.delete}
          tone="danger"
          {...confirmDialogProps}
          open
          onOpenChange={(ouvert) => !ouvert && setASupprimer(null)}
          onConfirm={async () => {
            await onDelete(aSupprimer);
            setASupprimer(null);
            fermer();
          }}
        />
      )}
    </div>
  );
}

/** La fiche d'un événement : quand, où, quoi. */
/** La fiche d'un événement : quand, où, quoi — des `Descriptions` en une colonne. */
function Fiche<T extends CalendarEvent>({
  event,
  locale,
  labels,
  toneOptions,
  descriptionsProps,
  toneBadgeProps,
}: {
  event: T;
  locale: string;
  labels: EventManagerLabels;
  toneOptions: Array<{ value: ComponentTone; label: string }>;
  descriptionsProps: EventManagerProps["descriptionsProps"];
  toneBadgeProps: EventManagerProps["toneBadgeProps"];
}) {
  const start = event.start ?? event.date ?? "";
  const { start: debut, end: fin } = eventDays({ id: event.id, title: event.title, start, end: event.end });
  const jour = (d: string) =>
    new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(dayToDate(d));
  const h1 = heureDe(start);
  const h2 = heureDe(event.end);
  const quand =
    debut === fin
      ? `${jour(debut)}${event.allDay || !h1 ? ` · ${labels.allDay.toLowerCase()}` : ` · ${h1}${h2 ? ` – ${h2}` : ""}`}`
      : `${jour(debut)}${h1 && !event.allDay ? ` ${h1}` : ""} → ${jour(fin)}${h2 && !event.allDay ? ` ${h2}` : ""}`;

  const ton = event.tone ?? "primary";
  const couleur = toneOptions.find((t) => t.value === ton)?.label;

  return (
    <Descriptions
      columns={1}
      {...descriptionsProps}
      className={cn("sia-event-manager__fiche", `sia-ec__event--${ton}`, descriptionsProps?.className)}
      items={[
        {
          key: "quand",
          label: labels.date,
          value: <span className="sia-event-manager__when">{quand.charAt(0).toUpperCase() + quand.slice(1)}</span>,
        },
        ...(couleur ? [{ key: "ton", label: labels.tone, value: <Badge {...toneBadgeProps} tone={ton}>{couleur}</Badge> }] : []),
        ...(event.location ? [{ key: "lieu", label: labels.location, value: event.location }] : []),
        ...(event.description
          ? [{ key: "description", label: labels.description, value: <span className="sia-event-manager__description">{event.description}</span> }]
          : []),
      ]}
    />
  );
}

interface FormulaireProps {
  depart: FormShape;
  extraFields: FormEntry[];
  toneOptions: Array<{ value: ComponentTone; label: string }>;
  toneBadgeProps: EventManagerProps["toneBadgeProps"];
  labels: EventManagerLabels;
  formProps: EventManagerProps["formProps"];
  envoyer: (brouillon: EventDraft) => Promise<FormSubmitResult<FormShape>>;
}

function FormulaireEvenement({ depart, extraFields, toneOptions, toneBadgeProps, labels, formProps, envoyer }: FormulaireProps) {
  const extras = extraFields.flatMap((e) => ("group" in e ? e.fields : [e])).map((f) => f.name);

  const form = useLocalForm<FormShape>({
    defaultValues: depart,
    validate: (v) => {
      const erreurs: FormErrors<FormShape> = {};
      if (!String(v.title ?? "").trim()) erreurs.title = labels.titleRequired;
      const debut = v.allDay ? String(v.date) : `${v.date}T${v.startTime}`;
      const fin = v.allDay
        ? String(v.endDate || v.date)
        : `${v.endDate || v.date}T${v.endTime || v.startTime}`;
      if (fin < debut) erreurs[v.allDay ? "endDate" : "endTime"] = labels.endBeforeStart;
      return erreurs;
    },
    onSubmit: (valeurs) => envoyer(brouillonDe(valeurs, extras)),
  });

  const journee = Boolean(form.state.values.allDay);

  // Les champs suivent la saisie : pas d'heures pour une journée entière.
  const champs: FormEntry[] = [
    { name: "title", label: labels.title, required: true, colSpan: 2 },
    { name: "date", label: labels.date, type: "date", required: true },
    { name: "endDate", label: labels.endDate, type: "date" },
    { name: "allDay", label: labels.allDay, type: "switch", colSpan: 2 },
    ...(journee
      ? []
      : ([
          { name: "startTime", label: labels.startTime, type: "time" },
          { name: "endTime", label: labels.endTime, type: "time" },
        ] as FormEntry[])),
    {
      name: "tone",
      label: labels.tone,
      type: "select",
      colSpan: 2,
      options: toneOptions.map((t) => ({
        value: t.value,
        label: <Badge {...toneBadgeProps} tone={t.value}>{t.label}</Badge>,
        keywords: [t.label],
      })),
    },
    { name: "location", label: labels.location, colSpan: 2 },
    { name: "description", label: labels.description, type: "textarea", colSpan: 2 },
    ...extraFields,
  ];

  return (
    <Form
      columns={2}
      submitText={formProps?.submitText ?? labels.submit}
      requireDirty={false}
      {...formProps}
      form={form}
      fields={champs}
    />
  );
}
