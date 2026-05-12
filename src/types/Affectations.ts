/**
 * Service for managing task assignments and scheduling - Type definitions
 */
export interface Affectation {
    id?: string;
    affectation_id?: string;
    user_id?: string;
    tache_id?: string;
    start?: string;
    end?: string;
}

/**
 * Request interface for creating Affectation
 */
export interface AffectationCreateRequest {
    affectation_id?: string;
    user_id?: string;
    tache_id?: string;
    start?: string;
    end?: string;
}

/**
 * Request interface for updating Affectation
 */
export interface AffectationUpdateRequest {
    affectation_id?: string;
    user_id?: string;
    tache_id?: string;
    start?: string;
    end?: string;
}
