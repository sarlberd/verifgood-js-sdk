import { ApiRequest } from "../core/ApiRequest";
/**
 * IntegrationsDonnees API request class
 * Service for managing data integrations
 */
export declare class IntegrationsDonnees extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Integration method for categories lieux from CSV data
     * @param composants CSV data for categories lieux
     * @returns Promise with the integration result
     */
    categoriesLieux(composants: any): Promise<any>;
}
