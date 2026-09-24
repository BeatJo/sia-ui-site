import { useId, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import { useAccordionState } from "@sia-ui/headless";
import { ChevronDownIcon } from "../Icons";
import "./styles.css";

export interface AccordionItem {
  key: string;
  title: ReactNode;
  content: ReactNode;
  /** Une ligne sous le titre, visible même replié. */
  description?: ReactNode;
  icon?: ReactNode;
  /** À droite du titre : un compteur, un badge, un statut. */
  meta?: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** `single` referme la section précédente, `multiple` les cumule. */
  type?: "single" | "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  /** En `single`, autorise à tout refermer. */
  collapsible?: boolean;
  variant?: "bordered" | "separated" | "plain";
  className?: string;
}

/**
 * Des sections dépliables.
 *
 * La hauteur s'anime sans être mesurée : le panneau est une grille dont la
 * ligne passe de `0fr` à `1fr`. Pas de `scrollHeight`, pas de recalcul au
 * redimensionnement, et un contenu qui change de taille suit tout seul.
 */
export function Accordion({
  items,
  type = "single",
  value,
  defaultValue,
  onValueChange,
  collapsible = true,
  variant = "bordered",
  className,
}: AccordionProps) {
  const baseId = useId();
  const state = useAccordionState({
    type,
    value,
    defaultValue,
    onValueChange,
    collapsible,
  });

  return (
    <div className={cn("sia-accordion", `sia-accordion--${variant}`, className)}>
      {items.map((item) => {
        const open = state.isOpen(item.key);
        const triggerId = `${baseId}-${item.key}-trigger`;
        const panelId = `${baseId}-${item.key}-panel`;

        return (
          <div
            key={item.key}
            className="sia-accordion__item"
            data-open={open || undefined}
          >
            <button
              type="button"
              id={triggerId}
              className="sia-accordion__trigger"
              aria-expanded={open}
              aria-controls={panelId}
              disabled={item.disabled}
              onClick={() => state.toggle(item.key)}
            >
              {item.icon && (
                <span className="sia-accordion__icon" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <span className="sia-accordion__heading">
                <span className="sia-accordion__title">{item.title}</span>
                {item.description && (
                  <span className="sia-accordion__description">
                    {item.description}
                  </span>
                )}
              </span>
              {item.meta && <span className="sia-accordion__meta">{item.meta}</span>}
              <span className="sia-accordion__chevron" aria-hidden="true">
                <ChevronDownIcon />
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="sia-accordion__panel"
            >
              {/* Le contenu reste monté : le démonter à chaque repli ferait
                  perdre la position de défilement, le texte déjà saisi et
                  l'état des sous-composants. `inert` le retire du parcours au
                  clavier et de l'arbre d'accessibilité tant qu'il est replié —
                  c'est la seule chose qui doit disparaître. */}
              <div className="sia-accordion__content" inert={open ? undefined : true}>
                <div className="sia-accordion__inner">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export interface CollapseProps {
  title: ReactNode;
  children: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  icon?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: AccordionProps["variant"];
  disabled?: boolean;
  className?: string;
}

/** Une section seule. Le même rendu, pour le cas le plus courant. */
export function Collapse({
  title,
  children,
  description,
  meta,
  icon,
  open,
  defaultOpen = false,
  onOpenChange,
  variant = "bordered",
  disabled = false,
  className,
}: CollapseProps) {
  return (
    <Accordion
      {...(className !== undefined ? { className } : {})}
      variant={variant}
      type="multiple"
      {...(open !== undefined ? { value: open ? ["only"] : [] } : {})}
      {...(open === undefined ? { defaultValue: defaultOpen ? ["only"] : [] } : {})}
      {...(onOpenChange
        ? { onValueChange: (next: string[]) => onOpenChange(next.length > 0) }
        : {})}
      items={[
        {
          key: "only",
          title,
          content: children,
          disabled,
          ...(description !== undefined ? { description } : {}),
          ...(meta !== undefined ? { meta } : {}),
          ...(icon !== undefined ? { icon } : {}),
        },
      ]}
    />
  );
}
