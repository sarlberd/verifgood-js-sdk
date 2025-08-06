/**
 * TacheUsers Types
 * Generated API types for TacheUsers (Task User Assignments)
 */
/**
 * TacheUser entity interface
 */
export interface TacheUserEntity {
    id?: number;
    tache_id?: number;
    user_id: number;
    role?: string;
    priority?: string;
    assigned_at?: string;
    created_at?: string;
    updated_at?: string;
}
/**
 * Request interface for creating TacheUser assignments
 */
export interface TacheUserCreateRequest {
    user_id: number;
    role?: string;
    priority?: string;
}
/**
 * Request interface for updating TacheUser assignments
 */
export interface TacheUserUpdateRequest {
    role?: string;
    priority?: string;
}
/**
 * Bulk assignment request interface
 */
export interface BulkTacheUserCreateRequest {
    tacheUsers: TacheUserCreateRequest[];
    tacheId: number;
    userId?: number | null;
}
/**
 * Assignment response interface
 */
export interface TacheUserAssignmentResponse {
    assignation?: number[];
    users?: TacheUserEntity[];
}
