import {
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn, toneClass } from "@sia-ui/utils";
import type { ComponentTone } from "@sia-ui/tokens";
import {
  filterNavTree,
  navContains,
  navPath,
  navSome,
  useHoverIntent,
  type PermissionRule,
} from "@sia-ui/headless";
import { ChevronDownIcon } from "../Icons";
import { Overlay } from "../Overlay";
import "./styles.css";

export interface SidebarItem {
  key: string;
  label: ReactNode;
  icon?: ReactNode;

  /** Rend l'entrée comme un lien. Sans lui, c'est un bouton. */
  href?: string;

  /**
   * Une pastille — un nombre de messages, d'alertes.
   *
   * Sur le rail réduit il ne reste pas la place de la lire : elle devient un
   * point, et le compte exact revient dans le volet.
   */
  badge?: ReactNode;

  disabled?: boolean;

  /**
   * La règle qui autorise l'entrée, évaluée par `can`.
   *
   * > Ceci masque une entrée de menu; ça ne protège pas la route.
   */
  permission?: PermissionRule;

  /** Garde le parent même si toute sa descendance est filtrée. */
  keepWhenEmpty?: boolean;

  /** Sous-entrées, sans limite de profondeur. */
  items?: SidebarItem[];

  onClick?: () => void;
}

export interface SidebarSection {
  key: string;
  /** Le titre du groupe. Réduit à un trait en mode rail. */
  title: ReactNode;
  permission?: PermissionRule;
  items: SidebarItem[];
}

export type SidebarEntry = SidebarItem | SidebarSection;

function isSection(entry: SidebarEntry): entry is SidebarSection {
  return "title" in entry && Array.isArray(entry.items);
}

/**
 * Le point d'extension pour brancher un routeur.
 *
 * Sans lui, un `<a href>` est rendu — ce qui permet d'afficher la navigation
 * hors de tout contexte de routage, en story comme en test. Avec lui, un
 * `<Link>` de n'importe quelle bibliothèque, sans que le composant en dépende.
 *
 * À stabiliser avec `useCallback` : les nœuds sont mémoïsés, et une fonction
 * recréée à chaque rendu annule cette mémoïsation.
 */
export type SidebarRenderLink = (args: {
  item: SidebarItem;
  children: ReactNode;
  /**
   * À répandre tel quel sur le lien : `<Link {...props}>{children}</Link>`.
   *
   * Regroupés plutôt qu'éparpillés parce que `aria-current` en faisait
   * partie : passé à côté, il se perdait sans bruit, et l'entrée courante
   * n'était plus annoncée aux lecteurs d'écran.
   */
  props: {
    className: string;
    onClick: () => void;
    "aria-current"?: "page";
    title?: string;
  };
}) => ReactElement;

export interface SidebarProps {
  items: SidebarEntry[];

  /** La clé de l'entrée courante. Sa branche s'ouvre d'elle-même. */
  activeKey?: string;

  /**
   * Le rail : les libellés disparaissent, les sous-menus passent en volet.
   *
   * Ils y restent atteignables — c'est tout l'objet du volet. Un menu réduit
   * qui enferme ses enfants n'est pas réduit, il est cassé.
   */
  collapsed?: boolean;

  /** De quel côté sortent les volets du rail. */
  side?: "left" | "right";

  variant?: "default" | "filled" | "floating";
  size?: "sm" | "md" | "lg";
  tone?: ComponentTone;

  /**
   * Évalue les règles de permission des entrées.
   *
   * Vient d'un `createAccessLayer` de `@sia-ui/headless`, ou de n'importe
   * quelle fonction. Absent, aucune entrée n'est filtrée.
   */
  can?: (rule: PermissionRule) => boolean;

  /** Les branches ouvertes. Non fourni, le composant les gère lui-même. */
  openKeys?: string[];
  defaultOpenKeys?: string[];
  onOpenKeysChange?: (keys: string[]) => void;

  /** Une seule branche ouverte par niveau. */
  accordion?: boolean;

  renderLink?: SidebarRenderLink;
  header?: ReactNode;
  footer?: ReactNode;
  onNavigate?: (item: SidebarItem) => void;
  ariaLabel?: string;
  className?: string;
}

/**
 * La navigation principale.
 *
 * Trois choses la distinguent d'une liste de liens : elle descend aussi
 * profond que l'arborescence du produit, elle se réduit sans enfermer ses
 * sous-menus, et elle ne montre que ce que la session a le droit de voir.
 */
