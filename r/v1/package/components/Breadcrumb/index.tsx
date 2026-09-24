import { Fragment, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import { useSiaLocale } from "@sia-ui/headless";
import { ChevronRightIcon, MoreHorizontalIcon } from "../Icons";
import { DropdownMenu, type MenuEntry } from "../DropdownMenu";
import "./styles.css";

export interface BreadcrumbItem {
  key?: string;
  label: ReactNode;
  href?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /**
   * Au-delà, les niveaux intermédiaires passent dans un menu. Le premier et
   * les deux derniers restent toujours visibles : ce sont les seuls dont on
   * ait vraiment besoin pour se situer.
   */
  maxVisible?: number;
  separator?: ReactNode;
  ariaLabel?: string;
  className?: string;
}

/**
 * Le chemin parcouru.
 *
 * Le dernier élément n'est jamais un lien : c'est la page courante, et un
 * lien vers l'endroit où l'on se trouve déjà n'existe pas.
 */
export function Breadcrumb({
  items,
  maxVisible = 4,
  separator,
  ariaLabel,
  className,
}: BreadcrumbProps) {
  const locale = useSiaLocale();
  const mark = separator ?? <ChevronRightIcon />;

  const overflow = items.length > maxVisible ? items.slice(1, -2) : [];
  const visible =
    overflow.length > 0 ? [items[0]!, null, ...items.slice(-2)] : items;

  const hidden: MenuEntry[] = overflow.map((item, index) => ({
    key: item.key ?? `overflow-${index}`,
    label: item.label,
    ...(item.icon !== undefined ? { icon: item.icon } : {}),
    onSelect: () => {
      if (item.onClick) item.onClick();
      else if (item.href && typeof window !== "undefined") {
        window.location.assign(item.href);
      }
    },
  }));

  return (
    <nav
      className={cn("sia-breadcrumb", className)}
      aria-label={ariaLabel ?? locale.breadcrumb}
    >
      <ol>
        {visible.map((item, index) => {
          const last = index === visible.length - 1;

          return (
            <Fragment key={item ? (item.key ?? index) : "overflow"}>
              <li className="sia-breadcrumb__item">
                {item === null ? (
                  <DropdownMenu items={hidden}>
                    <button
                      type="button"
                      className="sia-breadcrumb__more"
                      aria-label={locale.more}
                    >
                      <MoreHorizontalIcon />
                    </button>
                  </DropdownMenu>
                ) : last ? (
                  <span className="sia-breadcrumb__current" aria-current="page">
                    {item.icon && (
                      <span className="sia-breadcrumb__icon" aria-hidden="true">
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </span>
                ) : item.href ? (
                  <a
                    className="sia-breadcrumb__link"
                    href={item.href}
                    onClick={item.onClick}
                  >
                    {item.icon && (
                      <span className="sia-breadcrumb__icon" aria-hidden="true">
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    className="sia-breadcrumb__link"
                    onClick={item.onClick}
                  >
                    {item.icon && (
                      <span className="sia-breadcrumb__icon" aria-hidden="true">
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </button>
                )}
              </li>
              {!last && (
                <li className="sia-breadcrumb__separator" aria-hidden="true">
                  {mark}
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
