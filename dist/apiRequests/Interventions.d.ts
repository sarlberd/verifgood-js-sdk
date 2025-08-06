import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
/**
 * Interventions API request class
 * Service for managing interventions
 */
export declare class Interventions extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Override getAll method to include custom query parameters
     * @param metadatas Metadatas object
     * @param idEquipement Optional equipment ID
     * @param siteEquipement Optional site equipment
     * @returns Promise with interventions data
     */
    getAll(metadatas: Metadatas, idEquipement?: string | null, siteEquipement?: string | null): Promise<any>;
    /**
     * Override getById method with custom userId parameter
     * @param id Intervention ID
     * @param options Optional parameters
     * @returns Promise with intervention data
     */
    getById(id: number, options?: any): Promise<any>;
    /**
     * Override update method with custom data cleaning
     * @param id Intervention ID
     * @param intervention Intervention data
     * @param options Optional parameters
     * @returns Promise with updated intervention
     */
    update(id: number, intervention: any, options?: any): Promise<any>;
    /**
     * Override create method with custom userId parameter
     * @param interventions Array of interventions to create
     * @returns Promise with created interventions
     */
    create(interventions: any[]): Promise<any>;
    /**
     * Override remove method with custom userId parameter
     * @param id Intervention ID
     * @returns Promise with deletion result
     */
    remove(id: number): Promise<any>;
    /**
     * Get PDF file for intervention
     * @param idIntervention Intervention ID
     * @param filename Optional filename
     * @param fileExtension File extension (default: pdf)
     * @returns Promise with PDF data
     */
    getPdfFile(idIntervention: string, filename?: string | null, fileExtension?: string): Promise<any>;
    /**
     * Format interventions to calendar events
     * @param interventions Array of interventions
     * @returns Array of calendar events
     */
    formatToCalendarEvents(interventions: any[]): any[];
    /**
     * Get interventions calendar events
     * @param metadatas Metadatas object
     * @returns Promise with calendar events
     */
    getCalendarEvents(metadatas: Metadatas): Promise<any[]>;
    /**
     * Create interventions equipements
     * @param idIntervention Intervention ID
     * @param equipements Array of equipements
     * @returns Promise with created equipements
     */
    createInterventionsEquipements(idIntervention: string, equipements: any[]): Promise<any>;
    /**
     * Delete intervention equipement
     * @param interventionEquipement Intervention equipement object
     * @returns Promise with deletion result
     */
    deleteInterventionEquipement(interventionEquipement: any): Promise<any>;
    /**
     * Delete interventions equipements
     * @param interventionsEquipements Array of interventions equipements
     * @returns Promise with deletion result
     */
    deleteInterventionsEquipements(interventionsEquipements: any[]): Promise<any>;
}
