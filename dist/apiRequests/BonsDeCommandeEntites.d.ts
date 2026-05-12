import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
/**
 * BonsDeCommandeEntites API request class
 * Service for managing purchase order entities (bons de commande entites)
 */
export declare class BonsDeCommandeEntites extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Get all bons de commande entites (override base method to match mixin behavior)
     * @param metadatas - The metadatas object
     * @returns Promise<any>
     */
    getEntites(metadatas: Metadatas): Promise<any>;
    /**
     * Override the default getAll to use getEntites method
     * @param metadatas - The metadatas object
     * @returns Promise<any>
     */
    getAll(metadatas: Metadatas): Promise<any>;
    /**
     * Override the default create to match the mixin behavior
     * @param bonsDeCommandeEntites - Array of bons de commande entites
     * @returns Promise<any>
     */
    create(bonsDeCommandeEntites: any[]): Promise<any>;
    /**
     * Override the default update to match the mixin behavior
     * @param bonsDeCommandeEntite - The bon de commande entite to update
     * @returns Promise<any>
     */
    update(bonsDeCommandeEntite: any): Promise<any>;
    /**
     * Override the default remove to match the mixin behavior
     * @param bonsDeCommandeEntite - The bon de commande entite to delete
     * @returns Promise<any>
     */
    remove(bonsDeCommandeEntite: any): Promise<any>;
}
