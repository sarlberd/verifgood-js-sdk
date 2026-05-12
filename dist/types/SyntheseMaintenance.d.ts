/**
 * SyntheseMaintenance Types
 * Generated API types for SyntheseMaintenance
 */
/**
 * SyntheseMaintenance entity interface
 */
export interface SyntheseMaintenanceEntity {
    id?: number;
    period?: string;
    preventive_count?: number;
    completion_rate?: number;
    created_at?: string;
    updated_at?: string;
}
/**
 * Request interface for creating SyntheseMaintenance
 */
export interface SyntheseMaintenanceCreateRequest {
    period: string;
    preventive_count?: number;
    completion_rate?: number;
}
/**
 * Request interface for updating SyntheseMaintenance
 */
export interface SyntheseMaintenanceUpdateRequest {
    period?: string;
    preventive_count?: number;
    completion_rate?: number;
}
/**
 * Summary request parameters interface
 */
export interface SyntheseSummaryRequest {
    startDate: string;
    endDate: string;
    userId?: number | null;
    sites?: string | null;
}
