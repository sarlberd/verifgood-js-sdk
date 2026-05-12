/**
 * Service for managing equipment output/exit operations - Type definitions
 */
export interface SortieEquipemen {
    id?: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
}
/**
 * Request interface for creating SortieEquipemen
 */
export interface SortieEquipemenCreateRequest {
    name: string;
}
/**
 * Request interface for updating SortieEquipemen
 */
export interface SortieEquipemenUpdateRequest {
    name?: string;
}
