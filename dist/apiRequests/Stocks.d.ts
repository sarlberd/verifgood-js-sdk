import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
/**
 * Stocks API request class
 * Service for managing stocks, depots and fiche demande consommables
 */
export declare class Stocks extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Get Depots.
     *
     * @param metadatas Metadatas for filtering
     * @returns Promise with depots data
     */
    getDepots(metadatas?: Metadatas): Promise<any>;
    /**
     * Get Stocks (overrides parent getAll method)
     *
     * @param metadatas Metadatas for filtering
     * @returns Promise with stocks data
     */
    getAll(metadatas: Metadatas): Promise<any>;
    /**
     * Get Bon de sortie by id
     * @deprecated Use getById instead - this method does the same as parent getById
     *
     * @param idFiche ID of the fiche
     * @returns Promise with fiche data
     */
    getFiche(idFiche: string): Promise<any>;
    /**
     * Create fiche-demande-consommables (overrides parent create method)
     *
     * @param stocks Stocks data to create
     * @returns Promise with created data
     */
    create(stocks: any): Promise<any>;
    /**
     * Update fiche-demande-consommables (overrides parent update method)
     *
     * @param id ID of the item to update
     * @param bonDeCommande Data to update
     * @returns Promise with updated data
     */
    update(id: number, bonDeCommande: any): Promise<any>;
    /**
     * Delete fiche-demande-consommables (overrides parent remove method)
     *
     * @param id ID of the item to delete
     * @returns Promise with deletion result
     */
    remove(id: number): Promise<any>;
}
