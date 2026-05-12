import { ApiRequest } from "../core/ApiRequest";
/**
 * Affectations API request class
 * Service for managing task assignments and scheduling
 */
export declare class Affectations extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Copy affectation tache
     * @param affectation - The affectation object
     * @param start - Start date/time
     * @param end - End date/time
     * @param affectes - Array of affected users (optional)
     * @returns Promise<any>
     */
    copieAffectationTache(affectation: any, start: string, end: string, affectes?: any[]): Promise<any>;
    /**
     * Create affectations users taches
     * @param affectes - Array of affected users
     * @returns Promise<any>
     */
    createAffectationsUsersTaches(affectes: any[]): Promise<any>;
    /**
     * Delete affectations users taches
     * @param affecte - The affected user object
     * @returns Promise<any>
     */
    deleteAffectationsUsersTaches(affecte: any): Promise<any>;
    /**
     * Delete affectation
     * @param idAffectation - The affectation ID
     * @returns Promise<any>
     */
    deleteAffectation(idAffectation: string): Promise<any>;
    /**
     * Save schedule
     * @param schedule - The schedule object
     * @param maintenance - The maintenance object
     * @param emailDatas - Email data (optional)
     * @returns Promise<any>
     */
    saveSchedule(schedule: any, maintenance: any, emailDatas?: any): Promise<any>;
    /**
     * Save schedules for multiple maintenances
     * @param schedule - The schedule object
     * @param maintenances - Array of maintenance objects
     * @returns Promise<any>
     */
    saveSchedules(schedule: any, maintenances: any[]): Promise<any>;
    /**
     * Update schedule
     * @param schedule - The schedule object
     * @returns Promise<any>
     */
    updateSchedule(schedule: any): Promise<any>;
    /**
     * Fetch programmation contrat intervention
     * @param contratId - The contract ID
     * @returns Promise<any>
     */
    fetchProgrammationContratIntervention(contratId: string): Promise<any>;
    /**
     * Create programmation contrat intervention
     * @param programmation - The programmation object
     * @param contratId - The contract ID
     * @returns Promise<any>
     */
    createProgrammationContratIntervention(programmation: any, contratId: string): Promise<any>;
    /**
     * Update programmation contrat intervention
     * @param programmation - The programmation object
     * @param contratId - The contract ID
     * @returns Promise<any>
     */
    updateProgrammationContratIntervention(programmation: any, contratId: string): Promise<any>;
    /**
     * Convert item to calendar format
     * @param item - The item object
     * @param type - The type (user or tiers)
     * @param color - The color
     * @returns Calendar object
     */
    toCalendar(item: any, type: string, color: string): any;
    /**
     * Format calendars from affectables
     * @param affectables - Object with users and tiers arrays
     * @returns Array of calendar objects
     */
    formatCalendars(affectables: any): any[];
}
