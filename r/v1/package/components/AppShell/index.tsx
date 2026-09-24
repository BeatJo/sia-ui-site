import {
  useCallback,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@sia-ui/utils";
import {
  filterNavTree,
  navKeyForPath,
  type PermissionRule,
} from "@sia-ui/headless";
import { useMediaQuery } from "@sia-ui/react";
import { Drawer } from "../Drawer";
import {
  Sidebar,
  type SidebarEntry,
  type SidebarItem,
  type SidebarRenderLink,
} from "../Sidebar";
import { BottomTabs } from "./tab-bar";
import "./styles.css";

export { BottomTabs, type BottomTabsProps } from "./tab-bar";

/**
 * L'état de la barre latérale sur grand écran.
 *
 * Trois valeurs et non un booléen : « réduite » et « masquée » sont deux
 * intentions différentes, et une application qui veut l'une ne veut
 * généralement pas l'autre. Sous le seuil mobile, l'état est ignoré — la
 * barre cède la place à la navigation basse.
 */
export type SidebarState = "expanded" | "collapsed" | "hidden";

/**
 * Ce que fait le bouton de bascule.
 *
 * `icon` alterne déployé et rail, `offcanvas` alterne déployé et masqué,
 * `false` retire le bouton.
 */
export type AppShellCollapsible = "icon" | "offcanvas" | false;

/**
 * La navigation sous le seuil mobile.
 *
 * `both` n'est pas un défaut par hasard : deux systèmes de navigation
 * simultanés se disputent l'attention, et l'utilisateur ne sait plus lequel
 * fait autorité.
 */
export type AppShellMobileNav = "drawer" | "tabs" | "both";

export type AppShellContentWidth = "wide" | "narrow" | "full";

export interface AppShellProps {
  nav: SidebarEntry[];
  children: ReactNode;

  /**
   * La clé de l'entrée courante.
   *
   * Laissée vide, elle est déduite de `currentPath`. La fournir explicitement
   * ne sert que si les clés ne correspondent à aucune adresse.
   */
  activeKey?: string;

  /**
   * L'adresse courante — **le point d'accroche du routeur**.
   *
   * Une seule chaîne, que tous savent produire :
   *
   * ```tsx
   * const { pathname } = useLocation();      // React Router
   * const pathname = usePathname();          // Next.js
   * const [pathname] = useLocation();        // wouter
   * ```
   *
   * De là, la coquille déduit l'entrée active par le préfixe le plus long, et
   * referme le tiroir mobile à chaque navigation — sans jamais importer de
   * routeur.
   */
  currentPath?: string;

  /** Branche les liens sur le routeur. À stabiliser avec `useCallback`. */
  renderLink?: SidebarRenderLink;
  onNavigate?: (item: SidebarItem) => void;

  /**
   * Évalue les règles de permission.
   *
   * Le filtrage est fait **une seule fois** ici : ni la barre latérale ni les
   * onglets ne doivent avoir leur propre idée de ce qui est visible.
   */
  can?: (rule: PermissionRule) => boolean;

  /**
   * En tête de barre latérale : logo, nom du produit, sélecteur d'entité.
   *
   * Reçoit `data-collapsed` en mode rail, comme `sidebarFooter` : sans quoi
   * un nom de produit écrit en toutes lettres déborde des quatre rem du rail.
   */
  brand?: ReactNode;

  /**
   * Bas de la barre latérale, sous la navigation.
   *
   * C'est la place de la déconnexion et des réglages du compte — ce qui sort
   * de l'application, par opposition à l'en-tête, réservé à ce qui agit sur
   * l'écran courant. Reçoit `data-collapsed` en mode rail, de quoi masquer un
   * libellé sans changer de composant.
   */
  sidebarFooter?: ReactNode;

  /** La barre du haut : recherche, notifications, avatar de compte. */
  header?: ReactNode;

  /**
   * Au-dessus du contenu, pleine largeur de la zone.
   *
   * L'endroit d'un `PageHeader`. La coquille ne prend pas de `title` : un
   * `<h1>` rendu par la coquille force chaque page à passer par ses props, et
   * une page qui veut deux titres ou une mise en page à elle doit se battre.
   */
  page?: ReactNode;

  footer?: ReactNode;

  /**
   * La largeur de la zone de contenu.
   *
   * Décidée ici plutôt qu'écran par écran : des largeurs posées page après
   * page finissent par diverger, et personne ne sait laquelle fait foi.
   */
  contentWidth?: AppShellContentWidth;

  side?: "left" | "right";
  variant?: "default" | "filled" | "floating";

  /** L'en-tête suit-il le défilement. */
  stickyHeader?: boolean;

  sidebarState?: SidebarState;
  defaultSidebarState?: SidebarState;
  onSidebarStateChange?: (state: SidebarState) => void;
  collapsible?: AppShellCollapsible;

  /** Toute valeur CSS : `16rem`, `280px`, `min(20vw, 320px)`. */
  sidebarWidth?: string;
  sidebarCollapsedWidth?: string;

  mobileNav?: AppShellMobileNav;
  /** Sous cette largeur, la barre latérale cède la place. */
  mobileBreakpoint?: number;

  ariaLabel?: string;
  className?: string;
}

/**
 * La coquille d'une application.
 *
 * Elle n'invente rien : la navigation est le `Sidebar`, le tiroir est le
 * `Drawer`, les droits viennent de `@sia-ui/headless`. Ce qu'elle apporte est
 * l'assemblage — trois états de barre, une bascule mobile, et une seule
 * source de vérité pour ce qui est visible et pour ce qui est actif.
 */
export function AppShell({
  nav,
  children,
  activeKey,
  currentPath,
  renderLink,
  onNavigate,
  can,
  brand,
  sidebarFooter,
  header,
  page,
  footer,
  contentWidth = "wide",
  side = "left",
  variant = "default",
  stickyHeader = true,
  sidebarState,
  defaultSidebarState = "expanded",
  onSidebarStateChange,
  collapsible = "icon",
  sidebarWidth,
  sidebarCollapsedWidth,
  mobileNav = "drawer",
  mobileBreakpoint = 768,
  ariaLabel,
  className,
}: AppShellProps) {
  const compact = useMediaQuery(`(max-width: ${mobileBreakpoint - 1}px)`);

  // Filtré une fois, consommé par la barre et par les onglets.
  const visibles = useMemo(
    () => (can ? filterNavTree(nav as never, can) : nav),
    [can, nav],
  ) as SidebarEntry[];

  const plats = useMemo(
    () =>
      visibles.flatMap((e) =>
        "title" in e && Array.isArray(e.items) ? e.items : [e as SidebarItem],
      ),
    [visibles],
  );

  const deduite = useMemo(
    () => navKeyForPath(plats, currentPath),
    [currentPath, plats],
  );
  const active = activeKey ?? deduite;

  const [interne, setInterne] = useState<SidebarState>(defaultSidebarState);
  const pilote = sidebarState !== undefined;
  const etat = pilote ? sidebarState : interne;

  const basculer = useCallback(() => {
    const reduit = collapsible === "offcanvas" ? "hidden" : "collapsed";
    const suivant: SidebarState = etat === "expanded" ? reduit : "expanded";
    if (!pilote) setInterne(suivant);
    onSidebarStateChange?.(suivant);
  }, [collapsible, etat, onSidebarStateChange, pilote]);

  const [tiroirOuvert, setTiroirOuvert] = useState(false);

  /**
   * Le tiroir se referme à chaque navigation.
   *
   * C'est ce qu'on oublie toujours : on touche une entrée, la page change
   * derrière, et le tiroir reste ouvert par-dessus. Le changement d'adresse
   * suffit à le détecter — aucun abonnement au routeur n'est nécessaire.
   */
  const [dernierChemin, setDernierChemin] = useState(currentPath);
  if (currentPath !== dernierChemin) {
    setDernierChemin(currentPath);
    if (tiroirOuvert) setTiroirOuvert(false);
  }

  const naviguer = useCallback(
    (item: SidebarItem) => {
      onNavigate?.(item);
      setTiroirOuvert(false);
    },
    [onNavigate],
  );

  const reduite = etat === "collapsed";
  const masquee = etat === "hidden";
  const montrerTiroir = mobileNav === "drawer" || mobileNav === "both";
  const montrerOnglets = mobileNav === "tabs" || mobileNav === "both";

  const barre = (
    <Sidebar
      items={visibles}
      collapsed={reduite && !compact}
      side={side}
      variant={variant}
      {...(active !== undefined ? { activeKey: active } : {})}
      {...(renderLink ? { renderLink } : {})}
      onNavigate={naviguer}
      {...(brand
        ? {
            header: (
              <div data-collapsed={reduite && !compact ? "" : undefined}>
                {brand}
              </div>
            ),
          }
        : {})}
      {...(sidebarFooter
        ? {
            footer: (
              <div data-collapsed={reduite && !compact ? "" : undefined}>
                {sidebarFooter}
              </div>
            ),
          }
        : {})}
      {...(ariaLabel ? { ariaLabel } : {})}
    />
  );

  const style: CSSProperties & Record<string, string> = {} as never;
  if (sidebarWidth) style["--sia-shell-sidebar"] = sidebarWidth;
  if (sidebarCollapsedWidth) style["--sia-shell-rail"] = sidebarCollapsedWidth;

  return (
    <div
      className={cn(
        "sia-shell",
        `sia-shell--${side}`,
        `sia-shell--${variant}`,
        reduite && "sia-shell--rail",
        masquee && "sia-shell--hidden",
        compact && "sia-shell--compact",
        montrerOnglets && compact && "sia-shell--with-tabs",
        className,
      )}
      style={style}
    >
      {/* Sur petit écran, la barre latérale n'a pas la place de rester
          ouverte : elle devient un tiroir. Sans lui, l'arborescence complète
          ne serait atteignable que par « Plus », ce qui ne se devine pas. */}
      {!compact && !masquee && <aside className="sia-shell__aside">{barre}</aside>}

      <div className="sia-shell__main">
        {(header || collapsible !== false || (compact && montrerTiroir)) && (
          <header
            className={cn(
              "sia-shell__header",
              stickyHeader && "sia-shell__header--sticky",
            )}
          >
            {compact && montrerTiroir ? (
              <button
                type="button"
                className="sia-shell__toggle"
                aria-label="Ouvrir la navigation"
                aria-expanded={tiroirOuvert}
                onClick={() => setTiroirOuvert(true)}
              >
                <BarresIcon />
              </button>
            ) : (
              collapsible !== false && (
                <button
                  type="button"
                  className="sia-shell__toggle"
                  aria-label={
                    etat === "expanded"
                      ? "Réduire la navigation"
                      : "Déployer la navigation"
                  }
                  aria-expanded={etat === "expanded"}
                  onClick={basculer}
                >
                  <PanneauIcon />
                </button>
              )
            )}

            <div className="sia-shell__header-content">{header}</div>
          </header>
        )}

        <main className={cn("sia-shell__content", `sia-shell__content--${contentWidth}`)}>
          {page && <div className="sia-shell__page">{page}</div>}
          {children}
        </main>

        {footer && <footer className="sia-shell__footer">{footer}</footer>}
      </div>

      {compact && montrerOnglets && (
        <BottomTabs
          items={plats}
          {...(active !== undefined ? { activeKey: active } : {})}
          {...(renderLink ? { renderLink } : {})}
          onNavigate={naviguer}
          {...(montrerTiroir ? { onMore: () => setTiroirOuvert(true) } : {})}
        />
      )}

      {compact && montrerTiroir && (
        <Drawer
          open={tiroirOuvert}
          onOpenChange={setTiroirOuvert}
          position={side}
          size="sm"
          className="sia-shell__drawer"
        >
          {barre}
        </Drawer>
      )}
    </div>
  );
}

/** Trois barres. Dessinée ici pour ne pas tirer tout le jeu d'icônes. */
function BarresIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Un panneau latéral, qui dit ce que le bouton replie. */
function PanneauIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M9.5 4v16" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
