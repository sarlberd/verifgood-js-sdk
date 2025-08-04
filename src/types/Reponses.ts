/**
 * Service for managing responses - Type definitions
 * //@TODO : need review - types should be defined based on actual API responses
 */
export interface Reponse {
    id?: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
}

/**
 * Request interface for creating Reponse
 * //@TODO : need review - types should be defined based on actual API requirements
 */
export interface ReponseCreateRequest {
    name: string;
}

/**
 * Request interface for updating Reponse
 * //@TODO : need review - types should be defined based on actual API requirements
 */
export interface ReponseUpdateRequest {
    name?: string;
}
