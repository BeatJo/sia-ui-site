import { type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import "./styles.css";

export interface AuthLayoutProps {
  title: ReactNode;
  description?: ReactNode;
  logo?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}
/**
 * La page qui précède l'application : connexion, inscription, mot de passe
 * oublié.
 *
 * Elle n'a ni navigation ni coquille, et c'est délibéré : tout ce qui mène
 * ailleurs est hors de portée de quelqu'un qui n'est pas encore entré.
 */
export function AuthLayout({
  title,
  description,
  logo,
  aside,
  children,
  footer,
  className,
}: AuthLayoutProps) {
  return (
    <main className={cn("sia-auth-layout", className)}>
      {aside && <aside>{aside}</aside>}
      <section>
        <div className="sia-auth-layout__card">
          {logo}
          <header>
            <h1>{title}</h1>
            {description && <p>{description}</p>}
          </header>
          {children}
          {footer && <footer>{footer}</footer>}
        </div>
      </section>
    </main>
  );
}
