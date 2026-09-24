import { memo, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import { navLeaves, navSome } from "@sia-ui/headless";
import type { SidebarItem, SidebarRenderLink } from "../Sidebar";

export interface BottomTabsProps {
  /** Attendu déjà filtré : la coquille a fait le tri une seule fois. */
  items: SidebarItem[];
  activeKey?: string;

  /**
   * Nombre d'onglets avant le bouton « Plus ».
   *
   * Quatre au maximum sur un téléphone : au-delà, les cibles tactiles
   * descendent sous les quarante-quatre pixels recommandés, et on rate
   * l'onglet voisin une fois sur trois.
   */
  max?: number;

  renderLink?: SidebarRenderLink;
  onNavigate?: (item: SidebarItem) => void;

  /** Le bouton qui ouvre l'arborescence complète. */
  more?: ReactNode;
  onMore?: () => void;
  moreLabel?: string;

  className?: string;
}

/**
 * La navigation d'un téléphone.
 *
 * Un rail d'icônes muettes n'est pas utilisable au comptoir : sur petit écran
 * la navigation descend en bas, à portée du pouce, avec des libellés.
 *
 * Les onglets ne montrent que des **feuilles**. Un onglet qui ouvrirait un
 * sous-menu depuis une barre basse serait un piège tactile — on vise une
 * destination, on obtient un menu. Le reste de l'arborescence passe par
 * « Plus ».
 */
export const BottomTabs = memo(function BottomTabs({
  items,
  activeKey,
  max = 4,
  renderLink,
  onNavigate,
  more,
  onMore,
  moreLabel = "Plus",
  className,
}: BottomTabsProps) {
  const feuilles = navLeaves(items);
  const onglets = feuilles.slice(0, max);
  const reste = feuilles.length - onglets.length;
  const afficherPlus = reste > 0 || Boolean(onMore);

  return (
    <nav className={cn("sia-bottom-tabs", className)} aria-label="Navigation principale">
      {onglets.map((item) => {
        const actif = item.key === activeKey;
        const contenu = (
          <>
            <span className="sia-bottom-tabs__pastille" aria-hidden="true">
              {item.icon}
              {navSome(item, (e) => e.badge !== undefined && e.badge !== null) && (
                <span className="sia-bottom-tabs__point" />
              )}
            </span>
            <span className="sia-bottom-tabs__label">{item.label}</span>
          </>
        );

        const classe = cn("sia-bottom-tabs__item", actif && "sia-bottom-tabs__item--active");
        const naviguer = () => {
          item.onClick?.();
          onNavigate?.(item);
        };

        if (item.href && renderLink) {
          return (
            <span key={item.key} className="sia-bottom-tabs__cell">
              {renderLink({
                item,
                children: contenu,
                props: {
                  className: classe,
                  onClick: naviguer,
                  ...(actif ? { "aria-current": "page" as const } : {}),
                },
              })}
            </span>
          );
        }

        return item.href ? (
          <a
            key={item.key}
            href={item.href}
            className={classe}
            {...(actif ? { "aria-current": "page" as const } : {})}
            onClick={naviguer}
          >
            {contenu}
          </a>
        ) : (
          <button
            key={item.key}
            type="button"
            className={classe}
            {...(actif ? { "aria-current": "page" as const } : {})}
            onClick={naviguer}
          >
            {contenu}
          </button>
        );
      })}

      {afficherPlus && (
        <button
          type="button"
          className="sia-bottom-tabs__item"
          onClick={onMore}
          aria-label={`${moreLabel}${reste > 0 ? ` (${reste})` : ""}`}
        >
          <span className="sia-bottom-tabs__pastille" aria-hidden="true">
            {more ?? "···"}
          </span>
          <span className="sia-bottom-tabs__label">{moreLabel}</span>
        </button>
      )}
    </nav>
  );
});
