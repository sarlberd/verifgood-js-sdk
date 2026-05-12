/**
 * Service for managing purchase orders (bons de commande) - Type definitions
 */
export interface BonsDeCommand {
    id?: string;
    numero?: string;
    statut?: string;
    statutLivraison?: string;
    statutPaiement?: string;
    dateCreation?: string;
}
/**
 * Request interface for creating BonsDeCommand
 */
export interface BonsDeCommandCreateRequest {
    numero?: string;
    statut?: string;
    statutLivraison?: string;
    statutPaiement?: string;
    dateCreation?: string;
}
/**
 * Request interface for updating BonsDeCommand
 */
export interface BonsDeCommandUpdateRequest {
    numero?: string;
    statut?: string;
    statutLivraison?: string;
    statutPaiement?: string;
    dateCreation?: string;
}
