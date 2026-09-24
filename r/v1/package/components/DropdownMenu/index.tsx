import {
  cloneElement,
  isValidElement,
  useCallback,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@sia-ui/utils";
import { useRovingIndex } from "@sia-ui/headless";
import { Overlay, type OverlayPlacement } from "../Overlay";
import { CheckIcon } from "../Icons";
import "./styles.css";

export interface MenuItem {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  /** Un raccourci affiché à droite. Purement indicatif : rien n'est écouté. */
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  /** Affiche une coche. `undefined` : l'entrée n'est pas cochable. */
  checked?: boolean;
  description?: ReactNode;
  onSelect?: () => void;
}

export interface MenuSeparator {
  key: string;
  type: "separator";
}

export interface MenuLabel {
  key: string;
  type: "label";
  label: ReactNode;
}

export type MenuEntry = MenuItem | MenuSeparator | MenuLabel;

function isActionable(entry: MenuEntry): entry is MenuItem {
  return !("type" in entry) && !entry.disabled;
}

export interface MenuListProps {
  items: MenuEntry[];
  onSelect: (item: MenuItem) => void;
  onClose: () => void;
  /** Index actif, piloté par le parent pour que le clavier suive. */
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  id?: string | undefined;
  className?: string | undefined;
}

/**
 * Le panneau seul, sans déclencheur.
 *
 * Extrait parce que `DropdownMenu` et `ContextMenu` n'ont en commun que lui :
 * tout le reste — l'ancrage, le geste d'ouverture — diffère.
 */
export function MenuList({
  items,
  onSelect,
  onClose,
  activeIndex,
  onActiveIndexChange,
  id,
  className,
}: MenuListProps) {
  return (
    <div className={cn("sia-menu", className)} role="menu" id={id}>
      {items.map((entry, index) => {
        if ("type" in entry && entry.type === "separator") {
          return <div key={entry.key} className="sia-menu__separator" role="separator" />;
        }
        if ("type" in entry && entry.type === "label") {
          return (
            <div key={entry.key} className="sia-menu__group-label">
              {entry.label}
            </div>
          );
        }

        const item = entry as MenuItem;
        const checkable = item.checked !== undefined;

        return (
          <button
            key={item.key}
            type="button"
            className={cn(
              "sia-menu__item",
              item.danger && "sia-menu__item--danger",
            )}
            role={checkable ? "menuitemcheckbox" : "menuitem"}
            {...(checkable ? { "aria-checked": item.checked } : {})}
            disabled={item.disabled}
            data-active={index === activeIndex || undefined}
            // Le survol déplace le curseur clavier : sinon la flèche repart
            // d'où elle en était et l'entrée survolée n'est pas celle qui
            // s'active à l'Entrée.
            onMouseEnter={() => onActiveIndexChange(index)}
            onClick={() => {
              item.onSelect?.();
              onSelect(item);
              onClose();
            }}
            // L'entrée porte son propre délai : elles arrivent en cascade,
            // dans l'ordre de lecture.
            style={{ ["--sia-menu-index" as string]: index }}
          >
            {checkable && (
              <span className="sia-menu__check" aria-hidden="true">
                {item.checked && <CheckIcon />}
              </span>
            )}
            {item.icon && <span className="sia-menu__icon" aria-hidden="true">{item.icon}</span>}
            <span className="sia-menu__text">
              <span className="sia-menu__label">{item.label}</span>
              {item.description && (
                <span className="sia-menu__description">{item.description}</span>
              )}
            </span>
            {item.shortcut && <kbd className="sia-menu__shortcut">{item.shortcut}</kbd>}
          </button>
        );
      })}
    </div>
  );
}

/** Les déplacements clavier communs aux deux menus. */
function useMenuKeyboard(
  items: MenuEntry[],
  close: () => void,
  onSelect: (item: MenuItem) => void,
) {
  const disabled = useMemo(
    () =>
      items
        .map((entry, index) => (isActionable(entry) ? -1 : index))
        .filter((index) => index >= 0),
    [items],
  );

  const roving = useRovingIndex({ count: items.length, disabled });

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          roving.next();
          break;
        case "ArrowUp":
          event.preventDefault();
          roving.previous();
          break;
        case "Home":
          event.preventDefault();
          roving.first();
          break;
        case "End":
          event.preventDefault();
          roving.last();
          break;
        case "Enter":
        case " ": {
          const entry = items[roving.index];
          if (entry && isActionable(entry)) {
            event.preventDefault();
            entry.onSelect?.();
            onSelect(entry);
            close();
          }
          break;
        }
        case "Escape":
          event.preventDefault();
          close();
          break;
        default:
          break;
      }
    },
    [close, items, onSelect, roving],
  );

  return { roving, onKeyDown };
}

