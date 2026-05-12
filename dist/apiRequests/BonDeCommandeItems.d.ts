import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
/**
 * BonDeCommandeItems API request class
 * Service for managing purchase order items (bon de commande items)
 */
export declare class BonDeCommandeItems extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Override the default getAll to match the mixin behavior
     * @param metadatas - The metadatas object
     * @returns Promise<any>
     */
    getAll(metadatas: Metadatas): Promise<any>;
    /**
     * Override the default create to match the mixin behavior
     * @param bonDeCommandeItems - Array of bon de commande items
     * @returns Promise<any>
     */
    create(bonDeCommandeItems: any[]): Promise<any>;
    /**
     * Override the default update to match the mixin behavior
     * @param bonDeCommandeItem - The bon de commande item to update
     * @returns Promise<any>
     */
    update(bonDeCommandeItem: any): Promise<any>;
    /**
     * Override the default remove to match the mixin behavior
     * @param bonDeCommandeItem - The bon de commande item to delete
     * @returns Promise<any>
     */
    remove(bonDeCommandeItem: any): Promise<any>;
    /**
     * Get bon de commande items and create clones for new usage
     * @param metadatas - The metadatas object
     * @returns Promise<any[]> - Array of cloned items
     */
    getClones(metadatas: Metadatas): Promise<any[]>;
}
