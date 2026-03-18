/**
 * Document attached to a bon d'entrée
 */
export interface BonDentreeDocument {
    id: number;
    uploadedTo: string;
    name: string;
    size: string;
    extension: string;
}

/**
 * Consommable (consumable) item in a bon d'entrée
 */
export interface BonDentreeConsommable {
    consommable_mouvement_id: number;
    quantite: number;
    consommable_id: number;
    consommable_name: string;
    consommable_refExterne: string | null;
    consommable_marque: string | null;
    consommable_numSerie: string | null;
    consommable_commentaire: string | null;
    consommable_coutUnitaire: string;
    consommable_unite: string;
    consommable_statut: string | null;
    consommable_uid: string;
    consommable_created_at: string;
    consommable_updated_at: string;
    consommable_conditionnementColisage: string | null;
    consommable_quantiteColisage: string | null;
}

/**
 * Service for managing goods receipt/inbound orders (bons d'entrée) - Type definitions
 */
export interface BonsDentre {
    id?: number;
    numero?: string;
    description?: string;
    dateCreation?: string;
    fournisseur_id?: number;
    createur_id?: number;
    uid?: string;
    userId?: string;
    created_at?: string;
    updated_at?: string;
    createur_nom?: string;
    createur_prenom?: string;
    createur_email?: string;
    fournisseur_name?: string;
    fournisseur_type?: string;
    fournisseur_address?: string;
    fournisseur_uid?: string;
    documents?: BonDentreeDocument[];
    consommables?: BonDentreeConsommable[];
    statut?: string;
    date_creation?: string;
}

/**
 * Response interface for getting a single BonDentree by ID
 */
export interface BonDentreeDetailResponse {
    data: BonsDentre;
}

/**
 * Request interface for creating BonsDentre
 */
export interface BonsDentreCreateRequest {
    numero?: string;
    description?: string;
    dateCreation?: string;
    fournisseur_id?: number;
    statut?: string;
    date_creation?: string;
}

/**
 * Request interface for updating BonsDentre
 */
export interface BonsDentreUpdateRequest {
    numero?: string;
    description?: string;
    dateCreation?: string;
    fournisseur_id?: number;
    statut?: string;
    date_creation?: string;
}
