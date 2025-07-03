/**
 * Service for managing goods receipt/inbound orders (bons d&#39;entrée) - Type definitions
 */
export interface BonsDentre {
    id?: string;
    numero?: string;
    statut?: string;
    date_creation?: string;
}
/**
 * Request interface for creating BonsDentre
 */
export interface BonsDentreCreateRequest {
    numero?: string;
    statut?: string;
    date_creation?: string;
}
/**
 * Request interface for updating BonsDentre
 */
export interface BonsDentreUpdateRequest {
    numero?: string;
    statut?: string;
    date_creation?: string;
}
