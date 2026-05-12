import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
/**
 * GroupeValidateurs API request class
 * Service for managing groupe validateurs
 */
export declare class GroupeValidateurs extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Get all groupe validateurs
     * @param metadatas Metadatas for filtering
     * @returns Promise<any>
     * @deprecated Use getAll() instead - this method is provided by the parent ApiRequest class
     */
    getGroupeValidateurs(metadatas: Metadatas): Promise<any>;
}
