/**
 * Service for managing documents and plans - Type definitions
 */
export interface Document {
    id?: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
}

/**
 * Request interface for creating Document
 */
export interface DocumentCreateRequest {
    name: string;
}

/**
 * Request interface for updating Document
 */
export interface DocumentUpdateRequest {
    name?: string;
}
