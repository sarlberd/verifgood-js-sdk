import { ApiRequest } from '../core/ApiRequest';
/**
 * Parametres API Service
 * Handles application parameters operations including get, update, and demo account management.
 */
export declare class Parametres extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Get all application parameters
     * @returns Promise with parameters data
     */
    getParameters(): Promise<any>;
    /**
     * Update application parameter
     * @param datas - The parameter data to update
     * @returns Promise with updated parameter data
     */
    updateParameter(datas: any): Promise<any>;
    /**
     * Delete demo account data with specified entities
     * @param entitiesToRemove - Object specifying which entities to remove (optional)
     * @returns Promise with deletion result
     */
    deleteDemoAccount(entitiesToRemove?: any): Promise<any>;
}
