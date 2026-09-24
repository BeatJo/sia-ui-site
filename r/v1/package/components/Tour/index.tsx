import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@sia-ui/utils";
import "./styles.css";

export interface TourStep { target: string; title: ReactNode; description?: ReactNode; }
export interface TourProps { open: boolean; onOpenChange: (open: boolean) => void; steps: TourStep[]; initialStep?: number; onStepChange?: (step: number) => void; className?: string; }
/**
 * Une visite guidée de l'écran.
 *
 * Chaque étape vise un élément par son sélecteur plutôt que par une
 * référence : une visite se déclare souvent loin des composants qu'elle
 * montre, et parfois avant qu'ils n'existent.
 */
export function Tour({ open, onOpenChange, steps, initialStep = 0, onStepChange, className }: TourProps) { const [index, setIndex] = useState(initialStep); useEffect(() => { if (open) setIndex(initialStep); }, [open, initialStep]); useEffect(() => { if (!open) return; const target = document.querySelector<HTMLElement>(steps[index]?.target ?? ""); target?.scrollIntoView({ block: "center", behavior: "smooth" }); target?.setAttribute("data-sia-tour-active", "true"); return () => target?.removeAttribute("data-sia-tour-active"); }, [open, index, steps]); if (!open || typeof document === "undefined" || steps.length === 0) return null; const step = steps[index]; const move = (next: number) => { if (next >= steps.length) { onOpenChange(false); return; } setIndex(next); onStepChange?.(next); }; return createPortal(<div className="sia-tour-backdrop"><section className={cn("sia-tour", className)} role="dialog" aria-modal="true"><small>{index + 1} / {steps.length}</small><h2>{step?.title}</h2>{step?.description && <p>{step.description}</p>}<footer><button type="button" onClick={() => onOpenChange(false)}>Fermer</button><button type="button" disabled={index === 0} onClick={() => move(index - 1)}>Précédent</button><button type="button" onClick={() => move(index + 1)}>{index === steps.length - 1 ? "Terminer" : "Suivant"}</button></footer></section></div>, document.body); }
