/**
 * Service for managing tags - Type definitions
 */
export interface Tag {
    id?: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
}
/**
 * Request interface for creating Tag
 */
export interface TagCreateRequest {
    name: string;
}
/**
 * Request interface for updating Tag
 */
export interface TagUpdateRequest {
    name?: string;
}
