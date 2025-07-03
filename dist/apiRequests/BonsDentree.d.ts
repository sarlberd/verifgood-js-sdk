import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
/**
 * BonsDentree API request class
 * Service for managing goods receipt/inbound orders (bons d&#39;entrée)
 */
export declare class BonsDentree extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Get all bons d'entrée (override base method to match mixin behavior)
     * @param metadatas - The metadatas object
     * @returns Promise<any>
     */
    getBonsDentree(metadatas: Metadatas): Promise<any>;
    /**
     * Override the default getAll to use getBonsDentree method
     * @param metadatas - The metadatas object
     * @returns Promise<any>
     */
    getAll(metadatas: Metadatas): Promise<any>;
    /**
     * Get bon d'entrée by ID (override base method to match mixin behavior)
     * @param idBonDentree - The bon d'entrée ID
     * @returns Promise<any>
     */
    getBonDentree(idBonDentree: string): Promise<any>;
    /**
     * Override the default getById to use getBonDentree method
     * @param id - The bon d'entrée ID
     * @returns Promise<any>
     */
    getById(id: number): Promise<any>;
    /**
     * Override the default create to match the mixin behavior
     * @param bonsDentree - Array of bons d'entrée or single bon d'entrée
     * @returns Promise<any>
     */
    create(bonsDentree: any): Promise<any>;
    /**
     * Override the default update to match the mixin behavior
     * @param bonDentree - The bon d'entrée to update
     * @returns Promise<any>
     */
    update(bonDentree: any): Promise<any>;
    /**
     * Override the default remove to match the mixin behavior
     * @param bonDentree - The bon d'entrée to delete
     * @returns Promise<any>
     */
    remove(bonDentree: any): Promise<any>;
}
