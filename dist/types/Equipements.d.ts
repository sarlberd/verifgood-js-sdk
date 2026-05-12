/**
 * Service for managing equipment - Type definitions
 */
export interface Equipement {
    id?: string;
    libel_equipement?: string;
    categorie?: string;
    posX?: number;
    posY?: number;
    marker?: any;
    miseEnService?: string;
    tauxDepreciationAnnuel?: number;
    valeurAchat?: number;
    created_at?: string;
}
/**
 * Request interface for creating Equipement
 */
export interface EquipementCreateRequest {
    libel_equipement?: string;
    categorie?: string;
    posX?: number;
    posY?: number;
    marker?: any;
    miseEnService?: string;
    tauxDepreciationAnnuel?: number;
    valeurAchat?: number;
    created_at?: string;
}
/**
 * Request interface for updating Equipement
 */
export interface EquipementUpdateRequest {
    libel_equipement?: string;
    categorie?: string;
    posX?: number;
    posY?: number;
    marker?: any;
    miseEnService?: string;
    tauxDepreciationAnnuel?: number;
    valeurAchat?: number;
    created_at?: string;
}
