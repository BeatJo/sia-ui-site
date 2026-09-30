import { useId, useMemo, useState, type ReactNode } from "react";
import { cn } from "@sia-ui/utils";
import { formatMessage, useSiaLocale } from "@sia-ui/headless";
import { Button, type ButtonProps } from "../Button";
import { IconButton, type IconButtonProps } from "../IconButton";
import { Input, type InputProps } from "../Input";
import { PasswordInput, type PasswordInputProps } from "../PasswordInput";
import { PlusIcon, TrashIcon } from "../Icons";
import "./styles.css";

/** Une paire nom / valeur. La valeur n'est jamais relue du serveur. */
export interface SecretEntry {
  key: string;
  value: string;
}

export interface SecretFieldsProps {
  value?: SecretEntry[];
  defaultValue?: SecretEntry[];
  onValueChange?: (entries: SecretEntry[]) => void;
  /**
   * Les noms déjà enregistrés côté serveur.
   *
   * Affichés, mais leur valeur reste vide : un secret ne revient jamais au
   * navigateur. Une valeur laissée vide sur l'un d'eux veut dire « inchangé » ;
   * en saisir une, c'est le remplacer — une rotation.
   */
  storedKeys?: string[];
  /** Des noms proposés d'un clic : `DATABASE_URL`, `API_KEY`… */
  templates?: string[];
  /** La forme d'un nom valide. Par défaut, aucune contrainte. */
  keyPattern?: RegExp;
  /** Les libellés ci-dessous viennent par défaut du groupe `secretFields` de la locale. */
  keyPatternMessage?: string;
  keyLabel?: string;
  valueLabel?: string;
  addLabel?: ReactNode;
  disabled?: boolean;
  className?: string;
  /**
   * Le bouton d'ajout : variante, taille, icône, classe. Son libellé passe
   * par `addLabel`.
   */
  addButtonProps?: Partial<Omit<ButtonProps, "onClick" | "children" | "disabled">>;
  /**
   * Le bouton qui retire une ligne : icône, variante, taille.
   *
   * Son nom reste calculé ligne par ligne — « Retirer API_KEY » — pour que
   * chaque bouton dise lequel il retire.
   */
  removeButtonProps?: Partial<
    Omit<IconButtonProps, "onClick" | "label" | "disabled">
  >;
  /**
   * Le champ du nom : placeholder, taille, classe.
   *
   * La valeur, la saisie et l'état d'erreur, avec son `aria-describedby`,
   * restent calculés par ligne.
   */
  keyInputProps?: Partial<
    Omit<
      InputProps,
      "value" | "defaultValue" | "onChange" | "disabled" | "invalid" | "aria-describedby"
    >
  >;
  /**
   * Le champ de la valeur : placeholder, jauge, classe.
   *
   * Pas d'`autoComplete` : `new-password` est ce qui empêche le navigateur
   * de proposer le mot de passe du compte à la place du secret.
   */
  valueInputProps?: Partial<
    Omit<
      PasswordInputProps,
      "value" | "defaultValue" | "onChange" | "disabled" | "autoComplete"
    >
  >;
}

/** Les valeurs effacées, les noms gardés — ce qu'on affiche après l'envoi. */
export function clearSecretValues(entries: SecretEntry[]): SecretEntry[] {
  return entries.map((entry) => ({ ...entry, value: "" }));
}

/**
 * Des secrets en écriture seule : les noms se lisent, les valeurs jamais.
 *
 * Chaque ligne est un nom et une valeur masquée. Les noms déjà enregistrés
 * s'affichent sans leur valeur — le serveur ne la renvoie pas, et ne doit pas
 * la renvoyer. Les champs refusent l'autocomplétion du navigateur, qui
 * proposerait sinon le mot de passe du compte à la place d'une clé d'API.
 *
 * Après l'envoi, `clearSecretValues` vide les valeurs : un secret ne reste pas
 * affiché dans un formulaire ouvert.
 */
