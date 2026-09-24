import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { cn } from "@sia-ui/utils";
import { Portal } from "@sia-ui/react";
import "./styles.css";
import { useOutsideClick } from "@sia-ui/react";
import { DrawerContext } from "./context";
import { overlayStack, useDisclosureState } from "@sia-ui/headless";
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
      ...rest
    },
    ref
  ) => {
    // Ouverture, fermeture et phase de sortie vivent dans @sia-ui/headless :
    // rien là-dedans n'est propre au DOM, et le pendant mobile réutilisera la
    // même mécanique.
    const {
      isOpen,
      phase: state,
      open: doOpen,
      close: doClose,
    } = useDisclosureState({
      ...(open !== undefined ? { open } : {}),
      defaultOpen,
      ...(onOpenChange ? { onOpenChange } : {}),
      exitMs: 200,
    });

    const drawerRef = useRef<HTMLDivElement | null>(null);
    const zIndexRef = useRef<number | null>(null);

    /* 🔌 API IMPÉRATIVE */
    useImperativeHandle(
      ref,
      () => ({
        open: doOpen,
        close: doClose,
        toggle: () => (isOpen ? doClose() : doOpen()),
        isOpen: () => isOpen,
      }),
      [isOpen, open]
    );

    /* Overlay stack */
    useEffect(() => {
      if (!isOpen) return;

      zIndexRef.current = overlayStack.acquire("drawer");

      return () => {
        overlayStack.release("drawer");
        zIndexRef.current = null;
      };
    }, [isOpen]);

    /* ESC + body lock */
    useEffect(() => {
      if (!isOpen) return;

      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const onKeyDown = (e: KeyboardEvent) => {
        if (!closeOnEsc || e.key !== "Escape") return;
        if (overlayStack.isTop(zIndexRef.current)) {
          doClose();
        }
      };

      window.addEventListener("keydown", onKeyDown);

      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener("keydown", onKeyDown);
      };
    }, [isOpen, closeOnEsc]);

    /* Outside click */
    useOutsideClick([drawerRef], () => {
      if (!closeOnOutsideClick || !isOpen) return;

      // 🔒 Seul le drawer au top peut se fermer
      if (!overlayStack.isTop(zIndexRef.current)) return;

      doClose();
    });

    if (!isOpen) return null;

    return (
      <Portal>
        <DrawerContext.Provider value={{ close: doClose }}>
          <div
            className="sia-drawer-root"
            style={{ zIndex: zIndexRef.current ?? undefined }}
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
                state === "closing" && "is-closing"
              )}
              {...rest}
            >
              {children}
            </div>
          </div>
        </DrawerContext.Provider>
      </Portal>
    );
  }
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
  if (!ctx) return null;

  return (
    <button
      type="button"
      className="sia-drawer-close"
      onClick={ctx.close}
      aria-label="Fermer"
    >
      ✕
    </button>
  );
}

Drawer.Header = DrawerHeader;
Drawer.Title = DrawerTitle;
Drawer.Body = DrawerBody;
Drawer.Footer = DrawerFooter;
Drawer.Close = DrawerClose;
