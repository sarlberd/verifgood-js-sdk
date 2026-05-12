import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { CorpsDetat as CorpsDetatType } from "../types/CorpsDetat";
/**
 * CorpsDetat API request class
 * Service for managing corps d&#39;etat (trades/professions)
 */
export declare class CorpsDetat extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Get corps d'etat list
     * @param metadatas - The metadatas object
     * @returns Promise<any>
     */
    getCorpsDetats(metadatas: Metadatas): Promise<any>;
    /**
     * Create corps d'etat
     * @param data - The corps d'etat data array
     * @returns Promise<any>
     */
    create(data: CorpsDetatType[]): Promise<any>;
    /**
     * Update corps d'etat
     * @param corpsdetat - The corps d'etat object
     * @returns Promise<any>
     */
    updateCorpsDetat(corpsdetat: any): Promise<any>;
    /**
     * Delete corps d'etat
     * @param corpsdetat - The corps d'etat object
     * @returns Promise<any>
     */
    deleteCorpsDetat(corpsdetat: any): Promise<any>;
}
