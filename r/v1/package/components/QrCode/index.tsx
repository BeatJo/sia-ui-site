import { type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";

export interface QRCodeProps { value: string; size?: number; label?: string; render?: (value: string, size: number) => ReactNode; className?: string; }
/**
 * Un code à scanner.
 *
 * Le rendu est délégué à `render` : embarquer un encodeur ajouterait une
 * dépendance à tous ceux qui ne s'en servent pas, alors que les projets qui
 * en ont besoin ont déjà le leur.
 */
export function QRCode({ value, size = 160, label = "Code QR", render, className }: QRCodeProps) { return <figure className={cn("sia-qr-code", className)} aria-label={label} style={{ width: size }}><div className="sia-qr-code__frame" style={{ width: size, height: size }}>{render ? render(value, size) : <div className="sia-qr-code__adapter"><strong>QR</strong><span>Encodeur requis</span></div>}</div><figcaption>{value}</figcaption></figure>; }
