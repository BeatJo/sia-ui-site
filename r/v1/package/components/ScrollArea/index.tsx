import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";

export interface ScrollAreaProps {
  children: ReactNode;
  /** Hauteur maximale. Au-delà, la zone défile. */
  maxHeight?: number | string;
  height?: number | string;
  orientation?: "vertical" | "horizontal" | "both";
  /**
   * Estompe le contenu aux bords tant qu'il reste quelque chose à faire
   * défiler. C'est le seul indice fiable quand la barre est fine ou masquée.
   */
  fade?: boolean;
  className?: string;
}

/**
 * Une zone défilante sobre.
 *
 * La barre reste celle du navigateur, seulement affinée : une barre
 * réimplémentée en JavaScript coûte un écouteur de défilement, deux mesures
 * par image et perd le défilement inertiel des pavés tactiles. Le seul ajout
 * est l'estompe des bords, qui ne demande qu'un booléen par côté.
 */
export function ScrollArea({
  children,
  maxHeight,
  height,
  orientation = "vertical",
  fade = true,
  className,
}: ScrollAreaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({
    top: false,
    bottom: false,
    left: false,
    right: false,
  });

  const measure = useCallback(() => {
    const node = ref.current;
    if (!node || !fade) return;
    const {
      scrollTop,
      scrollLeft,
      scrollHeight,
      scrollWidth,
      clientHeight,
      clientWidth,
    } = node;
    setEdges({
      top: scrollTop > 1,
      // Une tolérance d'un pixel : un zoom navigateur produit des hauteurs
      // fractionnaires et l'estompe du bas resterait sinon allumée en bout
      // de course.
      bottom: scrollTop + clientHeight < scrollHeight - 1,
      left: scrollLeft > 1,
      right: scrollLeft + clientWidth < scrollWidth - 1,
    });
  }, [fade]);

  // Le contenu peut changer sans qu'on défile — une liste qui se charge.
  useEffect(() => {
    measure();
    const node = ref.current;
    if (!node || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    for (const child of Array.from(node.children)) observer.observe(child);
    return () => observer.disconnect();
  }, [children, measure]);

  const style: CSSProperties = {
    ...(height !== undefined ? { height } : {}),
    ...(maxHeight !== undefined ? { maxHeight } : {}),
  };

  return (
    <div
      className={cn(
        "sia-scroll-area",
        `sia-scroll-area--${orientation}`,
        fade && "sia-scroll-area--fade",
        className,
      )}
      data-top={edges.top || undefined}
      data-bottom={edges.bottom || undefined}
      data-left={edges.left || undefined}
      data-right={edges.right || undefined}
    >
      <div
        ref={ref}
        className="sia-scroll-area__viewport"
        style={style}
        {...(fade ? { onScroll: measure } : {})}
        // Focalisable : sans cela les flèches du clavier ne font défiler la
        // zone qu'une fois un élément intérieur atteint par tabulation.
        tabIndex={0}
      >
        {children}
      </div>
    </div>
  );
}
