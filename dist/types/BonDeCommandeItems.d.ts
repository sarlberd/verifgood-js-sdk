/**
 * Service for managing purchase order items (bon de commande items) - Type definitions
 */
export interface BonDeCommandeItem {
    id?: string;
    bon_de_commande_id?: string;
    quantiteLivree?: number;
    uid?: string;
}
/**
 * Request interface for creating BonDeCommandeItem
 */
export interface BonDeCommandeItemCreateRequest {
    bon_de_commande_id?: string;
    quantiteLivree?: number;
    uid?: string;
}
/**
 * Request interface for updating BonDeCommandeItem
 */
export interface BonDeCommandeItemUpdateRequest {
    bon_de_commande_id?: string;
    quantiteLivree?: number;
    uid?: string;
}
