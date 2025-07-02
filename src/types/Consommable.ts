/**
 * Service for managing consommables (consumables) inventory and operations - Type definitions
 */
export interface Consommabl {
    name?: string;
    nature?: string;
    refExterne?: string;
    marque?: string;
    coutUnitaire?: number;
    quantite?: number;
    quantiteMin?: number;
    numSerie?: string;
    commentaire?: string;
}

/**
 * Request interface for creating Consommabl
 */
export interface ConsommablCreateRequest {
    name?: string;
    nature?: string;
    refExterne?: string;
    marque?: string;
    coutUnitaire?: number;
    quantite?: number;
    quantiteMin?: number;
    numSerie?: string;
    commentaire?: string;
}

/**
 * Request interface for updating Consommabl
 */
export interface ConsommablUpdateRequest {
    name?: string;
    nature?: string;
    refExterne?: string;
    marque?: string;
    coutUnitaire?: number;
    quantite?: number;
    quantiteMin?: number;
    numSerie?: string;
    commentaire?: string;
}
