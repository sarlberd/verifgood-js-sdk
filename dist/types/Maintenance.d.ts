/**
 * Service for managing maintenance requests and operations - Type definitions
 */
export interface Maintenance {
    id?: string;
    dateOuvertureSAV?: string;
    dateFermetureSAV?: string;
    statut?: string;
    operation?: string;
    rapportCloture?: string;
    affectation?: object;
    operations?: any[];
    idUser?: string;
}
/**
 * Request interface for creating Maintenance
 */
export interface MaintenanceCreateRequest {
    dateOuvertureSAV?: string;
    dateFermetureSAV?: string;
    statut?: string;
    operation?: string;
    rapportCloture?: string;
    affectation?: object;
    operations?: any[];
    idUser?: string;
}
/**
 * Request interface for updating Maintenance
 */
export interface MaintenanceUpdateRequest {
    dateOuvertureSAV?: string;
    dateFermetureSAV?: string;
    statut?: string;
    operation?: string;
    rapportCloture?: string;
    affectation?: object;
    operations?: any[];
    idUser?: string;
}
