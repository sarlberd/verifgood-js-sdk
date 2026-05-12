import { ApiRequest } from '../core/ApiRequest';
import { Metadatas } from '../core/Metadatas';
/**
 * MouvementsEquipements API Service
 * Handles equipment movements operations including CRUD operations and specialized methods.
 */
export declare class MouvementsEquipements extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Get all mouvements equipements with optional metadatas filtering
     * @param metadatas - Metadata object for filtering and pagination
     * @returns Promise with mouvements data and metadata
     */
    getMovements(metadatas: Metadatas): Promise<any>;
    /**
     * Get specific mouvement equipement by ID
     * @param id - The mouvement equipement ID
     * @returns Promise with mouvement equipement data
     */
    getMovementById(id: string | number): Promise<any>;
    /**
     * Update an existing mouvement equipement
     * @param mouvementEquipement - The mouvement equipement object to update
     * @returns Promise with updated mouvement equipement data
     */
    updateMovement(mouvementEquipement: any): Promise<any>;
    /**
     * Create a new mouvement equipement
     * @param mouvementEquipement - The mouvement equipement object to create
     * @param type - The type of movement
     * @returns Promise with created mouvement equipement data
     */
    createMovement(mouvementEquipement: any, type: string): Promise<any>;
    /**
     * Delete a mouvement equipement
     * @param mouvementEquipement - The mouvement equipement object to delete
     * @returns Promise with deletion result
     */
    deleteMovement(mouvementEquipement: any): Promise<any>;
    /**
     * Get mouvements signataires (receivers or givers)
     * @param metadatas - Metadata object for filtering
     * @param type - Type of signataires ('receveurs' or 'donneurs')
     * @returns Promise with signataires data
     */
    getMouvementsSignataires(metadatas: Metadatas, type?: string): Promise<any>;
    /**
     * Export mouvements to Excel or CSV file
     * @param metadatas - Metadata object for filtering
     * @param filename - Optional filename for export
     * @param fileExtension - File extension ('xlsx' or 'csv')
     * @returns Promise with export result
     */
    exportMovements(metadatas: Metadatas, filename?: string | null, fileExtension?: string): Promise<any>;
}
