import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
/**
 * SyntheseMaintenance API request class
 * Handles preventive maintenance summary operations
 */
export declare class SyntheseMaintenance extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Get preventive maintenance summary data
     * @param startDate string - Start date for the summary period
     * @param endDate string - End date for the summary period
     * @param metadatas Metadatas - Metadatas object for query options
     * @returns Promise<any> - Preventive maintenance summary data
     */
    getSummary(startDate: string, endDate: string, metadatas: Metadatas): Promise<any>;
}
