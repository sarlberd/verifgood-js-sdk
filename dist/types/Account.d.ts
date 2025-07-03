/**
 * Service for managing user accounts - Type definitions
 */
export interface Accoun {
    address?: string;
    immatriculation?: string;
    id?: string;
}
/**
 * Request interface for creating Accoun
 */
export interface AccounCreateRequest {
    address?: string;
    immatriculation?: string;
}
/**
 * Request interface for updating Accoun
 */
export interface AccounUpdateRequest {
    address?: string;
    immatriculation?: string;
}
