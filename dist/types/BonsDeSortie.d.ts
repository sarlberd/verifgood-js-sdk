/**
 * Service for managing outbound orders/goods issue (bons de sortie) - Type definitions
 */
export interface BonsDeSorti {
    id?: string;
    numero?: string;
    statut?: string;
    date_creation?: string;
}
/**
 * Request interface for creating BonsDeSorti
 */
export interface BonsDeSortiCreateRequest {
    numero?: string;
    statut?: string;
    date_creation?: string;
}
/**
 * Request interface for updating BonsDeSorti
 */
export interface BonsDeSortiUpdateRequest {
    numero?: string;
    statut?: string;
    date_creation?: string;
}
