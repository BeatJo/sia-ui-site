import type { ReactNode } from "react";
import { Autocomplete, type AutocompleteProps } from "../Autocomplete";
import type { SelectOption } from "../Select";
import "./styles.css";
export interface ReferenceOption extends SelectOption { description?: ReactNode; }
export interface ReferenceSelectProps extends Omit<AutocompleteProps, "options"> { options: ReferenceOption[]; }
/**
 * Un choix parmi des objets métier, pas parmi des mots.
 *
 * Chaque option porte une description : deux clients peuvent s'appeler
 * « Entreprise Alpha », et seule la ligne en dessous — la ville, le numéro
 * de compte — dit lequel on vise.
 */
export function ReferenceSelect({ options, ...props }: ReferenceSelectProps) { return <Autocomplete {...props} options={options.map((option) => ({ ...option, label: <span className="sia-reference-select__option"><strong>{option.label}</strong>{option.description && <small>{option.description}</small>}</span> }))} />; }
