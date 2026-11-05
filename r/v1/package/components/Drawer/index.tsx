import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { cn } from "@sia-ui/utils";
import {
  OverlayScope,
  useOverlayLayer,
  useOverlayScrollLock,
  Portal,
} from "@sia-ui/react";
import "./styles.css";
import { useOutsideClick } from "@sia-ui/react";
import { DrawerContext } from "./context";
import { useDisclosureState, useSiaLocale } from "@sia-ui/headless";
import { XIcon } from "../Icons";
/** Ce que la réf impérative expose — ouvrir un tiroir depuis l'extérieur. */
export type DrawerRef = {
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: () => boolean;
};

export type DrawerPosition = "left" | "right" | "top" | "bottom";
export type DrawerSize = "sm" | "md" | "lg" | "xl";

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  position?: DrawerPosition;
  size?: DrawerSize;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
}

/** Alias historique, attendu par les composants venus du registre. */
export type IDrawerProps = DrawerProps;

export type DrawerComponent = ForwardRefExoticComponent<
  IDrawerProps & RefAttributes<DrawerRef>
> & {
  Header: typeof DrawerHeader;
  Body: typeof DrawerBody;
  Footer: typeof DrawerFooter;
  Title: typeof DrawerTitle;
  Close: typeof DrawerClose;
};

/**
 * Un panneau qui entre par un bord.
 *
 * Il sert là où une boîte modale serait trop : un filtre qu'on ajuste en
 * regardant la liste derrière, un formulaire qu'on remplit sans perdre sa
 * place. Le focus y est enfermé tant qu'il est ouvert, comme dans un
 * modal — sans quoi la tabulation continue dans la page cachée.
 */
export const Drawer = forwardRef<DrawerRef, IDrawerProps>(
  (
    {
      open,
      defaultOpen = false,
      onOpenChange,
      position = "right",
      size = "md",
      closeOnOutsideClick = true,
      closeOnEsc = true,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    // Ouverture, fermeture et phase de sortie vivent dans @sia-ui/headless :
    // rien là-dedans n'est propre au DOM, et le pendant mobile réutilisera la
    // même mécanique.
    const {
      isOpen,
      present,
      phase: state,
      open: doOpen,
      close: doClose,
      toggle,
      recentlyOpened,
    } = useDisclosureState({
      ...(open !== undefined ? { open } : {}),
      defaultOpen,
      ...(onOpenChange ? { onOpenChange } : {}),
      exitMs: 200,
    });

    const drawerRef = useRef<HTMLDivElement | null>(null);
    const { layer, zIndex, isTop, contains } = useOverlayLayer({
      open: present,
      kind: "drawer",
      elementRef: drawerRef,
    });
    useOverlayScrollLock(isOpen);
    const top = useRef(isTop);
    top.current = isTop;
    // Lue par l'écouteur d'Échap : la mettre dans ses dépendances le
    // réabonnerait — et rebasculerait le verrou du body — à chaque rendu où
    // `onOpenChange` est une fonction en ligne.
    const fermer = useRef(doClose);
    fermer.current = doClose;

    /* 🔌 API IMPÉRATIVE */
    useImperativeHandle(
      ref,
      () => ({
        open: doOpen,
        close: doClose,
        toggle,
        isOpen: () => isOpen,
      }),
      [isOpen, doOpen, doClose, toggle],
    );

    /* ESC + body lock */
    useEffect(() => {
      if (!isOpen) return;

      const onKeyDown = (e: KeyboardEvent) => {
        if (!closeOnEsc || e.key !== "Escape" || e.defaultPrevented) return;
        if (top.current()) {
          e.preventDefault();
          fermer.current();
        }
      };

      window.addEventListener("keydown", onKeyDown);

      return () => {
        window.removeEventListener("keydown", onKeyDown);
      };
    }, [isOpen, closeOnEsc]);

    /* Outside click */
    useOutsideClick([drawerRef], (event) => {
      if (contains(event.target as Node)) return;
      if (!closeOnOutsideClick || !isOpen) return;

      // Le second clic d'un double clic sur la ligne qui ouvre le tiroir, ou
      // le rebond d'une souris : il tombe sur le fond et refermait aussitôt.
      if (recentlyOpened()) return;

      // 🔒 Seul le drawer au top peut se fermer
      if (!top.current()) return;

      doClose();
    });

    // Monté tant que la sortie se joue : `isOpen` est déjà faux, le parent
    // a déjà été prévenu, mais l'animation n'est pas finie.
    if (!present) return null;

    return (
      <OverlayScope layer={layer}>
        <Portal>
          <DrawerContext.Provider value={{ close: doClose }}>
            <div
              className="sia-drawer-root"
              data-state={state}
              style={{ zIndex }}
            >
              <div className="sia-drawer-overlay" />

              <div
                ref={drawerRef}
                role="dialog"
                aria-modal="true"
                data-state={state}
                className={cn(
                  "sia-drawer",
                  `sia-drawer-${position}`,
                  `sia-drawer-${size}`,
                  state === "closing" && "is-closing",
                  className,
                )}
                {...rest}
              >
                {children}
              </div>
            </div>
          </DrawerContext.Provider>
        </Portal>
      </OverlayScope>
    );
  },
) as DrawerComponent;

Drawer.displayName = "SiaDrawer";

export function DrawerHeader({ children }: { children: React.ReactNode }) {
  return <div className="sia-drawer-header">{children}</div>;
}

export function DrawerTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="sia-drawer-title">{children}</h2>;
}

export function DrawerBody({ children }: { children: React.ReactNode }) {
  return <div className="sia-drawer-body">{children}</div>;
}

export function DrawerFooter({ children }: { children: React.ReactNode }) {
  return <div className="sia-drawer-footer">{children}</div>;
}

export function DrawerClose() {
  const ctx = useContext(DrawerContext);
  const locale = useSiaLocale();
  if (!ctx) return null;

  return (
    <button
      type="button"
      className="sia-drawer-close"
      onClick={ctx.close}
      aria-label={locale.close}
    >
      <XIcon aria-hidden="true" />
    </button>
  );
}

Drawer.Header = DrawerHeader;
Drawer.Title = DrawerTitle;
Drawer.Body = DrawerBody;
Drawer.Footer = DrawerFooter;
Drawer.Close = DrawerClose;
