/**
 * Service for managing composants and their associations - Type definitions
 */
export interface Composan {
    name?: string;
    description?: string;
    icon?: string;
    categorie_id?: number;
}
/**
 * Request interface for creating Composan
 */
export interface ComposanCreateRequest {
    name?: string;
    description?: string;
    icon?: string;
    categorie_id?: number;
}
/**
 * Request interface for updating Composan
 */
export interface ComposanUpdateRequest {
    name?: string;
    description?: string;
    icon?: string;
    categorie_id?: number;
}
/**
 * Icon interface for composant icons
 */
export interface ComposantIcon {
    label: string;
    src: string;
}
/**
 * Libel problem interface
 */
export interface LibelProblem {
    id?: number;
    libel_composant?: string;
    description?: string;
    composant?: number;
    libelle?: string;
}
/**
 * Composant association interface
 */
export interface ComposantAssociation {
    composant: number;
    libelle: string;
    userId?: number;
}
