import {
  createContext,
  useContext,
  useMemo,
  useState,
  type HTMLAttributes,
  type ImgHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "rounded" | "square";
export type AvatarVariant = "soft" | "solid" | "outline";

/**
 * La présence d'une personne.
 *
 * Quatre états et pas davantage : au-delà, la pastille devient un code que
 * personne ne retient, et il faut une légende pour la lire.
 */
export type AvatarStatus = "online" | "offline" | "busy" | "away";

const LIBELLES_STATUT: Record<AvatarStatus, string> = {
  online: "en ligne",
  offline: "hors ligne",
  busy: "occupé",
  away: "absent",
};

/**
 * Les teintes dérivées du nom.
 *
 * Deux personnes aux mêmes initiales doivent se distinguer : dans une liste
 * de participants, six pastilles identiques ne valent pas mieux qu'aucune.
 * La couleur est donc déterministe — la même personne garde la sienne d'un
 * écran à l'autre, d'une session à l'autre.
 */
const TEINTES = [
  "primary",
  "info",
  "success",
  "warning",
  "danger",
  "secondary",
] as const;

export type AvatarTint = (typeof TEINTES)[number];

/**
 * Une empreinte stable, calculée sur le nom.
 *
 * Volontairement minuscule : cette fonction tourne pour chaque avatar d'une
 * liste qui peut en compter des centaines. Un hachage cryptographique y
 * coûterait mille fois plus pour un résultat visuellement identique.
 */
function empreinte(texte: string): number {
  let h = 0;
  for (let i = 0; i < texte.length; i += 1) {
    h = (h * 31 + texte.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function tintForName(name: string): AvatarTint {
  return TEINTES[empreinte(name) % TEINTES.length]!;
}

/**
 * Les initiales d'un nom.
 *
 * Première et dernière partie plutôt que les deux premières : « Jean-Baptiste
 * Kouassi Mbella » se lit « JM », pas « JK ». Les particules sont écartées,
 * sinon « Marie de la Tour » donnerait « MD ».
 */
const PARTICULES = new Set([
  "de", "du", "des", "la", "le", "les", "van", "von", "da", "di", "el", "al",
]);

export function initialsOf(name: string, count = 2): string {
  const parts = name
    .trim()
    .split(/[\s'-]+/)
    .filter((p) => p.length > 0 && !PARTICULES.has(p.toLowerCase()));

  if (parts.length === 0) return "";
  if (parts.length === 1 || count === 1) {
    return (parts[0]!.slice(0, count) || "").toUpperCase();
  }

  return (
    (parts[0]![0] ?? "") + (parts[parts.length - 1]![0] ?? "")
  ).toUpperCase();
}

interface AvatarGroupContextValue {
  size: AvatarSize;
  shape: AvatarShape;
  variant: AvatarVariant;
}

const AvatarGroupContext = createContext<AvatarGroupContextValue | null>(null);

export interface AvatarProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "children" | "width" | "height"> {
  /** Le nom de la personne : il sert au repli, à la couleur et à l'annonce. */
  name: string;

  size?: AvatarSize;
  shape?: AvatarShape;
  variant?: AvatarVariant;

  /** Force la teinte au lieu de la dériver du nom. */
  tint?: AvatarTint;

  /** Remplace les initiales — une icône, un emoji, deux lettres à soi. */
  fallback?: ReactNode;

  /** Nombre d'initiales quand le repli est automatique. */
  initials?: 1 | 2;

  status?: AvatarStatus;
  /** Le libellé du statut, pour les lecteurs d'écran. */
  statusLabel?: string;

  /** Un liseré qui détache l'avatar de son fond. */
  ring?: boolean;

  /** Rend l'avatar actionnable — un menu de compte, par exemple. */
  onPress?: () => void;
}

/**
 * Le portrait d'une personne, ou ce qui le remplace.
 *
 * Une image met du temps à arriver, échoue parfois, et manque souvent. Les
 * trois cas sont traités sans que la mise en page bouge : l'espace est réservé
 * d'emblée, le repli est peint dessous, et l'image se fond par-dessus quand
 * elle arrive.
 */
export function Avatar({
  name,
  size,
  shape,
  variant,
  tint,
  fallback,
  initials = 2,
  status,
  statusLabel,
  ring = false,
  onPress,
  className,
  src,
  alt,
  onError,
  onLoad,
  style,
  ...props
}: AvatarProps) {
  const groupe = useContext(AvatarGroupContext);
  const [etatImage, setEtatImage] = useState<"attente" | "prete" | "echouee">(
    src ? "attente" : "echouee",
  );

  const resolvedSize = size ?? groupe?.size ?? "md";
  const resolvedShape = shape ?? groupe?.shape ?? "circle";
  const resolvedVariant = variant ?? groupe?.variant ?? "soft";

  // Le nom ne change pas à chaque rendu, le hachage non plus : dans une liste
  // de cent participants, c'est cent calculs évités par frappe au clavier.
  const teinte = useMemo(() => tint ?? tintForName(name), [name, tint]);
  const lettres = useMemo(
    () => (fallback === undefined ? initialsOf(name, initials) : null),
    [fallback, initials, name],
  );

  const classe = cn(
    "sia-avatar",
    `sia-avatar--${resolvedSize}`,
    `sia-avatar--${resolvedShape}`,
    `sia-avatar--${resolvedVariant}`,
    `sia-avatar--tint-${teinte}`,
    ring && "sia-avatar--ring",
    etatImage === "attente" && "sia-avatar--loading",
    onPress && "sia-avatar--pressable",
    className,
  );

  const contenu = (
    <>
      {/* Le repli est toujours peint, sous l'image. C'est lui qui tient la
          place pendant le chargement, et qui reste si l'image échoue —
          aucune bascule, donc aucun saut. */}
      <span className="sia-avatar__fallback" aria-hidden="true">
        {fallback ?? lettres}
      </span>

      {src && etatImage !== "echouee" && (
        <img
          {...props}
          className="sia-avatar__image"
          src={src}
          alt={alt ?? ""}
          loading="lazy"
          decoding="async"
          onLoad={(event) => {
            setEtatImage("prete");
            onLoad?.(event);
          }}
          onError={(event) => {
            setEtatImage("echouee");
            onError?.(event);
          }}
        />
      )}

      {status && (
        <span
          className={cn("sia-avatar__status", `sia-avatar__status--${status}`)}
          aria-hidden="true"
        />
      )}

      {/* Le nom n'est jamais dans l'image : un `alt` vide et un texte masqué
          annoncent la personne une seule fois, statut compris. */}
      <span className="sia-visually-hidden">
        {name}
        {status ? ` — ${statusLabel ?? LIBELLES_STATUT[status]}` : ""}
      </span>
    </>
  );

  if (onPress) {
    return (
      <button
        type="button"
        className={classe}
        title={name}
        onClick={onPress}
        {...(style ? { style } : {})}
      >
        {contenu}
      </button>
    );
  }

  return (
    <span className={classe} title={name} {...(style ? { style } : {})}>
      {contenu}
    </span>
  );
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;

  /**
   * Au-delà, les suivants sont résumés par un compteur.
   *
   * Sans limite, une réunion de quarante personnes déborde de sa ligne et
   * n'apprend plus rien : au-delà de cinq visages, on ne lit plus des gens,
   * on lit une foule.
   */
  max?: number;

  size?: AvatarSize;
  shape?: AvatarShape;
  variant?: AvatarVariant;

  /** Le chevauchement, de 0 (côte à côte) à 1 (fortement empilés). */
  overlap?: number;

  /** Écarte les avatars au survol, pour les distinguer. */
  spreadOnHover?: boolean;

  /** Ce qu'affiche le compteur. Par défaut `+N`. */
  renderOverflow?: (count: number) => ReactNode;
}

/**
 * Plusieurs personnes, sur une ligne.
 *
 * Les avatars se chevauchent — c'est ce qui dit « un groupe » plutôt qu'« une
 * liste ». Chacun porte un liseré de la couleur du fond, sans quoi la pile
 * devient une bouillie dès que deux teintes se ressemblent.
 */
export function AvatarGroup({
  children,
  max,
  size = "md",
  shape = "circle",
  variant = "soft",
  overlap = 0.25,
  spreadOnHover = false,
  renderOverflow,
  className,
  style,
  ...props
}: AvatarGroupProps) {
  const tous = Array.isArray(children) ? children : [children];
  const visibles = max === undefined ? tous : tous.slice(0, max);
  const reste = tous.length - visibles.length;

  const contexte = useMemo(
    () => ({ size, shape, variant }),
    [shape, size, variant],
  );

  return (
    <AvatarGroupContext.Provider value={contexte}>
      <div
        className={cn(
          "sia-avatar-group",
          `sia-avatar-group--${size}`,
          spreadOnHover && "sia-avatar-group--spread",
          className,
        )}
        style={{
          ...style,
          "--sia-avatar-overlap": String(Math.min(Math.max(overlap, 0), 1)),
        } as Record<string, string>}
        {...props}
      >
        {visibles}
        {reste > 0 && (
          <span
            className={cn(
              "sia-avatar",
              `sia-avatar--${size}`,
              `sia-avatar--${shape}`,
              "sia-avatar--overflow",
            )}
          >
            <span className="sia-avatar__fallback">
              {renderOverflow ? renderOverflow(reste) : `+${reste}`}
            </span>
          </span>
        )}
      </div>
    </AvatarGroupContext.Provider>
  );
}
