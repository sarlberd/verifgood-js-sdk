/**
 * Service for managing libel problems - Type definitions
 */
export interface LibelProble {
    id?: string;
    libelle?: string;
    composant_id?: string;
    categorie_id?: string;
}
/**
 * Request interface for creating LibelProble
 */
export interface LibelProbleCreateRequest {
    libelle?: string;
    composant_id?: string;
    categorie_id?: string;
}
/**
 * Request interface for updating LibelProble
 */
export interface LibelProbleUpdateRequest {
    libelle?: string;
    composant_id?: string;
    categorie_id?: string;
}
