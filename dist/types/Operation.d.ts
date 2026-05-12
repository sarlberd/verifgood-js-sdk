/**
 * Service for managing operations and interventions - Type definitions
 */
export interface Operation {
    id?: string;
    operation?: string;
    retourClient?: string;
    dateOperation?: string;
    ficheSav?: any;
    idUser?: string;
    userId?: string;
    tiers?: any;
    __uploadedFile?: any;
    __action?: string;
}
/**
 * Request interface for creating Operation
 */
export interface OperationCreateRequest {
    operation?: string;
    retourClient?: string;
    dateOperation?: string;
    ficheSav?: any;
    idUser?: string;
    userId?: string;
    tiers?: any;
    __uploadedFile?: any;
    __action?: string;
}
/**
 * Request interface for updating Operation
 */
export interface OperationUpdateRequest {
    id?: string;
    operation?: string;
    retourClient?: string;
    dateOperation?: string;
    ficheSav?: any;
    idUser?: string;
    userId?: string;
    tiers?: any;
    __uploadedFile?: any;
    __action?: string;
}
/**
 * Factory function to create a new Operation with default values
 * Replaces the Vue.js mixin data() function
 */
export declare function createDefaultOperation(idUser?: string, userId?: string): Operation;
