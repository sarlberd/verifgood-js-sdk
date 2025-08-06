import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
export declare class Taches extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Get all taches with optional site restrictions
     * @param metadatas Metadatas - Metadatas object for query options
     * @param options object - Options for query modification
     * @returns Promise<any> - List of taches
     */
    getTaches(metadatas: Metadatas, options?: {
        restrictionSites?: string | null;
    }): Promise<any>;
    /**
     * Get a single tache by ID
     * @param id number - The tache ID
     * @returns Promise<any> - The tache details
     */
    getTache(id: number): Promise<any>;
    /**
     * Create multiple taches
     * @param taches any[] - Array of tache objects to create
     * @param restrictionSites string | null - Optional site restrictions
     * @returns Promise<any> - Created taches
     */
    createTaches(taches: any[], restrictionSites?: string | null): Promise<any>;
    /**
     * Update a tache
     * @param tache any - The tache object to update
     * @param updatedTacheSites any - Optional updated tache sites
     * @returns Promise<any> - Updated tache
     */
    updateTache(tache: any, updatedTacheSites?: any): Promise<any>;
    /**
     * Delete a tache
     * @param tache any - The tache object to delete
     * @returns Promise<any> - Deletion confirmation
     */
    deleteTache(tache: any): Promise<any>;
    /**
     * Export taches to Excel/CSV file
     * Note: Browser-specific functionality - returns download URL in Node.js environments
     * @param metadatas Metadatas - Metadatas for the export
     * @param filename string - Optional filename prefix
     * @param fileExtension string - File extension: 'xlsx' or 'csv'
     * @returns Promise<any> - Export result
     */
    getExcelFile(metadatas: Metadatas, filename?: string | null, fileExtension?: string): Promise<any>;
}
