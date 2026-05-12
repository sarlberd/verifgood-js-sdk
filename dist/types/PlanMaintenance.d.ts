/**
 * TypeScript interfaces for PlanMaintenance API Service
 *
 * Defines types for maintenance planning operations including
 * preventive maintenance data, tasks, contracts, and metadata structures.
 */
/**
 * Interface for maintenance task data
 */
export interface MaintenanceTask {
    id?: number;
    title?: string;
    description?: string;
    dueDate?: string;
    status?: string;
    priority?: string;
    assignedTo?: string;
    equipment?: any;
    [key: string]: any;
}
/**
 * Interface for maintenance contract data
 */
export interface MaintenanceContract {
    id?: number;
    contractNumber?: string;
    provider?: string;
    startDate?: string;
    endDate?: string;
    type?: string;
    scope?: string;
    status?: string;
    [key: string]: any;
}
/**
 * Interface for maintenance plan metadata
 */
export interface MaintenanceMetadata {
    filters?: any;
    pagination?: any;
    sorting?: any;
    [key: string]: any;
}
/**
 * Interface for preventive maintenance query parameters
 */
export interface PreventiveMaintenanceQuery {
    userId: string;
    sites: string;
    focusedDate: string;
    metadatas: any;
}
/**
 * Interface for preventive maintenance response data
 */
export interface PreventiveMaintenanceResponse {
    taches: MaintenanceTask[];
    contrats: MaintenanceContract[];
    metadatas: MaintenanceMetadata;
}
/**
 * Interface for metadata object with get method
 */
export interface MetadataProvider {
    get(): any;
}
