import { type ReactNode } from "react";
import { cn, formatDate, formatTimeAgo } from "@sia-ui/utils";
import { useSiaLocale, useFormatLocale } from "@sia-ui/headless";
import "./styles.css";

export interface AuditEvent {
  label: ReactNode;
  at: Date | string | number;
  by?: ReactNode;
  detail?: ReactNode;
}

export interface AuditMetaProps {
  events: AuditEvent[];
  /** La langue des dates. Par défaut, celle de la locale SIA. */
  locale?: string;
  /** Par défaut, « Historique » de la locale SIA. */
  title?: ReactNode;
  /** Par défaut, « Aucune activité » de la locale SIA. */
  emptyLabel?: ReactNode;
  className?: string;
}

/**
 * Qui a fait quoi, et quand.
 *
 * Une liste d'événements plutôt qu'un dernier état : savoir qu'une facture
 * a été validée n'apprend rien si l'on ignore qu'elle avait été rejetée la
 * veille. Les dates sont relatives — « il y a deux jours » se compare sans
 * calcul mental.
 */
export function AuditMeta({ events, locale: localeProp, title: titleProp, emptyLabel: emptyLabelProp, className }: AuditMetaProps) {
  const messages = useSiaLocale();
  const formatLocale = useFormatLocale("date");
  const locale = localeProp ?? formatLocale;
  const title = titleProp ?? messages.auditMeta.title;
  const emptyLabel = emptyLabelProp ?? messages.auditMeta.empty;
  // « par {name} » : l'auteur est un nœud React, le texte l'entoure.
  const [avantAuteur = "", apresAuteur = ""] = messages.auditMeta.by.split("{name}");
  return (
    <section className={cn("sia-audit-meta", className)}>
      <h2 className="sia-audit-meta__title">{title}</h2>
      {events.length === 0 ? (
        <p className="sia-audit-meta__empty">{emptyLabel}</p>
      ) : (
        <ol className="sia-audit-meta__list">
          {events.map((event, index) => (
            <li className="sia-audit-meta__event" key={`${new Date(event.at).getTime()}-${index}`}>
              <span className="sia-audit-meta__marker" aria-hidden="true" />
              <div className="sia-audit-meta__content">
                <div className="sia-audit-meta__heading"><strong>{event.label}</strong>{event.by && <span>{avantAuteur}{event.by}{apresAuteur}</span>}</div>
                {event.detail && <div className="sia-audit-meta__detail">{event.detail}</div>}
                <time className="sia-audit-meta__time" dateTime={new Date(event.at).toISOString()} title={formatDate(event.at, { locale, dateStyle: "full", timeStyle: "short" })}>
                  {formatTimeAgo(event.at, { locale })}
                </time>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
