import {
  useEffect,
  useId,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { cn } from "@sia-ui/utils";
import { paginationItems, useSiaLocale } from "@sia-ui/headless";
import { ChevronLeftIcon, ChevronRightIcon } from "../Icons";
import { Select, type SelectProps } from "../Select";
import "./styles.css";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  previousLabel?: string;
  nextLabel?: string;
  /**
   * Ajoute un champ pour sauter directement à une page.
   *
   * Sur quarante pages, atteindre la vingt-septième demande sinon de cliquer
   * dans les ellipses jusqu'à ce qu'elle apparaisse.
   */
  jumpTo?: boolean;
  /** Affiche « Page 3 sur 40 » à côté des numéros. */
  showTotal?: boolean;
  /** Masque les libellés et ne garde que les flèches. */
  compact?: boolean;

  /* ─────────────────────────────────────────────── taille de page */

  /** Le nombre de lignes par page en vigueur. */
  pageSize?: number;
  /**
   * Fourni avec `pageSize`, ajoute le choix du nombre de lignes par page.
   *
   * Seul le nouveau nombre est remonté : revenir en page 1 est l'affaire de
   * qui tient l'état — `setPerPage` de `useTableQuery` le fait déjà.
   */
  onPageSizeChange?: (pageSize: number) => void;
  /**
   * Les tailles proposées. Par défaut `10, 20, 50, 100`. Une taille en
   * vigueur absente de la liste y est ajoutée, pour que le champ ne paraisse
   * jamais vide.
   */
  pageSizeOptions?: number[];
  /** Le libellé du choix. Par défaut `locale.perPage` — « Par page ». */
  pageSizeLabel?: string;
  /**
   * Remplace entièrement le contrôle — des boutons segmentés, un champ libre.
   * Le choix des tailles et leur tri sont déjà faits.
   */
  renderPageSize?: (context: PageSizeContext) => ReactNode;
  /**
   * Le `Select` de taille de page : placement, variante, classe.
   *
   * La valeur, les options et le rappel restent calculés ici — on les règle
   * par `pageSize`, `pageSizeOptions` et `onPageSizeChange`.
   */
  pageSizeSelectProps?: Partial<
    Omit<SelectProps, "value" | "defaultValue" | "options" | "children" | "onValueChange">
  >;

  ariaLabel?: string;
  className?: string;
}

/** Ce que reçoit `renderPageSize`. */
export interface PageSizeContext {
  pageSize: number;
  options: number[];
  onChange: (pageSize: number) => void;
  label: string;
}

export const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

