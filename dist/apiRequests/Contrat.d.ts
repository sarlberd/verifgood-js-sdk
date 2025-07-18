import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { ContraCreateRequest } from "../types/Contrat";
/**
 * Contrat API request class
 * Service for managing contracts
 */
export declare class Contrat extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Get contracts with site restrictions
     * @param metadatas - The metadatas object
     * @returns Promise<any>
     */
    getContrats(metadatas: Metadatas): Promise<any>;
    /**
     * Fetch contracts (deprecated - use getContrats instead)
     * @param metadatas - The metadatas object
     * @returns Promise<any>
     * @deprecated
     */
    fetchContrats(metadatas?: any): Promise<any>;
    /**
     * Fetch single contract by ID (deprecated - use get instead)
     * @param idContrat - The contract ID
     * @param options - Options object
     * @returns Promise<any>
     * @deprecated
     */
    fetchContrat(idContrat: string, options?: any): Promise<any>;
    /**
     * Create a contract
     * @param data - The contract data
     * @returns Promise<any>
     */
    create(data: ContraCreateRequest): Promise<any>;
    /**
     * Update a contract
     * @param contrat - The contract object
     * @param options - Options object
     * @returns Promise<any>
     */
    updateContrat(contrat: any, options?: any): Promise<any>;
    /**
     * Archive a contract
     * @param contrat - The contract object
     * @param options - Options object
     * @returns Promise<any>
     */
    archive(contrat: any, options?: any): Promise<any>;
    /**
     * Delete a contract (deprecated)
     * @param contrat - The contract object
     * @returns Promise<any>
     * @deprecated
     */
    deleteContrat(contrat: any): Promise<any>;
    /**
     * Attach categories to a contract (deprecated)
     * @param categoriesContrat - Array of categories
     * @returns Promise<any>
     * @deprecated
     */
    attachCategoriesToContrat(categoriesContrat: any[]): Promise<any>;
    /**
     * Format contract status (deprecated - should be moved to client-side utility)
     * @param contrat - The contract object
     * @returns string
     * @deprecated
     */
    formatStatus(contrat: any): string;
}
