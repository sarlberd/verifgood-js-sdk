/**
 * MouvementEquipement interface representing an equipment movement
 */
export interface MouvementEquipement {
    id?: string | number;
    type?: string;
    date?: string;
    description?: string;
    equipement_id?: string | number;
    user_id?: string | number;
    lieu_origine_id?: string | number;
    lieu_destination_id?: string | number;
    quantite?: number;
    statut?: string;
    observations?: string;
    created_at?: string;
    updated_at?: string;
}
/**
 * MouvementEquipementCreateRequest interface for creating equipment movements
 */
export interface MouvementEquipementCreateRequest {
    type: string;
    description?: string;
    equipement_id: string | number;
    user_id?: string | number;
    lieu_origine_id?: string | number;
    lieu_destination_id?: string | number;
    quantite?: number;
    observations?: string;
}
/**
 * MouvementEquipementUpdateRequest interface for updating equipment movements
 */
export interface MouvementEquipementUpdateRequest {
    id: string | number;
    type?: string;
    description?: string;
    equipement_id?: string | number;
    user_id?: string | number;
    lieu_origine_id?: string | number;
    lieu_destination_id?: string | number;
    quantite?: number;
    statut?: string;
    observations?: string;
}
/**
 * Signataire interface for movement signatories
 */
export interface Signataire {
    id: string | number;
    nom: string;
    prenom: string;
    email?: string;
    type: 'receveur' | 'donneur';
}
/**
 * Export options for movement data
 */
export interface MovementExportOptions {
    filename?: string;
    fileExtension?: 'xlsx' | 'csv';
    sites?: string;
}
