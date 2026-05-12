import { ApiRequest } from "../core/ApiRequest";
import { ContratEcheancieCreateRequest, ContratEcheancieUpdateRequest } from "../types/ContratEcheancier";
/**
 * ContratEcheancier API request class
 * Service for managing contract payment schedules (echeances)
 */
export declare class ContratEcheancier extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Get echeances for a specific contract
     * @param contratId - The contract ID
     * @returns Promise<any>
     */
    getContratEcheances(contratId: string): Promise<any>;
    /**
     * Create contract echeances with userId
     * @param data - The contract echeances data
     * @returns Promise<any>
     */
    create(data: ContratEcheancieCreateRequest): Promise<any>;
    /**
     * Update contract echeance with userId
     * @param id - The echeance ID
     * @param data - The update data
     * @returns Promise<any>
     */
    updateContratEcheance(id: string, data: ContratEcheancieUpdateRequest): Promise<any>;
    /**
     * Delete contract echeance with userId
     * @param id - The echeance ID
     * @returns Promise<any>
     */
    deleteContratEcheance(id: string): Promise<any>;
}
