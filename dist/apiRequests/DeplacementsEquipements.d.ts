import { ApiRequest } from "../core/ApiRequest";
/**
 * DeplacementsEquipements API request class
 * Service for managing equipment displacements
 */
export declare class DeplacementsEquipements extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Create multiple deplacements for equipements
     * @param deplacements Array of deplacements to create
     * @returns Promise<any>
     */
    createDeplacementsEquipements(deplacements: any[]): Promise<any>;
}
