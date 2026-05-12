import { ApiRequest } from "../core/ApiRequest";
/**
 * Reponses API request class
 * Service for managing responses
 */
export declare class Reponses extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Set daily consumption for an array of meter readings
     * @param tableauRelevesCompteur Array of meter readings
     */
    setConsoJournaliere(tableauRelevesCompteur: any[]): void;
    /**
     * Check if examined register response is previous to current meter reading
     * @param examinedRegisterResponse Register response to examine
     * @param releveCompteur Current meter reading
     * @returns Boolean indicating if it's a previous response
     */
    isPreviousRegisterResponse(examinedRegisterResponse: any, releveCompteur: any): boolean;
    /**
     * Find previous register response and calculate daily consumption
     * @param index Current index in the array
     * @param releveCompteur Current meter reading
     * @param tableauRelevesCompteur Array of all meter readings
     */
    findPreviousRegisterResponse(index: number, releveCompteur: any, tableauRelevesCompteur: any[]): void;
}
