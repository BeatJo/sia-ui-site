import { useMemo, useState, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import { formatMessage, plural, useSiaLocale, type JsonViewMessages } from "@sia-ui/headless";
import { useCopyToClipboard } from "@sia-ui/react";
import { Alert, type AlertProps } from "../Alert";
import { Button, type ButtonProps } from "../Button";
import { CheckIcon, ChevronDownIcon, ChevronRightIcon } from "../Icons";
import { ScrollArea, type ScrollAreaProps } from "../ScrollArea";
import "./styles.css";

export interface JsonViewProps {
  /** Une valeur déjà analysée : objet, tableau, scalaire. */
  value?: unknown;
  /**
   * Un texte JSON, analysé ici. S'il est invalide, il s'affiche tel quel
   * sous une alerte discrète : une réponse serveur tronquée reste lisible.
   * Prioritaire sur `value`.
   */
  source?: string;
  /** Les niveaux ouverts au premier affichage. `2` par défaut. */
  defaultExpandDepth?: number;
  /** Faux : un simple bloc mis en forme, tout ouvert, sans bascule. */
  collapsible?: boolean;
  /** Au-delà, la zone défile. */
  maxHeight?: number | string;
  /** Vrai par défaut : un bouton copie le JSON mis en forme. */
  copyable?: boolean;
  copyLabel?: string;
  copiedLabel?: string;
  /** Le titre de l'alerte quand `source` ne s'analyse pas. */
  invalidLabel?: ReactNode;
  className?: string;

  /** Le bouton de copie. Son action et son libellé suivent la copie. */
  copyButtonProps?: Partial<Omit<ButtonProps, "onClick" | "children">>;
  /** L'alerte d'un texte invalide. Son contenu est l'erreur d'analyse. */
  alertProps?: Partial<Omit<AlertProps, "children">>;
  /** La zone défilante. Sa hauteur maximale passe par `maxHeight`. */
  scrollAreaProps?: Partial<Omit<ScrollAreaProps, "children" | "maxHeight">>;
}

type Analyse = { ok: true; data: unknown } | { ok: false; error: string };

interface Contexte {
  depth: number;
  collapsible: boolean;
  /** Les textes, lus une fois par le composant et descendus aux nœuds. */
  m: JsonViewMessages;
  language: string;
}

function estComposite(value: unknown): value is Record<string, unknown> | unknown[] {
  return typeof value === "object" && value !== null && !(value instanceof Date);
}

function scalaire(value: unknown) {
  if (typeof value === "string") {
    return <span className="sia-json-view__string">{JSON.stringify(value)}</span>;
  }
  if (typeof value === "number" || typeof value === "bigint") {
    return <span className="sia-json-view__number">{String(value)}</span>;
  }
  if (typeof value === "boolean") {
    return <span className="sia-json-view__boolean">{String(value)}</span>;
  }
  if (value instanceof Date) {
    return <span className="sia-json-view__string">{JSON.stringify(value)}</span>;
  }
  // `null`, et ce que JSON ne sait pas écrire — `undefined`, une fonction :
  // affichés quand même, en retrait, plutôt que de disparaître en silence.
  return <span className="sia-json-view__null">{value === null ? "null" : String(value)}</span>;
}

interface NoeudProps {
  /** Une clé d'objet, un indice de tableau, ou rien pour la racine. */
  name?: string | number;
  value: unknown;
  level: number;
  last: boolean;
  ctx: Contexte;
}

/**
 * Un nœud de l'arbre. Chacun tient son propre état d'ouverture : replier
 * une branche ne redessine qu'elle, et un nœud replié ne rend pas ses
 * enfants du tout.
 */
function Noeud({ name, value, level, last, ctx }: NoeudProps) {
  const [ouvert, setOuvert] = useState(!ctx.collapsible || level < ctx.depth);
  const virgule = last ? null : <span className="sia-json-view__punct">,</span>;

  const cle =
    name === undefined ? null : (
      <>
        <span className={typeof name === "number" ? "sia-json-view__index" : "sia-json-view__key"}>
          {typeof name === "number" ? name : JSON.stringify(name)}
        </span>
        <span className="sia-json-view__punct">: </span>
      </>
    );

  if (!estComposite(value)) {
    return (
      <li className="sia-json-view__node">
        <div className="sia-json-view__row">
          {cle}
          {scalaire(value)}
          {virgule}
        </div>
      </li>
    );
  }

  const tableau = Array.isArray(value);
  const enfants: Array<[string | number, unknown]> = tableau
    ? value.map((v, i) => [i, v])
    : Object.entries(value);
  const [debut, fin] = tableau ? ["[", "]"] : ["{", "}"];

  if (enfants.length === 0) {
    return (
      <li className="sia-json-view__node">
        <div className="sia-json-view__row">
          {cle}
          <span className="sia-json-view__punct">{debut + fin}</span>
          {virgule}
        </div>
      </li>
    );
  }

  const n = enfants.length;
  const resume = tableau ? String(n) : plural(ctx.m, "keys", n, ctx.language);
  const nom = name === undefined ? ctx.m.root : String(name);

  return (
    <li className="sia-json-view__node">
      <div className="sia-json-view__row">
        {/*
          Un bouton natif et non `IconButton` : il y en a un par nœud, sur
          des lignes d'une hauteur de texte, là où `IconButton` impose une
          cible de bouton de barre d'outils.
        */}
        {ctx.collapsible && (
          <button
            type="button"
            className="sia-json-view__toggle"
            aria-expanded={ouvert}
            aria-label={formatMessage(ouvert ? ctx.m.collapse : ctx.m.expand, { name: nom })}
            onClick={() => setOuvert(!ouvert)}
          >
            {ouvert ? <ChevronDownIcon /> : <ChevronRightIcon />}
          </button>
        )}
        {cle}
        {ouvert ? (
          <span className="sia-json-view__punct">{debut}</span>
        ) : (
          <>
            <span className="sia-json-view__punct">{`${debut}…${fin}`}</span>
            <span className="sia-json-view__summary">{resume}</span>
            {virgule}
          </>
        )}
      </div>
      {ouvert && (
        <>
          <ul className="sia-json-view__children">
            {enfants.map(([k, v], i) => (
              <Noeud key={k} name={k} value={v} level={level + 1} last={i === n - 1} ctx={ctx} />
            ))}
          </ul>
          <div className="sia-json-view__row">
              <span className="sia-json-view__punct">{fin}</span>
            {virgule}
          </div>
        </>
      )}
    </li>
  );
}

/**
 * Un JSON en lecture seule, que l'on déplie.
 *
 * Pour une réponse d'API, une charge utile, une configuration : les types se
 * distinguent à la couleur, les branches profondes restent repliées, et un
 * nœud replié dit ce qu'il contient — `{…} 3 clés`. À la différence de
 * `JsonEditor`, rien ne s'y saisit.
 */
export function JsonView({
  value,
  source,
  defaultExpandDepth = 2,
  collapsible = true,
  maxHeight,
  copyable = true,
  copyLabel: copyLabelProp,
  copiedLabel: copiedLabelProp,
  invalidLabel: invalidLabelProp,
  className,
  copyButtonProps,
  alertProps,
  scrollAreaProps,
}: JsonViewProps) {
  const locale = useSiaLocale();
  const m = locale.jsonView;
  const copyLabel = copyLabelProp ?? locale.copy;
  const copiedLabel = copiedLabelProp ?? locale.copied;
  const invalidLabel = invalidLabelProp ?? m.invalid;
  const { copy, copied } = useCopyToClipboard();

  const analyse = useMemo<Analyse>(() => {
    if (source === undefined) return { ok: true, data: value };
    try {
      return { ok: true, data: JSON.parse(source) as unknown };
    } catch (erreur) {
      return { ok: false, error: erreur instanceof Error ? erreur.message : String(erreur) };
    }
  }, [source, value]);

  const ctx = useMemo<Contexte>(
    () => ({ depth: defaultExpandDepth, collapsible, m, language: locale.language }),
    [defaultExpandDepth, collapsible, m, locale.language],
  );

  // Au clic seulement : mettre en forme un gros document à chaque rendu
  // coûterait pour une copie que personne ne fera peut-être.
  const copier = () => {
    const texte = analyse.ok
      ? (JSON.stringify(analyse.data, null, 2) ?? String(analyse.data))
      : (source ?? "");
    void copy(texte);
  };

  return (
    <div
      className={cn(
        "sia-json-view",
        !collapsible && "sia-json-view--static",
        copyable && "sia-json-view--copyable",
        className,
      )}
    >
      {!analyse.ok && (
        <Alert tone="warning" title={invalidLabel} {...alertProps}>
          {/* Le message du moteur (« Unexpected end of JSON input ») est en
              anglais et varie d'un navigateur à l'autre : une phrase stable,
              le détail technique en infobulle pour qui le cherche. */}
          <span title={analyse.error}>{m.invalidDescription}</span>
        </Alert>
      )}
      <div className="sia-json-view__frame">
        {copyable && (
          <Button
            variant="ghost"
            size="sm"
            {...(copied ? { leftIcon: <CheckIcon /> } : {})}
            {...copyButtonProps}
            className={cn("sia-json-view__copy", copyButtonProps?.className)}
            onClick={copier}
          >
            {copied ? copiedLabel : copyLabel}
          </Button>
        )}
        <ScrollArea
          {...scrollAreaProps}
          {...(maxHeight !== undefined ? { maxHeight } : {})}
          className={cn("sia-json-view__scroll", scrollAreaProps?.className)}
        >
          {analyse.ok ? (
            <ul className="sia-json-view__tree">
              <Noeud value={analyse.data} level={0} last ctx={ctx} />
            </ul>
          ) : (
            <pre className="sia-json-view__raw">{source}</pre>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
