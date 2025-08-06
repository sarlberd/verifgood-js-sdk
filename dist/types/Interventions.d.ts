/**
 * Service for managing interventions - Type definitions
 */
export interface Intervention {
    id?: string;
    status?: string;
    datePrevisionnelleDebut?: string;
    datePrevisionnelleFin?: string;
    dateEffectiveDebut?: string;
    dateEffectiveFin?: string;
}
/**
 * Request interface for creating Intervention
 */
export interface InterventionCreateRequest {
    status?: string;
    datePrevisionnelleDebut?: string;
    datePrevisionnelleFin?: string;
    dateEffectiveDebut?: string;
    dateEffectiveFin?: string;
}
/**
 * Request interface for updating Intervention
 */
export interface InterventionUpdateRequest {
    status?: string;
    datePrevisionnelleDebut?: string;
    datePrevisionnelleFin?: string;
    dateEffectiveDebut?: string;
    dateEffectiveFin?: string;
}
