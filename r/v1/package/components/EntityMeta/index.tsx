import { type ReactNode } from "react";
import { cn, formatDate, formatTimeAgo, normalizeIdentifier, truncate } from "@sia-ui/utils";
import { useSiaLocale } from "@sia-ui/headless";
import "./styles.css";

export interface EntityMetaProps {
  createdAt?: Date | string | number;
  updatedAt?: Date | string | number;
  createdBy?: ReactNode;
  updatedBy?: ReactNode;
  identifier?: string;
  status?: ReactNode;
  /** La langue des dates. Par défaut, celle de la locale SIA. */
  locale?: string;
  className?: string;
}

function Detail({
  label,
  value,
  emphasized
}: {
  label: string;
  value?: ReactNode;
  emphasized?: boolean;
}) {
  if (!value) return null;

  return (
    <div className="sia-entity-meta__item">
      <span className="sia-entity-meta__label">{label}</span>
      <span className={cn("sia-entity-meta__value", emphasized && "sia-entity-meta__value--strong")}>{value}</span>
    </div>
  );
}

/**
 * Les traces d'un objet : créé le, modifié par, identifiant.
 *
 * L'identifiant est normalisé pour être lu à voix haute au téléphone —
 * c'est la première chose qu'on demande à un client, et une chaîne de
 * trente-six caractères ne se dicte pas.
 */
export function EntityMeta({
  createdAt,
  updatedAt,
  createdBy,
  updatedBy,
  identifier,
  status,
  locale: localeProp,
  className
}: EntityMetaProps) {
  const messages = useSiaLocale();
  const locale = localeProp ?? messages.language;
  const textes = messages.entityMeta;
  const normalizedIdentifier = identifier ? normalizeIdentifier(identifier) : undefined;
  const createdLabel = createdAt ? formatTimeAgo(createdAt, { locale, prefix: textes.createdPrefix }) : undefined;
  const updatedLabel = updatedAt ? formatTimeAgo(updatedAt, { locale, prefix: textes.updatedPrefix }) : undefined;
  const updatedDate = updatedAt ? formatDate(updatedAt, { locale, dateStyle: "medium", timeStyle: "short" }) : undefined;

  return (
    <section className={cn("sia-entity-meta", className)} aria-label={textes.label}>
      <div className="sia-entity-meta__header">
        {status && <span className="sia-entity-meta__status">{status}</span>}
        {normalizedIdentifier && <code className="sia-entity-meta__identifier">{truncate(normalizedIdentifier, 36)}</code>}
      </div>
      <div className="sia-entity-meta__grid">
        <Detail label={textes.created} value={createdLabel} emphasized />
        <Detail label={textes.createdBy} value={createdBy} />
        <Detail label={textes.updated} value={updatedLabel} emphasized />
        <Detail label={textes.updatedBy} value={updatedBy} />
        <Detail label={textes.lastDate} value={updatedDate} />
      </div>
    </section>
  );
}
