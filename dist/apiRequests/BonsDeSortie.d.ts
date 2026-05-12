import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
/**
 * BonsDeSortie API request class
 * Service for managing outbound orders/goods issue (bons de sortie)
 */
export declare class BonsDeSortie extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Get all bons de sortie (override base method to match mixin behavior)
     * @param metadatas - The metadatas object
     * @returns Promise<any>
     */
    getBonsDeSortie(metadatas: Metadatas): Promise<any>;
    /**
     * Override the default getAll to use getBonsDeSortie method
     * @param metadatas - The metadatas object
     * @returns Promise<any>
     */
    getAll(metadatas: Metadatas): Promise<any>;
    /**
     * Get bon de sortie by ID (override base method to match mixin behavior)
     * @param idBonDeSortie - The bon de sortie ID
     * @returns Promise<any>
     */
    getBonDeSortie(idBonDeSortie: string): Promise<any>;
    /**
     * Override the default getById to use getBonDeSortie method
     * @param id - The bon de sortie ID
     * @returns Promise<any>
     */
    getById(id: number): Promise<any>;
    /**
     * Override the default create to match the mixin behavior
     * @param bonsDeSortie - The bon de sortie data
     * @param ficheDemandeConsommable - Optional fiche demande consommable
     * @returns Promise<any>
     */
    create(bonsDeSortie: any, ficheDemandeConsommable?: any): Promise<any>;
    /**
     * Override the default update to match the mixin behavior
     * @param bonDeSortie - The bon de sortie to update
     * @returns Promise<any>
     */
    update(bonDeSortie: any): Promise<any>;
    /**
     * Override the default remove to match the mixin behavior
     * @param bonDeSortie - The bon de sortie to delete
     * @returns Promise<any>
     */
    remove(bonDeSortie: any): Promise<any>;
    /**
     * Get signataires (signers) for bons de sortie
     * @param metadatas - The metadatas object
     * @param type - Type of signataires: "receveurs" or "donneurs"
     * @returns Promise<any>
     */
    getSignataires(metadatas: Metadatas, type?: string): Promise<any>;
}