export function SecretFields({
  value,
  defaultValue,
  onValueChange,
  storedKeys = [],
  templates = [],
  keyPattern,
  keyPatternMessage: keyPatternMessageProp,
  keyLabel: keyLabelProp,
  valueLabel: valueLabelProp,
  addLabel: addLabelProp,
  disabled = false,
  className,
  addButtonProps,
  removeButtonProps,
  keyInputProps,
  valueInputProps,
}: SecretFieldsProps) {
  const m = useSiaLocale().secretFields;
  const keyPatternMessage = keyPatternMessageProp ?? m.invalidKey;
  const keyLabel = keyLabelProp ?? m.keyLabel;
  const valueLabel = valueLabelProp ?? m.valueLabel;
  const addLabel = addLabelProp ?? m.add;
  const id = useId();
  const [interne, setInterne] = useState<SecretEntry[]>(
    () => defaultValue ?? storedKeys.map((key) => ({ key, value: "" })),
  );
  const lignes = value ?? interne;
  const enregistres = useMemo(() => new Set(storedKeys), [storedKeys]);

  const changer = (suivantes: SecretEntry[]) => {
    if (value === undefined) setInterne(suivantes);
    onValueChange?.(suivantes);
  };

  /** Un doublon ou un nom mal formé, ligne par ligne. */
  const erreurs = useMemo(() => {
    const vus = new Map<string, number>();
    for (const ligne of lignes) {
      const nom = ligne.key.trim();
      if (nom) vus.set(nom, (vus.get(nom) ?? 0) + 1);
    }
    return lignes.map((ligne) => {
      const nom = ligne.key.trim();
      if (!nom) return undefined;
      if ((vus.get(nom) ?? 0) > 1) return m.duplicateKey;
      if (keyPattern && !keyPattern.test(nom)) return keyPatternMessage;
      return undefined;
    });
  }, [keyPattern, keyPatternMessage, lignes, m]);

  const presents = new Set(lignes.map((ligne) => ligne.key.trim()));
  const proposes = templates.filter((nom) => !presents.has(nom));

  const modifier = (index: number, patch: Partial<SecretEntry>) =>
    changer(lignes.map((ligne, i) => (i === index ? { ...ligne, ...patch } : ligne)));

  return (
    <div className={cn("sia-secrets", className)}>
      {lignes.length > 0 && (
        <div className="sia-secrets__head" aria-hidden="true">
          <span>{keyLabel}</span>
          <span>{valueLabel}</span>
        </div>
      )}

      {lignes.map((ligne, index) => {
        const erreur = erreurs[index];
        const garde = enregistres.has(ligne.key.trim());
        const idErreur = `${id}-erreur-${index}`;

        return (
          <div className="sia-secrets__row" key={index}>
            <div className="sia-secrets__key">
              <Input
                aria-label={`${keyLabel} ${index + 1}`}
                placeholder={m.keyPlaceholder}
                autoComplete="off"
                spellCheck={false}
                {...keyInputProps}
                value={ligne.key}
                disabled={disabled}
                invalid={Boolean(erreur)}
                {...(erreur ? { "aria-describedby": idErreur } : {})}
                onChange={(event) => modifier(index, { key: event.target.value })}
              />
              {erreur && (
                <span id={idErreur} className="sia-secrets__error" role="alert">
                  {erreur}
                </span>
              )}
            </div>

            <PasswordInput
              aria-label={`${valueLabel} ${ligne.key || index + 1}`}
              placeholder={garde ? m.unchangedPlaceholder : valueLabel}
              spellCheck={false}
              {...valueInputProps}
              value={ligne.value}
              // `new-password` : le seul réglage que les navigateurs
              // respectent pour ne pas proposer un mot de passe enregistré.
              autoComplete="new-password"
              disabled={disabled}
              onChange={(event) => modifier(index, { value: event.target.value })}
            />

            <IconButton
              icon={<TrashIcon />}
              variant="ghost"
              {...removeButtonProps}
              label={formatMessage(m.removeRow, { name: ligne.key || m.unnamedRow })}
              disabled={disabled}
              onClick={() => changer(lignes.filter((_, i) => i !== index))}
            />
          </div>
        );
      })}

      <div className="sia-secrets__footer">
        <Button
          type="button"
          variant="outline"
          size="sm"
          leftIcon={<PlusIcon />}
          {...addButtonProps}
          disabled={disabled}
          onClick={() => changer([...lignes, { key: "", value: "" }])}
        >
          {addLabel}
        </Button>

        {proposes.length > 0 && (
          <div className="sia-secrets__templates">
            {proposes.map((nom) => (
              <button
                key={nom}
                type="button"
                className="sia-secrets__template"
                disabled={disabled}
                onClick={() => changer([...lignes, { key: nom, value: "" }])}
              >
                <PlusIcon aria-hidden="true" />
                {nom}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** Ce qu'il faut envoyer au serveur après une saisie dans `SecretFields`. */
export interface SecretChanges {
  /** À créer ou à remplacer (rotation) : nom → nouvelle valeur. */
  set: Record<string, string>;
  /** Noms enregistrés retirés de la liste : à supprimer. */
  remove: string[];
  /**
   * Noms nouveaux restés sans valeur. Rien à envoyer pour eux — mais les
   * ignorer sans le dire perdrait une saisie : à signaler avant l'envoi.
   */
  missing: string[];
}

/**
 * Ce qui change, calculé une fois pour tous les projets.
 *
 * Un nom enregistré laissé vide est inchangé ; saisi, il est remplacé. Un nom
 * enregistré absent de la liste est à supprimer — y compris quand il a été
 * renommé : l'ancien part, le nouveau arrive avec sa valeur. Les lignes sans
 * nom sont ignorées ; un nom en double garde sa dernière valeur saisie.
 *
 * ```ts
 * const { set, remove, missing } = secretChanges(secrets, enregistres);
 * if (missing.length) return; // à compléter
 * await api.patch(`/projets/${id}/secrets`, { body: { set, remove } });
 * setSecrets(clearSecretValues(secrets));
 * ```
 */
export function secretChanges(
  entries: SecretEntry[],
  storedKeys: string[] = [],
): SecretChanges {
  const enregistres = new Set(storedKeys);
  const presents = new Set<string>();
  const set: Record<string, string> = {};
  const missing: string[] = [];

  for (const { key, value } of entries) {
    const nom = key.trim();
    if (!nom) continue;
    presents.add(nom);
    if (value !== "") set[nom] = value;
    else if (!enregistres.has(nom) && !missing.includes(nom)) missing.push(nom);
  }

  // Un nom saisi plus loin avec une valeur n'est plus manquant.
  return {
    set,
    remove: storedKeys.filter((nom) => !presents.has(nom)),
    missing: missing.filter((nom) => !(nom in set)),
  };
}