export interface DropdownMenuProps {
  items: MenuEntry[];
  children: ReactElement<{ onClick?: () => void; "aria-expanded"?: boolean }>;
  onSelect?: (item: MenuItem) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: OverlayPlacement;
  matchTriggerWidth?: boolean;
  className?: string;
}

/**
 * Un menu accroché à un bouton.
 *
 * Il repose sur `Overlay` : le repositionnement quand la place manque en bas,
 * la fermeture au clic extérieur et à Échap sont déjà là et ne sont pas
 * réécrites ici.
 */
export function DropdownMenu({
  items,
  children,
  onSelect,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom-start",
  matchTriggerWidth = false,
  className,
}: DropdownMenuProps) {
  const anchorRef = useRef<HTMLElement>(null);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = openProp ?? internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (openProp === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange, openProp],
  );

  const close = useCallback(() => setOpen(false), [setOpen]);
  const handleSelect = useCallback(
    (item: MenuItem) => onSelect?.(item),
    [onSelect],
  );
  const { roving, onKeyDown } = useMenuKeyboard(items, close, handleSelect);

  const trigger = isValidElement(children)
    ? cloneElement(children, {
        ref: anchorRef,
        "aria-haspopup": "menu",
        "aria-expanded": open,
        onClick: () => {
          children.props.onClick?.();
          setOpen(!open);
          roving.reset();
        },
      } as never)
    : children;

  return (
    <span className="sia-menu-anchor" onKeyDown={onKeyDown}>
      {trigger}
      <Overlay
        open={open}
        anchorRef={anchorRef}
        onOpenChange={setOpen}
        placement={placement}
        matchAnchorWidth={matchTriggerWidth}
        className={cn("sia-menu-overlay", className)}
      >
        <MenuList
          items={items}
          activeIndex={roving.index}
          onActiveIndexChange={roving.setIndex}
          onSelect={handleSelect}
          onClose={close}
        />
      </Overlay>
    </span>
  );
}

export interface ContextMenuProps {
  items: MenuEntry[];
  children: ReactNode;
  onSelect?: (item: MenuItem) => void;
  className?: string;
}

/**
 * Le même menu, ouvert au clic droit sur une zone.
 *
 * L'ancre est un point, pas un élément : un repère de taille nulle est posé
 * aux coordonnées du pointeur et confié à `Overlay`, qui ne voit pas la
 * différence. C'est ce qui évite un second moteur de placement.
 */
export function ContextMenu({
  items,
  children,
  onSelect,
  className,
}: ContextMenuProps) {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [point, setPoint] = useState<{ x: number; y: number } | null>(null);
  const open = point !== null;

  const close = useCallback(() => setPoint(null), []);
  const handleSelect = useCallback(
    (item: MenuItem) => onSelect?.(item),
    [onSelect],
  );
  const { roving, onKeyDown } = useMenuKeyboard(items, close, handleSelect);

  return (
    <div
      className="sia-context-menu"
      onKeyDown={onKeyDown}
      onContextMenu={(event) => {
        event.preventDefault();
        setPoint({ x: event.clientX, y: event.clientY });
        roving.reset();
      }}
    >
      {children}
      <span
        ref={anchorRef}
        className="sia-context-menu__point"
        style={point ? { top: point.y, left: point.x } : undefined}
        aria-hidden="true"
      />
      <Overlay
        open={open}
        anchorRef={anchorRef}
        onOpenChange={(next) => {
          if (!next) close();
        }}
        placement="bottom-start"
        offset={2}
        className={cn("sia-menu-overlay", className)}
      >
        <MenuList
          items={items}
          activeIndex={roving.index}
          onActiveIndexChange={roving.setIndex}
          onSelect={handleSelect}
          onClose={close}
        />
      </Overlay>
    </div>
  );
}
