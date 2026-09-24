import { type ReactNode } from "react";
import { cn, formatDate, formatTimeAgo, normalizeIdentifier, truncate } from "@sia-ui/utils";
import "./styles.css";

export interface EntityMetaProps {
  createdAt?: Date | string | number;
  updatedAt?: Date | string | number;
  createdBy?: ReactNode;
  updatedBy?: ReactNode;
  identifier?: string;
  status?: ReactNode;
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
  locale = "fr-FR",
  className
}: EntityMetaProps) {
  const normalizedIdentifier = identifier ? normalizeIdentifier(identifier) : undefined;
  const createdLabel = createdAt ? formatTimeAgo(createdAt, { locale, prefix: "Créée" }) : undefined;
  const updatedLabel = updatedAt ? formatTimeAgo(updatedAt, { locale, prefix: "Mise à jour" }) : undefined;
  const updatedDate = updatedAt ? formatDate(updatedAt, { locale, dateStyle: "medium", timeStyle: "short" }) : undefined;

  return (
    <section className={cn("sia-entity-meta", className)} aria-label="Métadonnées">
      <div className="sia-entity-meta__header">
        {status && <span className="sia-entity-meta__status">{status}</span>}
        {normalizedIdentifier && <code className="sia-entity-meta__identifier">{truncate(normalizedIdentifier, 36)}</code>}
      </div>
      <div className="sia-entity-meta__grid">
        <Detail label="Création" value={createdLabel} emphasized />
        <Detail label="Créé par" value={createdBy} />
        <Detail label="Modification" value={updatedLabel} emphasized />
        <Detail label="Modifié par" value={updatedBy} />
        <Detail label="Dernière date" value={updatedDate} />
      </div>
    </section>
  );
}
