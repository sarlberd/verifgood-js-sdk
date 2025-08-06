/**
 * Service for managing inventaires - Type definitions
 */
export interface Inventair {
    id?: string;
    inventaire_id?: string;
    lieu_id?: string;
    equipements_id?: string;
    path?: string;
}
/**
 * Request interface for creating Inventair
 */
export interface InventairCreateRequest {
    inventaire_id?: string;
    lieu_id?: string;
    equipements_id?: string;
    path?: string;
}
/**
 * Request interface for updating Inventair
 */
export interface InventairUpdateRequest {
    inventaire_id?: string;
    lieu_id?: string;
    equipements_id?: string;
    path?: string;
}
