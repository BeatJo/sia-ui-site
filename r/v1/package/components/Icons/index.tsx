/**
 * Le jeu d'icônes commun.
 *
 * Il n'a pas de composant principal : c'est une collection, et chaque icône y
 * est une fonction. Toutes passent par le même socle — un trait de 1,8, des
 * extrémités arrondies, une taille en `em` qui suit celle du texte, et un
 * `aria-hidden` d'office. Une icône ne porte jamais de sens à elle seule;
 * c'est le libellé à côté qui le porte.
 *
 * Ce jeu couvre ce dont la bibliothèque a besoin, plus la navigation d'une
 * console de gestion — dossier, serveur, utilisateurs, activité, clé, compte,
 * déconnexion : ce que chaque application redessinait. Au-delà, un produit
 * passe ses propres icônes en props plutôt que d'étendre celui-ci. Chaque
 * icône est un export nommé ; les tracés sont partagés dans @sia-ui/tokens.
 */

import { createElement, type SVGProps } from "react";
import { siaIconShapes, type SiaIconName } from "@sia-ui/tokens";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

function renderIcon(name: SiaIconName, props: IconProps, fill = "none") {
  return (
    <IconBase {...props}>
      {siaIconShapes[name].map((shape, index) =>
        createElement(shape.tag, {
          ...shape.attributes,
          ...("fill" in shape.attributes && shape.attributes.fill === "$fill"
            ? { fill }
            : {}),
          key: index,
        }),
      )}
    </IconBase>
  );
}
export function CalendarIcon(props: IconProps) {
  return renderIcon("CalendarIcon", props);
}
export function ClockIcon(props: IconProps) {
  return renderIcon("ClockIcon", props);
}
export function ChevronLeftIcon(props: IconProps) {
  return renderIcon("ChevronLeftIcon", props);
}
export function ChevronRightIcon(props: IconProps) {
  return renderIcon("ChevronRightIcon", props);
}
export function ChevronDownIcon(props: IconProps) {
  return renderIcon("ChevronDownIcon", props);
}
export function XIcon(props: IconProps) {
  return renderIcon("XIcon", props);
}
export function ArrowRightIcon(props: IconProps) {
  return renderIcon("ArrowRightIcon", props);
}
export function CheckIcon(props: IconProps) {
  return renderIcon("CheckIcon", props);
}
export function ChevronUpIcon(props: IconProps) {
  return renderIcon("ChevronUpIcon", props);
}
export function SearchIcon(props: IconProps) {
  return renderIcon("SearchIcon", props);
}
export function StarIcon({ fill = "none", ...props }: IconProps) {
  return renderIcon("StarIcon", props, fill as string);
}
export function PlusIcon(props: IconProps) {
  return renderIcon("PlusIcon", props);
}
export function MinusIcon(props: IconProps) {
  return renderIcon("MinusIcon", props);
}
export function MoreHorizontalIcon(props: IconProps) {
  return renderIcon("MoreHorizontalIcon", props);
}
export function TrashIcon(props: IconProps) {
  return renderIcon("TrashIcon", props);
}
export function UploadIcon(props: IconProps) {
  return renderIcon("UploadIcon", props);
}
export function AlertCircleIcon(props: IconProps) {
  return renderIcon("AlertCircleIcon", props);
}
export function InfoIcon(props: IconProps) {
  return renderIcon("InfoIcon", props);
}
export function SettingsIcon(props: IconProps) {
  return renderIcon("SettingsIcon", props);
}
export function EyeIcon(props: IconProps) {
  return renderIcon("EyeIcon", props);
}
export function EyeOffIcon(props: IconProps) {
  return renderIcon("EyeOffIcon", props);
}
export function HomeIcon(props: IconProps) {
  return renderIcon("HomeIcon", props);
}
export function FolderIcon(props: IconProps) {
  return renderIcon("FolderIcon", props);
}
export function ServerIcon(props: IconProps) {
  return renderIcon("ServerIcon", props);
}
export function UserIcon(props: IconProps) {
  return renderIcon("UserIcon", props);
}
export function UsersIcon(props: IconProps) {
  return renderIcon("UsersIcon", props);
}
export function ActivityIcon(props: IconProps) {
  return renderIcon("ActivityIcon", props);
}
export function KeyIcon(props: IconProps) {
  return renderIcon("KeyIcon", props);
}
export function LockIcon(props: IconProps) {
  return renderIcon("LockIcon", props);
}
export function LogOutIcon(props: IconProps) {
  return renderIcon("LogOutIcon", props);
}
export function PencilIcon(props: IconProps) {
  return renderIcon("PencilIcon", props);
}
export function SunIcon(props: IconProps) {
  return renderIcon("SunIcon", props);
}
export function MoonIcon(props: IconProps) {
  return renderIcon("MoonIcon", props);
}
export function RefreshIcon(props: IconProps) {
  return renderIcon("RefreshIcon", props);
}
export function LinkIcon(props: IconProps) {
  return renderIcon("LinkIcon", props);
}
export function ExternalLinkIcon(props: IconProps) {
  return renderIcon("ExternalLinkIcon", props);
}
export function FileTextIcon(props: IconProps) {
  return renderIcon("FileTextIcon", props);
}
export function KeyboardIcon(props: IconProps) {
  return renderIcon("KeyboardIcon", props);
}
export function LayersIcon(props: IconProps) {
  return renderIcon("LayersIcon", props);
}

export function MenuIcon(props: IconProps) {
  return renderIcon("MenuIcon", props);
}
export function GridIcon(props: IconProps) {
  return renderIcon("GridIcon", props);
}
