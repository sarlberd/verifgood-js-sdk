/**
 * Service for managing equipment displacements - Type definitions
 */
export interface DeplacementsEquipement {
    id?: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
}
/**
 * Request interface for creating DeplacementsEquipement
 */
export interface DeplacementsEquipementCreateRequest {
    name: string;
}
/**
 * Request interface for updating DeplacementsEquipement
 */
export interface DeplacementsEquipementUpdateRequest {
    name?: string;
}
