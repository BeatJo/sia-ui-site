import {
  useId,
  useMemo,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@sia-ui/utils";
import type { ComponentTone } from "@sia-ui/tokens";
import "./styles.css";

export interface ChartSeries {
  key: string;
  label?: string;
  values: Array<number | null>;
  tone?: ComponentTone;
  /** Couleur explicite. Prioritaire sur `tone`. */
  color?: string;
}

export interface ChartProps {
  series: ChartSeries[];
  /** Les libellés de l'axe horizontal. Un par point. */
  labels?: string[];
  type?: "line" | "area" | "bar";
  height?: number;
  /** Bornes de l'axe vertical. Par défaut, déduites des données. */
  min?: number;
  max?: number;
  showGrid?: boolean;
  showAxis?: boolean;
  showLegend?: boolean;
  /** Mise en forme des valeurs — montants, pourcentages. */
  format?: (value: number) => string;
  /** Rend le graphique muet : ni survol, ni infobulle. */
  readOnly?: boolean;
  caption?: ReactNode;
  className?: string;
}

const TONE_VAR: Record<ComponentTone, string> = {
  primary: "var(--sia-primary)",
  neutral: "var(--sia-muted)",
  info: "var(--sia-info)",
  success: "var(--sia-success)",
  warning: "var(--sia-warning)",
  danger: "var(--sia-danger)",
};

/** La palette de secours, dans l'ordre d'apparition des séries. */
const PALETTE: ComponentTone[] = [
  "primary",
  "info",
  "success",
  "warning",
  "danger",
  "neutral",
];

// L'espace de coordonnées est fixe : 100 unités de large, `VIEW_H` de haut.
// Le SVG est ensuite étiré à la largeur disponible. `vector-effect` garde les
// traits à leur épaisseur réelle malgré l'étirement — c'est ce qui permet de
// ne jamais mesurer le conteneur.
const VIEW_W = 100;
const VIEW_H = 100;

function colorOf(series: ChartSeries, index: number) {
  if (series.color) return series.color;
  return TONE_VAR[series.tone ?? PALETTE[index % PALETTE.length]!];
}

/**
 * Un graphique sans dépendance.
 *
 * Il couvre les trois formes qui reviennent dans un tableau de bord — courbe,
 * aire, barres — et rien d'autre. `recharts` reste le bon choix dès qu'il
 * faut des axes secondaires, du zoom ou des annotations; il pèse alors 90 ko
 * qu'un projet choisit d'ajouter plutôt que de subir.
 */
export function Chart({
  series,
  labels = [],
  type = "line",
  height = 220,
  min: minProp,
  max: maxProp,
  showGrid = true,
  showAxis = true,
  showLegend = true,
  format = (value) => String(value),
  readOnly = false,
  caption,
  className,
}: ChartProps) {
  const gradientId = useId();
  const [hover, setHover] = useState<number | null>(null);

  const points = Math.max(...series.map((entry) => entry.values.length), 0);

  const { min, max } = useMemo(() => {
    const all = series
      .flatMap((entry) => entry.values)
      .filter((value): value is number => value !== null);
    if (all.length === 0) return { min: 0, max: 1 };

    const low = minProp ?? Math.min(0, ...all);
    const high = maxProp ?? Math.max(...all);
    // Un maximum égal au minimum donnerait une division par zéro; une marge
    // de 1 aplatit la courbe au milieu plutôt que de la faire disparaître.
    return { min: low, max: high === low ? low + 1 : high };
  }, [maxProp, minProp, series]);

  const scaleY = (value: number) =>
    VIEW_H - ((value - min) / (max - min)) * VIEW_H;
  // La position horizontale d'un point, de 0 à 1. Le SVG la veut en unités
  // de son viewBox, les repères HTML en pourcentage : une seule source.
  const ratioX = (index: number) => (points <= 1 ? 0.5 : index / (points - 1));
  const scaleX = (index: number) => ratioX(index) * VIEW_W;

  const paths = useMemo(
    () =>
      series.map((entry) => {
        const segments: string[] = [];
        let open = false;

        entry.values.forEach((value, index) => {
          if (value === null) {
            // Un trou dans les données coupe le trait au lieu de le tirer
            // d'un point à l'autre : une ligne droite sur une semaine
            // manquante se lirait comme une mesure.
            open = false;
            return;
          }
          const x = scaleX(index);
          const y = scaleY(value);
          segments.push(`${open ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`);
          open = true;
        });

        return segments.join(" ");
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [series, min, max, points],
  );

  const gridLines = [0, 0.25, 0.5, 0.75, 1];

  const handleMove = (event: MouseEvent<SVGSVGElement>) => {
    if (readOnly || points === 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    setHover(
      Math.min(points - 1, Math.max(0, Math.round(ratio * (points - 1)))),
    );
  };

  return (
    <figure
      className={cn(
        "sia-chart",
        `sia-chart--${type}`,
        !showAxis && "sia-chart--no-axis",
        className,
      )}
    >
      {/* Une grille plutôt qu'une rangée : la colonne des valeurs se
          dimensionne sur son contenu, et les libellés du bas se placent
          sous le tracé — pas sous l'ensemble. Alignés sur la rangée
          entière, ils étaient décalés de la largeur de cette colonne. */}
      <div
        className="sia-chart__frame"
        style={{ ["--sia-chart-height" as string]: `${height}px` }}
      >
        {showAxis && (
          <div className="sia-chart__axis-y" aria-hidden="true">
            {[max, (max + min) / 2, min].map((value, index) => (
              <span key={index}>{format(value)}</span>
            ))}
          </div>
        )}

        <div className="sia-chart__canvas">
          <svg
            className="sia-chart__svg"
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            // L'étirement non uniforme est assumé : c'est ce qui évite de
            // mesurer le conteneur et de re-rendre à chaque redimensionnement.
            preserveAspectRatio="none"
            role="img"
            {...(caption && typeof caption === "string"
              ? { "aria-label": caption }
              : {})}
            onMouseMove={handleMove}
            onMouseLeave={() => setHover(null)}
          >
            <defs>
              {/* Le volet qui découvre le tracé, de la gauche vers la
                droite. Les tirets ne conviennent pas ici :
                `vector-effect="non-scaling-stroke"` fait calculer le
                pointillé en pixels écran, ce qui rend la normalisation
                par `pathLength` sans effet — la courbe sort hachurée. */}
              <clipPath
                id={`${gradientId}-reveal`}
                clipPathUnits="objectBoundingBox"
              >
                <rect className="sia-chart__reveal" width="1" height="1" />
              </clipPath>
              {series.map((entry, index) => (
                <linearGradient
                  key={entry.key}
                  id={`${gradientId}-${index}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={colorOf(entry, index)}
                    stopOpacity=".28"
                  />
                  <stop
                    offset="100%"
                    stopColor={colorOf(entry, index)}
                    stopOpacity="0"
                  />
                </linearGradient>
              ))}
            </defs>

            {showGrid &&
              gridLines.map((ratio) => (
                <line
                  key={ratio}
                  className="sia-chart__grid"
                  x1="0"
                  x2={VIEW_W}
                  y1={ratio * VIEW_H}
                  y2={ratio * VIEW_H}
                  vectorEffect="non-scaling-stroke"
                />
              ))}

            {type === "bar"
              ? series.map((entry, seriesIndex) => {
                  const slot = points > 0 ? VIEW_W / points : VIEW_W;
                  const width = (slot * 0.7) / series.length;
                  return (
                    <g key={entry.key} fill={colorOf(entry, seriesIndex)}>
                      {entry.values.map((value, index) =>
                        value === null ? null : (
                          <rect
                            key={index}
                            className="sia-chart__bar"
                            x={index * slot + slot * 0.15 + seriesIndex * width}
                            y={scaleY(value)}
                            width={width}
                            height={Math.max(0, VIEW_H - scaleY(value))}
                            data-active={index === hover || undefined}
                            style={{
                              // Les barres poussent l'une après l'autre, de la
                              // gauche vers la droite, comme on les lit.
                              animationDelay: `${Math.min(index, 24) * 30}ms`,
                            }}
                          />
                        ),
                      )}
                    </g>
                  );
                })
              : series.map((entry, index) => (
                  <g key={entry.key} clipPath={`url(#${gradientId}-reveal)`}>
                    {type === "area" && paths[index] && (
                      <path
                        className="sia-chart__area"
                        d={`${paths[index]} L${VIEW_W} ${VIEW_H} L0 ${VIEW_H} Z`}
                        fill={`url(#${gradientId}-${index})`}
                      />
                    )}
                    <path
                      className="sia-chart__line"
                      d={paths[index] ?? ""}
                      fill="none"
                      stroke={colorOf(entry, index)}
                      vectorEffect="non-scaling-stroke"
                    />
                  </g>
                ))}

            {hover !== null && type !== "bar" && (
              <line
                className="sia-chart__cursor"
                x1={scaleX(hover)}
                x2={scaleX(hover)}
                y1="0"
                y2={VIEW_H}
                vectorEffect="non-scaling-stroke"
              />
            )}
          </svg>

          {/* Les repères sont des éléments HTML, pas des cercles SVG.

            Le viewBox est étiré horizontalement — c'est ce qui évite de
            mesurer le conteneur — et cet étirement déforme la géométrie :
            un cercle y devient une ellipse. `vector-effect` protège
            l'épaisseur du trait, jamais la forme. Posés au-dessus en
            pourcentage, les repères restent ronds à toute largeur. */}
          {hover !== null &&
            type !== "bar" &&
            series.map((entry, index) => {
              const value = entry.values[hover];
              if (value === null || value === undefined) return null;
              return (
                <span
                  key={entry.key}
                  className="sia-chart__point"
                  style={{
                    left: `${ratioX(hover) * 100}%`,
                    top: `${(scaleY(value) / VIEW_H) * 100}%`,
                    background: colorOf(entry, index),
                  }}
                  aria-hidden="true"
                />
              );
            })}

          {hover !== null && !readOnly && (
            <div
              className="sia-chart__tooltip"
              style={{ left: `${ratioX(hover) * 100}%` }}
              // Aux deux extrémités, une infobulle centrée sort du cadre.
              // Elle s'accroche alors par son bord au lieu de son milieu.
              data-align={
                ratioX(hover) < 0.15
                  ? "start"
                  : ratioX(hover) > 0.85
                    ? "end"
                    : undefined
              }
              role="status"
            >
              {labels[hover] && (
                <strong className="sia-chart__tooltip-title">
                  {labels[hover]}
                </strong>
              )}
              {series.map((entry, index) => {
                const value = entry.values[hover];
                if (value === null || value === undefined) return null;
                return (
                  <span key={entry.key} className="sia-chart__tooltip-row">
                    <span
                      className="sia-chart__dot"
                      style={{ background: colorOf(entry, index) }}
                    />
                    {entry.label && <span>{entry.label}</span>}
                    <b>{format(value)}</b>
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {showAxis && labels.length > 0 && (
          <div className="sia-chart__axis-x" aria-hidden="true">
            {labels.map((label, index) => (
              <span key={index} data-active={index === hover || undefined}>
                {label}
              </span>
            ))}
          </div>
        )}
      </div>

      {showLegend && series.some((entry) => entry.label) && (
        <figcaption className="sia-chart__legend">
          {series.map((entry, index) => (
            <span key={entry.key}>
              <span
                className="sia-chart__dot"
                style={{ background: colorOf(entry, index) }}
              />
              {entry.label}
            </span>
          ))}
        </figcaption>
      )}

      {caption && typeof caption !== "string" && (
        <figcaption className="sia-chart__caption">{caption}</figcaption>
      )}
    </figure>
  );
}

export interface SparklineProps {
  values: Array<number | null>;
  tone?: ComponentTone;
  color?: string;
  width?: number | string;
  height?: number;
  /** Ajoute l'aire sous la courbe. */
  filled?: boolean;
  className?: string;
}

/**
 * Une courbe minuscule, sans axes ni survol.
 *
 * Elle tient dans une cellule de tableau ou une carte de statistique, là où
 * un graphique complet ne rentrerait pas.
 */
export function Sparkline({
  values,
  tone = "primary",
  color,
  width = "100%",
  height = 32,
  filled = false,
  className,
}: SparklineProps) {
  return (
    <span className={cn("sia-sparkline", className)} style={{ width, height }}>
      <Chart
        series={[{ key: "spark", values, ...(color ? { color } : { tone }) }]}
        type={filled ? "area" : "line"}
        height={height}
        showGrid={false}
        showAxis={false}
        showLegend={false}
        readOnly
      />
    </span>
  );
}
