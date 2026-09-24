import { type ReactNode } from "react";
import { cn, formatDate, formatTimeAgo } from "@sia-ui/utils";
import "./styles.css";

export interface AuditEvent {
  label: ReactNode;
  at: Date | string | number;
  by?: ReactNode;
  detail?: ReactNode;
}

export interface AuditMetaProps {
  events: AuditEvent[];
  locale?: string;
  title?: ReactNode;
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
export function AuditMeta({ events, locale = "fr-FR", title = "Historique", emptyLabel = "Aucune activité", className }: AuditMetaProps) {
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
                <div className="sia-audit-meta__heading"><strong>{event.label}</strong>{event.by && <span>par {event.by}</span>}</div>
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
