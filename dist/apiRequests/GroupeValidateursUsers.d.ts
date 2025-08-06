import { ApiRequest } from "../core/ApiRequest";
import { GroupeValidateursUser } from "../types/GroupeValidateursUsers";
/**
 * GroupeValidateursUsers API request class
 * Service for managing associations between groupe validateurs and users
 *
 * Note: This service primarily handles CRUD operations for user-group associations.
 * Use the inherited create(), delete(), getAll(), etc. methods for standard operations.
 */
export declare class GroupeValidateursUsers extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Create associations between a groupe validateur and multiple users
     *
     * @deprecated Use create() method instead. This method is just an alias for standard CRUD operations.
     * @param groupeValidateurs The groupe validateur object
     * @param validateurs Array of user objects to associate with the groupe validateur
     * @returns Promise<GroupeValidateursUser[]>
     */
    createAssociations(groupeValidateurs: any, validateurs: any[]): Promise<GroupeValidateursUser[]>;
    /**
     * Delete a specific groupe validateur user association
     *
     * @deprecated Use delete() method instead. This method is just an alias for standard CRUD operations.
     * @param groupeValidateurUser The association to delete
     * @returns Promise<any>
     */
    deleteAssociation(groupeValidateurUser: GroupeValidateursUser): Promise<any>;
}
