/**
 * LibelService - Type definitions
 */
export interface LibelService {
    id?: number;
    libelle?: string;
    createdAt?: string;
    updatedAt?: string;
    [key: string]: any; // Allow additional properties
}

/**
 * Request interface for creating LibelService
 */
export interface LibelServiceCreateRequest {
    libelle?: string;
    [key: string]: any; // Allow additional properties
}

/**
 * Request interface for updating LibelService
 */
export interface LibelServiceUpdateRequest {
    libelle?: string;
    [key: string]: any; // Allow additional properties
}
