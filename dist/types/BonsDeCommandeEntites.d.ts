/**
 * Service for managing purchase order entities (bons de commande entites) - Type definitions
 */
export interface BonsDeCommandeEntite {
    id?: string;
    bon_de_commande_id?: string;
    entite_id?: string;
}
/**
 * Request interface for creating BonsDeCommandeEntite
 */
export interface BonsDeCommandeEntiteCreateRequest {
    bon_de_commande_id?: string;
    entite_id?: string;
}
/**
 * Request interface for updating BonsDeCommandeEntite
 */
export interface BonsDeCommandeEntiteUpdateRequest {
    bon_de_commande_id?: string;
    entite_id?: string;
}
