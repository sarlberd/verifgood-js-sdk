import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { TacheCreateRequest, TacheUpdateRequest, GetTachesOptions } from "../types/Taches";
export declare class Taches extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Get all taches with optional site restrictions.
     * GET /taches
     * @param metadatas Metadatas object for query options
     * @param options Options for query modification
     * @returns Promise with list of taches
     */
    getTaches(metadatas: Metadatas, options?: GetTachesOptions): Promise<any>;
    /**
     * Get taches overview statistics.
     * GET /taches/overview
     * @param metadatas Metadatas object for filters
     * @param options Options for query modification
     * @returns Promise with overview statistics
     */
    getTachesOverview(metadatas: Metadatas, options?: GetTachesOptions): Promise<any>;
    /**
     * Get a single tache by ID with checkpoints, affectations, sites and linked equipements.
     * GET /tache/{id}
     * @param id The tache ID
     * @returns Promise with tache details
     */
    getTache(id: number): Promise<any>;
    /**
     * Create multiple taches with checkpoints.
     * POST /taches
     * @param taches Array of tache objects to create
     * @param restrictionSites Optional site restrictions
     * @returns Promise with created taches
     */
    createTaches(taches: TacheCreateRequest[], restrictionSites?: string | null): Promise<any>;
    /**
     * Update a tache with its related entities.
     * PUT /tache/{id}
     * @param tache The tache object to update
     * @param updatedTacheSites Optional updated tache sites
     * @returns Promise with updated tache
     */
    updateTache(tache: TacheUpdateRequest, updatedTacheSites?: any): Promise<any>;
    /**
     * Delete a tache and all its associations.
     * DELETE /tache/{id}
     * @param tache The tache object to delete
     * @returns Promise with deletion confirmation
     */
    deleteTache(tache: {
        id: number;
    }): Promise<any>;
    /**
     * Export taches to Excel/CSV file.
     * GET /taches/export/{format}
     * @param metadatas Metadatas for the export
     * @param filename Optional filename prefix
     * @param fileExtension File extension: 'xlsx' or 'csv'
     * @returns Promise with export data
     */
    getExcelFile(metadatas: Metadatas, filename?: string | null, fileExtension?: string): Promise<any>;
}
