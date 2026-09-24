/**
 * Le jeu d'icônes commun.
 *
 * Il n'a pas de composant principal : c'est une collection, et chaque icône y
 * est une fonction. Toutes passent par le même socle — un trait de 1,8, des
 * extrémités arrondies, une taille en `em` qui suit celle du texte, et un
 * `aria-hidden` d'office. Une icône ne porte jamais de sens à elle seule;
 * c'est le libellé à côté qui le porte.
 *
 * Ce jeu couvre ce dont la bibliothèque a besoin, et rien de plus. Un produit
 * qui veut sa propre iconographie passe ses icônes en props plutôt que
 * d'étendre celle-ci : embarquer trois cents dessins pour en servir douze
 * pèserait sur tous les projets.
 */

import type { SVGProps } from "react";

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

export function CalendarIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 2v3M17 2v3M3.5 9h17" />
      <rect x="3.5" y="4" width="17" height="17" rx="2.5" />
      <path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01" />
    </IconBase>
  );
}
export function ClockIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </IconBase>
  );
}
export function ChevronLeftIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m15 18-6-6 6-6" />
    </IconBase>
  );
}
export function ChevronRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m9 18 6-6-6-6" />
    </IconBase>
  );
}
export function ChevronDownIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m6 9 6 6 6-6" />
    </IconBase>
  );
}
export function XIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </IconBase>
  );
}
export function ArrowRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </IconBase>
  );
}
export function CheckIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m5 12 4 4L19 6" />
    </IconBase>
  );
}

/* Ajoutées pour remplacer les caractères de texte qui servaient d'icônes.
   Un glyphe hérite de la police du système : il ne se dimensionne pas, ne
   s'anime pas, et sur certaines fontes il ne s'affiche pas du tout. */

export function ChevronUpIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m18 15-6-6-6 6" />
    </IconBase>
  );
}
export function SearchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </IconBase>
  );
}
export function StarIcon({ fill = "none", ...props }: IconProps) {
  return (
    <IconBase {...props}>
      <path
        fill={fill}
        d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9Z"
      />
    </IconBase>
  );
}
export function PlusIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 5v14M5 12h14" />
    </IconBase>
  );
}
export function MinusIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14" />
    </IconBase>
  );
}
export function MoreHorizontalIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </IconBase>
  );
}
export function TrashIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 7h16M10 11v6M14 11v6" />
      <path d="M6 7l1 13h10l1-13" />
      <path d="M9 7V4h6v3" />
    </IconBase>
  );
}
export function UploadIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 16V4M8 8l4-4 4 4" />
      <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
    </IconBase>
  );
}
export function AlertCircleIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6M12 16.5h.01" />
    </IconBase>
  );
}
export function InfoIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.5h.01" />
    </IconBase>
  );
}
export function EyeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </IconBase>
  );
}
export function EyeOffIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 3l18 18" />
      <path d="M10.6 6.1A9.9 9.9 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.1 3.9M6.6 6.7A17 17 0 0 0 2 12s3.5 6 10 6a9.6 9.6 0 0 0 3.4-.6" />
    </IconBase>
  );
}
