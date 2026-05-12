import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { Maintenance as MaintenanceType, MaintenanceCreateRequest } from "../types/Maintenance";
/**
 * Maintenance API request class
 * Service for managing maintenance requests and operations
 */
export declare class Maintenance extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * GET maintenances liste with custom options
     * @param metadatas - Metadatas for filtering
     * @param options - Additional options for the request
     */
    getMaintenances(metadatas: Metadatas, options?: {
        _stored?: boolean;
        idUserAffecte?: string | null;
        idTiersAffecte?: string | null;
        onlyEncours?: boolean;
        onlyNonAffectes?: boolean;
    }): Promise<{
        datas: MaintenanceType[];
        metadatas: any;
    }>;
    /**
     * GET maintenances qui me sont planifiées
     * @param metadatas - Metadatas for filtering
     */
    getMesMaintenancesPlanifiees(metadatas: Metadatas): Promise<{
        datas: MaintenanceType[];
        metadatas: any;
    }>;
    /**
     * GET demandeurs liste
     * @param metadatas - Metadatas for filtering
     * @param options - Additional options
     */
    getDemandeurs(metadatas: Metadatas, options?: {
        _stored?: boolean;
    }): Promise<{
        datas: any[];
        metadatas: any;
    }>;
    /**
     * Create multiple maintenances
     * @param maintenances - Array of maintenance objects to create
     * @param options - Additional options
     */
    createMaintenances(maintenances: MaintenanceCreateRequest[], options?: {
        _stored?: boolean;
    }): Promise<MaintenanceType[]>;
    /**
     * Demande de devis on maintenance id
     * @param maintenanceId - ID of the maintenance
     * @param payload - Request payload
     */
    demandeDevis(maintenanceId: string, payload: any): Promise<any>;
    /**
     * Delete multiple maintenances
     * @param maintenances - Array of maintenance objects to delete
     */
    deleteMultiple(maintenances: MaintenanceType[]): Promise<any>;
    /**
     * Relancer maintenance
     * @param maintenance - Maintenance object to relancer
     * @param commentaire - Optional comment
     */
    relancer(maintenance: MaintenanceType, commentaire?: string | null): Promise<MaintenanceType>;
    /**
     * Create operation on maintenance
     * @param idMaintenance - ID of the maintenance
     * @param operations - Array of operations
     */
    postMaintenanceOperations(idMaintenance: string, operations: any[]): Promise<any>;
    /**
     * Create operations
     * @param operations - Array of operations
     */
    postOperations(operations: any[]): Promise<any>;
    /**
     * Update operation
     * @param operation - Operation object to update
     */
    putOperation(operation: {
        id: string;
        [key: string]: any;
    }): Promise<any>;
    /**
     * Delete operation
     * @param idOperation - ID of the operation
     * @param operation - Operation object for uid
     */
    deleteOperation(idOperation: string, operation: {
        uid: string;
    }): Promise<any>;
    /**
     * Get calendar events (deprecated)
     * @deprecated
     * @param metadatas - Metadatas for filtering
     */
    getCalendarEvents(metadatas: Metadatas): Promise<any[]>;
    /**
     * Format maintenances to calendar events (deprecated)
     * @deprecated
     * @param maintenances - Array of maintenance objects
     */
    formatToCalendarEvents(maintenances: MaintenanceType[]): any[];
    /**
     * Prendre en compte maintenances
     * @param maintenances - Array of maintenance objects
     */
    prendreEnCompteMaintenances(maintenances: MaintenanceType[]): Promise<any>;
    /**
     * Prendre en compte maintenance
     * @param maintenance - Maintenance object
     */
    prendreEnCompteMaintenance(maintenance: MaintenanceType): Promise<any>;
    /**
     * Mettre en attente maintenances
     * @param maintenances - Array of maintenance objects
     */
    mettreEnAttenteMaintenances(maintenances: MaintenanceType[]): Promise<any>;
    /**
     * Mettre en attente maintenance
     * @param maintenance - Maintenance object
     */
    mettreEnAttenteMaintenance(maintenance: MaintenanceType): Promise<any>;
    /**
     * Cloture maintenances
     * @param maintenances - Array of maintenance objects
     * @param rapportCloture - Optional rapport de cloture
     */
    resolveMaintenances(maintenances: MaintenanceType[], rapportCloture?: string | null): Promise<any>;
    /**
     * Cloture maintenance
     * @param maintenance - Maintenance object
     * @param files - Optional files array
     */
    resolveMaintenance(maintenance: MaintenanceType, files?: any[] | null): Promise<any>;
    /**
     * Reopen maintenances
     * @param maintenanceId - ID of the maintenance
     */
    reopenMaintenances(maintenanceId: string): Promise<any>;
    /**
     * Set status maintenances
     * @param maintenances - Array of maintenance objects
     * @param status - New status
     */
    setStatusMaintenances(maintenances: MaintenanceType[], status: string): Promise<any>;
    /**
     * Download file (CSV or Excel)
     * @param metadatas - Metadatas for filtering
     * @param filename - Optional filename
     * @param fileExtension - File extension (csv or xlsx)
     */
    getFile(metadatas: Metadatas, filename?: string | null, fileExtension?: string): Promise<void>;
    /**
     * Download PDF file
     * @param idMaintenance - ID of the maintenance
     * @param filename - Optional filename
     * @param fileExtension - File extension
     */
    getPdfFile(idMaintenance: string, filename?: string | null, fileExtension?: string): Promise<any>;
    /**
     * Calculate internal cost
     * @param workingTime - Working time in minutes
     */
    coutInterne(workingTime: string): number;
    /**
     * Calculate duration mise en attente
     * @param maintenance - Maintenance object
     */
    dureeMiseEnAttente(maintenance: MaintenanceType): number;
    /**
     * Calculate duration fermeture temporaire hors weekend
     * @param maintenance - Maintenance object
     */
    dureeFermetureTemporaireHorsWeekend(maintenance: MaintenanceType): number;
    /**
     * Calculate duration nette traitement
     * @param maintenance - Maintenance object
     */
    dureeNetteTraitement(maintenance: MaintenanceType): number;
    /**
     * Update multiple typologies
     * @param maintenanceIds - Array of maintenance IDs
     * @param typologyName - Typology name
     */
    updateMultipleTypologies(maintenanceIds: string[], typologyName: string): Promise<any>;
}
