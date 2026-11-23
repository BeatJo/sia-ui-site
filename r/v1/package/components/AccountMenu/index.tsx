import { type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import { formatMessage, useSiaLocale } from "@sia-ui/headless";
import { Avatar, type AvatarProps } from "../Avatar";
import { Badge, type BadgeProps } from "../Badge";
import {
  DropdownMenu,
  type DropdownMenuProps,
  type MenuEntry,
  type MenuItem,
} from "../DropdownMenu";
import "./styles.css";

export interface AccountMenuProps {
  /** Le nom de la personne connectée : avatar, en-tête et libellé du bouton. */
  name: string;
  email?: ReactNode;
  /** Le rôle, en pastille sous le nom : « Administrateur ». */
  role?: ReactNode;
  /** La photo. À défaut, les initiales de `name`. */
  avatarSrc?: string;
  /** Les entrées sous l'en-tête : profil, préférences, déconnexion. */
  items: MenuEntry[];
  onSelect?: (item: MenuItem) => void;
  /** Le nom accessible du déclencheur. Par défaut, celui de la locale, `accountMenu.trigger` (« Compte de {name} »). */
  triggerLabel?: string;
  /** L'avatar du déclencheur — taille, forme, variante. */
  avatarProps?: Partial<Omit<AvatarProps, "name">>;
  /** L'avatar de l'en-tête du menu. */
  headerAvatarProps?: Partial<Omit<AvatarProps, "name">>;
  /** La pastille du rôle — ton, variante. */
  roleBadgeProps?: Partial<Omit<BadgeProps, "children">>;
  /** Le menu lui-même, hors entrées et déclencheur qu'il reçoit d'ici. */
  dropdownMenuProps?: Partial<Omit<DropdownMenuProps, "items" | "children" | "onSelect">>;
  className?: string;
}

/**
 * Le menu du compte connecté : un avatar qui ouvre un menu à en-tête de profil.
 *
 * Chaque application le recomposait — avatar dans un bouton qui lui
 * ajoutait un cadre, en-tête forcé dans un titre de section en capitales.
 * Ici, le déclencheur est l'avatar seul, rond et sans fond, et l'en-tête une
 * entrée `header` à contenu libre du `DropdownMenu`.
 */
export function AccountMenu({
  name,
  email,
  role,
  avatarSrc,
  items,
  onSelect,
  triggerLabel,
  avatarProps,
  headerAvatarProps,
  roleBadgeProps,
  dropdownMenuProps,
  className,
}: AccountMenuProps) {
  const locale = useSiaLocale();
  const entete: MenuEntry = {
    key: "__sia-account-header",
    type: "header",
    content: (
      <div className="sia-account__who">
        <Avatar
          name={name}
          size="md"
          {...(avatarSrc ? { src: avatarSrc } : {})}
          {...headerAvatarProps}
        />
        <div className="sia-account__identity">
          <strong className="sia-account__name">{name}</strong>
          {email && <span className="sia-account__email">{email}</span>}
          {role && (
            <Badge tone="primary" {...roleBadgeProps} className={cn("sia-account__role", roleBadgeProps?.className)}>
              {role}
            </Badge>
          )}
        </div>
      </div>
    ),
  };

  return (
    <DropdownMenu
      placement="bottom-end"
      {...dropdownMenuProps}
      items={[entete, ...items]}
      {...(onSelect ? { onSelect } : {})}
      className={cn("sia-account__menu", dropdownMenuProps?.className)}
    >
      <button
        type="button"
        className={cn("sia-account__trigger", className)}
        aria-label={triggerLabel ?? formatMessage(locale.accountMenu.trigger, { name })}
      >
        <Avatar
          name={name}
          size="sm"
          {...(avatarSrc ? { src: avatarSrc } : {})}
          {...avatarProps}
        />
      </button>
    </DropdownMenu>
  );
}
