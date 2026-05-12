/**
 * Service for managing statistics (maintenance and verification) - Type definitions
 */
export interface Statistique {
    id?: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
}

/**
 * Request interface for creating Statistique
 */
export interface StatistiqueCreateRequest {
    name: string;
}

/**
 * Request interface for updating Statistique
 */
export interface StatistiqueUpdateRequest {
    name?: string;
}