/**
 * La navigation entre les pages.
 *
 * Le calcul des numéros et des ellipses vient de `@sia-ui/headless` :
 * `usePagination` et ce composant appliquent la même règle, écrite une fois.
 */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  previousLabel: previousLabelProp,
  nextLabel: nextLabelProp,
  jumpTo = false,
  showTotal = false,
  compact = false,
  pageSize,
  onPageSizeChange,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  pageSizeLabel,
  renderPageSize,
  pageSizeSelectProps,
  ariaLabel,
  className,
}: PaginationProps) {
  const locale = useSiaLocale();
  const nextLabel = nextLabelProp ?? locale.next;
  const previousLabel = previousLabelProp ?? locale.previous;

  // Deux paginations sur la même page ne doivent pas partager l'identifiant
  // de leur champ : le libellé pointerait alors vers l'autre.
  const jumpId = useId();
  const current = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
  const [draft, setDraft] = useState(String(current));

  // Le champ suit la page quand elle change ailleurs — un clic sur un numéro,
  // un retour arrière du navigateur.
  useEffect(() => setDraft(String(current)), [current]);

  const tailles = useMemo(() => {
    if (pageSize === undefined || pageSizeOptions.includes(pageSize)) {
      return pageSizeOptions;
    }
    return [...pageSizeOptions, pageSize].sort((a, b) => a - b);
  }, [pageSize, pageSizeOptions]);

  const choixTaille =
    pageSize !== undefined && onPageSizeChange && tailles.length > 0;
  const plusieursPages = totalPages > 1;
  const tailleLibelle = pageSizeLabel ?? locale.perPage;

  // Une seule page n'a rien à paginer — sauf si l'on peut encore changer de
  // taille : après avoir choisi 100 lignes, il faut pouvoir revenir à 10.
  if (!plusieursPages && !choixTaille) return null;

  const items = plusieursPages
    ? paginationItems(current, totalPages, siblingCount)
    : [];

  const jump = (event: FormEvent) => {
    event.preventDefault();
    const asked = Number(draft);
    if (!Number.isFinite(asked)) {
      setDraft(String(current));
      return;
    }
    // Une page hors bornes est ramenée dedans plutôt que refusée : taper 99
    // sur 40 pages veut dire « la dernière ».
    onPageChange(Math.min(Math.max(Math.round(asked), 1), totalPages));
  };

  return (
    <nav
      className={cn(
        "sia-pagination",
        compact && "sia-pagination--compact",
        className,
      )}
      aria-label={ariaLabel ?? locale.pagination.label}
    >
      {/*
        Deux groupes, qui passent à la ligne chacun d'un seul tenant : la
        navigation d'un côté, les réglages de l'autre. Sans eux, un écran un
        peu étroit renvoyait « Par page » seul sur une seconde ligne, loin de
        son champ.
      */}
      {plusieursPages && (
        <div className="sia-pagination__pages">
          <button
            type="button"
            className="sia-pagination__step"
            disabled={current === 1}
            aria-label={previousLabel}
            onClick={() => onPageChange(current - 1)}
          >
            <ChevronLeftIcon />
            {!compact && <span>{previousLabel}</span>}
          </button>

          {items.map((item) =>
            typeof item === "number" ? (
              <button
                type="button"
                key={item}
                className="sia-pagination__page"
                aria-current={item === current ? "page" : undefined}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            ) : (
              <span key={item} className="sia-pagination__gap" aria-hidden="true">
                …
              </span>
            ),
          )}

          <button
            type="button"
            className="sia-pagination__step"
            disabled={current === totalPages}
            aria-label={nextLabel}
            onClick={() => onPageChange(current + 1)}
          >
            {!compact && <span>{nextLabel}</span>}
            <ChevronRightIcon />
          </button>
        </div>
      )}

      {(choixTaille || (plusieursPages && (showTotal || jumpTo))) && (
        <div className="sia-pagination__settings">
          {plusieursPages && showTotal && (
            <span className="sia-pagination__total">
              {locale.page} {current} / {totalPages}
            </span>
          )}

          {choixTaille && (
            <div className="sia-pagination__size">
              {renderPageSize ? (
                renderPageSize({
                  pageSize,
                  options: tailles,
                  onChange: onPageSizeChange,
                  label: tailleLibelle,
                })
              ) : (
                <>
                  <span aria-hidden="true">{tailleLibelle}</span>
                  <Select
                    variant="embedded"
                    aria-label={tailleLibelle}
                    placement="top-end"
                    {...pageSizeSelectProps}
                    value={String(pageSize)}
                    options={tailles.map((taille) => ({
                      value: String(taille),
                      label: String(taille),
                    }))}
                    onValueChange={(valeur) => onPageSizeChange(Number(valeur))}
                  />
                </>
              )}
            </div>
          )}

          {plusieursPages && jumpTo && (
            <form className="sia-pagination__jump" onSubmit={jump}>
              <label htmlFor={jumpId}>{locale.goToPage}</label>
              <input
                id={jumpId}
                // `text` plutôt que `number` : le champ numérique natif accepte
                // « 1e5 » et « -- », et vide sa valeur sans prévenir quand elle
                // ne lui plaît pas.
                type="text"
                inputMode="numeric"
                value={draft}
                aria-label={locale.goToPage}
                onChange={(event) => setDraft(event.target.value.replace(/\D/g, ""))}
                onBlur={jump}
              />
              <span className="sia-pagination__jump-total" aria-hidden="true">
                / {totalPages}
              </span>
            </form>
          )}
        </div>
      )}
    </nav>
  );
}
