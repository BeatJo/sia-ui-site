import { useState, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import type { PermissionRule } from "@sia-ui/headless";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { DropdownMenu } from "../DropdownMenu";
import { ConfirmDialog } from "../ConfirmDialog";
import { MoreHorizontalIcon } from "../Icons";
import type { RowAction } from "./types";

interface RowActionsProps<T> {
  row: T;
  index: number;
  actions: Array<RowAction<T>>;
  inlineLimit: number;
  display: "icon" | "label";
  can: ((rule: PermissionRule) => boolean) | undefined;
}

/**
 * Ce qu'on peut faire d'une ligne.
 *
 * Trois choses se décident ici, et aucune n'est cosmétique : ce que la
 * session a le droit de faire, ce qui demande confirmation, et ce qui ne
 * tient plus dans la largeur et doit passer en menu.
 */
export function RowActions<T>({
  row,
  index,
  actions,
  inlineLimit,
  display,
  can,
}: RowActionsProps<T>) {
  // Une confirmation en attente. Une seule à la fois : deux dialogues
  // superposés sur la même ligne n'ont aucun sens.
  const [enAttente, setEnAttente] = useState<RowAction<T> | null>(null);

  const visibles = actions.filter((action) => {
    if (action.permission !== undefined && can && !can(action.permission)) {
      return false;
    }
    return !action.hidden?.(row, index);
  });

  if (visibles.length === 0) return null;

  const declencher = (action: RowAction<T>) => {
    if (action.confirm) {
      setEnAttente(action);
      return;
    }
    void action.onSelect(row, index);
  };

  const enLigne = visibles.slice(0, inlineLimit);
  const dansLeMenu = visibles.slice(inlineLimit);

  return (
    <div className="sia-table__actions" onClick={(e) => e.stopPropagation()}>
      {enLigne.map((action) => {
        const desactivee = action.disabled?.(row, index) ?? false;
        const nom =
          typeof action.label === "string" ? action.label : action.key;

        // Sans icône, on retombe sur le libellé : un bouton vide ne se clique
        // pas, quelle que soit la consigne d'affichage.
        return display === "icon" && action.icon ? (
          <IconButton
            key={action.key}
            label={nom}
            icon={action.icon}
            variant="ghost"
            size="sm"
            disabled={desactivee}
            tooltip={{ content: action.label }}
            onClick={() => declencher(action)}
          />
        ) : (
          <Button
            key={action.key}
            variant="ghost"
            size="sm"
            {...(action.tone ? { tone: action.tone } : {})}
            disabled={desactivee}
            onClick={() => declencher(action)}
          >
            {action.icon}
            {action.label}
          </Button>
        );
      })}

      {dansLeMenu.length > 0 && (
        <DropdownMenu
          placement="bottom-end"
          items={dansLeMenu.map((action) => ({
            key: action.key,
            label: action.label,
            ...(action.icon ? { icon: action.icon } : {}),
            disabled: action.disabled?.(row, index) ?? false,
            danger: action.tone === "danger",
            onSelect: () => declencher(action),
          }))}
        >
          <IconButton
            label="Autres actions"
            icon={<MoreHorizontalIcon />}
            variant="ghost"
            size="sm"
          />
        </DropdownMenu>
      )}

      {enAttente?.confirm && (
        <ConfirmDialog
          open
          onOpenChange={(ouvert) => {
            if (!ouvert) setEnAttente(null);
          }}
          title={enAttente.confirm.title}
          {...(enAttente.confirm.description
            ? { description: enAttente.confirm.description }
            : {})}
          {...(enAttente.confirm.confirmLabel
            ? { confirmLabel: enAttente.confirm.confirmLabel }
            : {})}
          {...(enAttente.confirm.cancelLabel
            ? { cancelLabel: enAttente.confirm.cancelLabel }
            : {})}
          tone={enAttente.confirm.destructive ? "danger" : "primary"}
          onConfirm={async () => {
            await enAttente.onSelect(row, index);
            setEnAttente(null);
          }}
        />
      )}
    </div>
  );
}

/** Une cellule de carte : libellé au-dessus, valeur en dessous. */
export function CardMeta({
  label,
  value,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("sia-table-card__meta", className)}>
      <span className="sia-table-card__label">{label}</span>
      <span className="sia-table-card__value">{value}</span>
    </div>
  );
}
