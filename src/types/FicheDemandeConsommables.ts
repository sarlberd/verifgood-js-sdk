/**
 * Service for managing fiche demande consommables - Type definitions
 */
export interface FicheDemandeConsommable {
    id?: string;
    dateCloture?: string;
    status?: string;
}

/**
 * Request interface for creating FicheDemandeConsommable
 */
export interface FicheDemandeConsommableCreateRequest {
    dateCloture?: string;
    status?: string;
}

/**
 * Request interface for updating FicheDemandeConsommable
 */
export interface FicheDemandeConsommableUpdateRequest {
    dateCloture?: string;
    status?: string;
}
