/**
 * Service for managing groupe validateurs - Type definitions
 */
export interface GroupeValidateur {
    id?: string;
    name?: string;
    description?: string;
}

/**
 * Request interface for creating GroupeValidateur
 */
export interface GroupeValidateurCreateRequest {
    name?: string;
    description?: string;
}

/**
 * Request interface for updating GroupeValidateur
 */
export interface GroupeValidateurUpdateRequest {
    name?: string;
    description?: string;
}
