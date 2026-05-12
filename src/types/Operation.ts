/**
 * Service for managing operations and interventions - Type definitions
 */
export interface Operation {
    id?: string;
    operation?: string;
    retourClient?: string;
    dateOperation?: string;
    ficheSav?: any; //@TODO: need review
    idUser?: string;
    userId?: string;
    tiers?: any; //@TODO: need review
    __uploadedFile?: any; //@TODO: need review
    __action?: string;
}

/**
 * Request interface for creating Operation
 */
export interface OperationCreateRequest {
    operation?: string;
    retourClient?: string;
    dateOperation?: string;
    ficheSav?: any; //@TODO: need review
    idUser?: string;
    userId?: string;
    tiers?: any; //@TODO: need review
    __uploadedFile?: any; //@TODO: need review
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
    ficheSav?: any; //@TODO: need review
    idUser?: string;
    userId?: string;
    tiers?: any; //@TODO: need review
    __uploadedFile?: any; //@TODO: need review
    __action?: string;
}

/**
 * Factory function to create a new Operation with default values
 * Replaces the Vue.js mixin data() function
 */
export function createDefaultOperation(idUser?: string, userId?: string): Operation {
    return {
        operation: "",
        retourClient: "",
        dateOperation: "",
        ficheSav: null,
        __uploadedFile: null,
        __action: undefined,
        idUser: idUser,
        userId: userId,
        tiers: null
    };
}
