/**
 * Service for managing contacts - Type definitions
 */
export interface Contac {
    id?: string;
    nom?: string;
    prenom?: string;
    email?: string;
    telephone?: string;
}

/**
 * Request interface for creating Contac
 */
export interface ContacCreateRequest {
    nom?: string;
    prenom?: string;
    email?: string;
    telephone?: string;
}

/**
 * Request interface for updating Contac
 */
export interface ContacUpdateRequest {
    nom?: string;
    prenom?: string;
    email?: string;
    telephone?: string;
}