export function Sidebar({
  items,
  activeKey,
  collapsed = false,
  side = "left",
  variant = "default",
  size = "md",
  tone = "primary",
  can,
  openKeys,
  defaultOpenKeys,
  onOpenKeysChange,
  accordion = false,
  renderLink,
  header,
  footer,
  onNavigate,
  ariaLabel,
  className,
}: SidebarProps) {
  // Le filtrage est fait une fois, en haut : chaque nœud recevrait sinon la
  // règle à réévaluer, et l'arbre serait parcouru autant de fois qu'il a de
  // branches.
  const visibles = useMemo(
    () => (can ? filterEntries(items, can) : items),
    [can, items],
  );

  const cheminActif = useMemo(() => {
    const plats = visibles.flatMap((e) => (isSection(e) ? e.items : [e]));
    return navPath(plats, activeKey).map((e) => e.key);
  }, [activeKey, visibles]);

  const [internes, setInternes] = useState<string[]>(defaultOpenKeys ?? []);
  const pilote = openKeys !== undefined;
  const ouvertes = pilote ? openKeys : internes;

  /**
   * La branche courante s'ouvre d'elle-même.
   *
   * Arriver par un lien profond, un rechargement ou le bouton retour doit
   * montrer où l'on est dans l'arbre. On n'ajoute jamais de fermeture ici :
   * refermer à chaque navigation annulerait un dépliage volontaire.
   */
  const [dernierChemin, setDernierChemin] = useState<string>("");
  const signature = cheminActif.join("/");
  if (signature !== dernierChemin) {
    setDernierChemin(signature);
    const manquantes = cheminActif.filter((k) => !ouvertes.includes(k));
    if (manquantes.length > 0 && !pilote) {
      setInternes([...ouvertes, ...manquantes]);
    }
  }

  const basculer = useCallback(
    (cle: string, freres: string[]) => {
      const courantes = pilote ? (openKeys ?? []) : internes;
      const etaitOuverte = courantes.includes(cle);

      let suivantes = etaitOuverte
        ? courantes.filter((k) => k !== cle)
        : [...courantes, cle];

      // En accordéon, ouvrir une branche referme ses sœurs — et elles seules :
      // une branche d'un autre niveau n'est pas concurrente.
      if (!etaitOuverte && accordion) {
        suivantes = suivantes.filter((k) => k === cle || !freres.includes(k));
      }

      if (!pilote) setInternes(suivantes);
      onOpenKeysChange?.(suivantes);
    },
    [accordion, internes, onOpenKeysChange, openKeys, pilote],
  );

  const commun = {
    activeKey,
    collapsed,
    side,
    ouvertes,
    basculer,
    renderLink,
    onNavigate,
  };

  return (
    <nav
      className={cn(
        "sia-sidebar",
        `sia-sidebar--${variant}`,
        `sia-sidebar--${size}`,
        `sia-sidebar--${side}`,
        collapsed && "sia-sidebar--collapsed",
        toneClass("sia-tone", tone),
        className,
      )}
      {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
    >
      {header && <div className="sia-sidebar__header">{header}</div>}

      <div className="sia-sidebar__body">
        {visibles.map((entry) =>
          isSection(entry) ? (
            <div key={entry.key} className="sia-sidebar__section">
              <div className="sia-sidebar__section-title">{entry.title}</div>
              {entry.items.map((item) => (
                <Noeud
                  key={item.key}
                  item={item}
                  depth={0}
                  freres={entry.items.map((i) => i.key)}
                  {...commun}
                />
              ))}
            </div>
          ) : (
            <Noeud
              key={entry.key}
              item={entry}
              depth={0}
              freres={racines(visibles)}
              {...commun}
            />
          ),
        )}
      </div>

      {footer && <div className="sia-sidebar__footer">{footer}</div>}
    </nav>
  );
}

/** Les sections sont filtrées comme des entrées, avec leur contenu. */
function filterEntries(
  entries: SidebarEntry[],
  can: (rule: PermissionRule) => boolean,
): SidebarEntry[] {
  return entries.flatMap((entry) => {
    if (!isSection(entry)) {
      return filterNavTree([entry], can) as SidebarEntry[];
    }

    if (entry.permission !== undefined && !can(entry.permission)) return [];

    const items = filterNavTree(entry.items, can);
    // Un titre de section sans entrée en dessous est une ligne morte.
    return items.length > 0 ? [{ ...entry, items }] : [];
  });
}

function racines(entries: SidebarEntry[]): string[] {
  return entries.filter((e) => !isSection(e)).map((e) => e.key);
}

/**
 * La plomberie interne, passée telle quelle à chaque niveau.
 *
 * Les champs sont nullables plutôt qu'optionnels : ils sont toujours
 * fournis, et `exactOptionalPropertyTypes` distingue « absent » de
 * « présent et indéfini » — une distinction qui n'a aucun sens ici et qui
 * obligerait à composer chaque objet prop par prop.
 */
interface NoeudProps {
  item: SidebarItem;
  depth: number;
  /** Les clés du même niveau, pour le mode accordéon. */
  freres: string[];
  activeKey: string | undefined;
  collapsed: boolean;
  side: "left" | "right";
  ouvertes: string[];
  basculer: (cle: string, freres: string[]) => void;
  renderLink: SidebarRenderLink | undefined;
  onNavigate: ((item: SidebarItem) => void) | undefined;
}

/**
 * Mémoïsé : sans cela, tout état vivant au-dessus de la navigation — la
 * saisie d'un montant, par exemple — reconstruit l'arbre entier à chaque
 * frappe.
 */
const Noeud = memo(function Noeud(props: NoeudProps) {
  const { item, depth, collapsed, side } = props;
  const enfants = item.items ?? [];
  const aDesEnfants = enfants.length > 0;

  // Le rail ne déplie rien en ligne : il n'a pas la largeur. Les sous-menus
  // sortent en volet, et seulement au premier niveau — à l'intérieur du
  // volet, on est de nouveau dans une liste normale.
  if (collapsed && depth === 0 && aDesEnfants) {
    return <NoeudRail {...props} />;
  }

  return <NoeudEnLigne {...props} side={side} />;
});

/** Le contenu d'une ligne : icône, libellé, pastille, chevron. */
function Ligne({
  item,
  collapsed,
  ouvert,
  aDesEnfants,
}: {
  item: SidebarItem;
  collapsed: boolean;
  ouvert: boolean;
  aDesEnfants: boolean;
}) {
  const porteUnePastille =
    collapsed && navSome(item, (e) => e.badge !== undefined && e.badge !== null);

  return (
    <>
      {item.icon && (
        <span className="sia-sidebar__icon" aria-hidden="true">
          {item.icon}
        </span>
      )}
      <span className="sia-sidebar__label">{item.label}</span>

      {item.badge !== undefined && !collapsed && (
        <span className="sia-sidebar__badge">{item.badge}</span>
      )}

      {/* Le compte exact ne tient pas sur un rail : il devient un point, et se
          lit en toutes lettres dans le volet. */}
      {porteUnePastille && (
        <span className="sia-sidebar__dot" aria-hidden="true" />
      )}

      {aDesEnfants && !collapsed && (
        <span
          className="sia-sidebar__chevron"
          data-open={ouvert || undefined}
          aria-hidden="true"
        >
          <ChevronDownIcon />
        </span>
      )}
    </>
  );
}

function NoeudEnLigne({
  item,
  depth,
  freres,
  activeKey,
  collapsed,
  side,
  ouvertes,
  basculer,
  renderLink,
  onNavigate,
}: NoeudProps) {
  const enfants = item.items ?? [];
  const aDesEnfants = enfants.length > 0;
  const ouvert = ouvertes.includes(item.key);
  const actif = item.key === activeKey;
  const dansLaBranche = navContains(item, activeKey);

  const classe = cn(
    "sia-sidebar__item",
    depth > 0 && "sia-sidebar__item--child",
    actif && "sia-sidebar__item--active",
    // Une branche repliée qui contient la page courante doit le dire : sinon
    // rien à l'écran ne rattache la page à sa rubrique.
    !actif && dansLaBranche && !ouvert && "sia-sidebar__item--in-branch",
  );

  // Le titre natif suffit en mode réduit : un vrai tooltip demanderait un
  // moteur de placement pour afficher trois mots.
  const infobulle =
    collapsed && depth === 0 && typeof item.label === "string"
      ? item.label
      : undefined;

  const contenu = (
    <Ligne
      item={item}
      collapsed={collapsed && depth === 0}
      ouvert={ouvert}
      aDesEnfants={aDesEnfants}
    />
  );

  const naviguer = () => {
    item.onClick?.();
    onNavigate?.(item);
  };

  const style =
    depth > 0
      ? ({ "--sia-sidebar-depth": depth } as Record<string, number>)
      : undefined;

  return (
    <div
      className="sia-sidebar__node"
      data-open={ouvert || undefined}
      {...(style ? { style } : {})}
    >
      {aDesEnfants ? (
        <button
          type="button"
          className={classe}
          disabled={item.disabled}
          aria-expanded={ouvert}
          {...(infobulle ? { title: infobulle } : {})}
          onClick={() => basculer(item.key, freres)}
        >
          {contenu}
        </button>
      ) : item.href && renderLink ? (
        renderLink({
          item,
          children: contenu,
          props: {
            className: classe,
            onClick: naviguer,
            ...(actif ? { "aria-current": "page" as const } : {}),
            ...(infobulle ? { title: infobulle } : {}),
          },
        })
      ) : item.href ? (
        <a
          href={item.href}
          className={classe}
          {...(actif ? { "aria-current": "page" as const } : {})}
          {...(infobulle ? { title: infobulle } : {})}
          onClick={naviguer}
        >
          {contenu}
        </a>
      ) : (
        <button
          type="button"
          className={classe}
          disabled={item.disabled}
          {...(actif ? { "aria-current": "page" as const } : {})}
          {...(infobulle ? { title: infobulle } : {})}
          onClick={naviguer}
        >
          {contenu}
        </button>
      )}

      {aDesEnfants && (
        <div className="sia-sidebar__panel">
          <div className="sia-sidebar__sub" inert={ouvert ? undefined : true}>
            {enfants.map((enfant) => (
              <Noeud
                key={enfant.key}
                item={enfant}
                depth={depth + 1}
                freres={enfants.map((e) => e.key)}
                {...{
                  activeKey,
                  collapsed,
                  side,
                  ouvertes,
                  basculer,
                  renderLink,
                  onNavigate,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Une rubrique du rail, et son volet.
 *
 * C'est la réponse au défaut le plus gênant du composant précédent : réduit,
 * il forçait le panneau des enfants à zéro quel que soit son état. Les
 * sous-entrées devenaient inatteignables — la barre réduite ne servait plus
 * qu'aux rubriques sans enfant.
 */
function NoeudRail(props: NoeudProps) {
  const { item, activeKey, side, renderLink, onNavigate } = props;
  const enfants = item.items ?? [];
  const ancre = useRef<HTMLDivElement>(null);
  const { open, triggerProps, panelProps, setOpen } = useHoverIntent({
    openDelay: 120,
  });

  const dansLaBranche = navContains(item, activeKey);
  const infobulle = typeof item.label === "string" ? item.label : undefined;

  return (
    <div className="sia-sidebar__node" ref={ancre} {...triggerProps}>
      <button
        type="button"
        className={cn(
          "sia-sidebar__item",
          dansLaBranche && "sia-sidebar__item--active",
        )}
        aria-haspopup="true"
        aria-expanded={open}
        {...(infobulle ? { title: infobulle } : {})}
        onClick={() => setOpen(!open)}
      >
        <Ligne item={item} collapsed ouvert={open} aDesEnfants />
      </button>

      <Overlay
        open={open}
        anchorRef={ancre}
        onOpenChange={setOpen}
        placement={side === "left" ? "right-start" : "left-start"}
        offset={8}
        className="sia-sidebar-flyout"
        role="group"
      >
        <div {...panelProps}>
          <div className="sia-sidebar-flyout__title">
            {item.label}
            {item.badge !== undefined && (
              <span className="sia-sidebar__badge">{item.badge}</span>
            )}
          </div>

          {/* Dans le volet, on est de nouveau dans une liste normale : les
              sous-sous-menus s'y déplient en ligne, à toute profondeur. */}
          <div className="sia-sidebar-flyout__body">
            {enfants.map((enfant) => (
              <Noeud
                key={enfant.key}
                item={enfant}
                depth={0}
                freres={enfants.map((e) => e.key)}
                {...{
                  activeKey,
                  side,
                  ouvertes: props.ouvertes,
                  basculer: props.basculer,
                  renderLink,
                }}
                collapsed={false}
                onNavigate={(cible) => {
                  onNavigate?.(cible);
                  // Le volet a fait son travail : le laisser ouvert masquerait
                  // la page vers laquelle on vient de partir.
                  setOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      </Overlay>
    </div>
  );
}
