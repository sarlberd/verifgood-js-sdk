"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupeValidateursUsers = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
/**
 * GroupeValidateursUsers API request class
 * Service for managing associations between groupe validateurs and users
 *
 * Note: This service primarily handles CRUD operations for user-group associations.
 * Use the inherited create(), delete(), getAll(), etc. methods for standard operations.
 */
class GroupeValidateursUsers extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/groupe-validateurs-users';
        this.endpointSingleton = '/api/groupe-validateur-user';
    }
    /**
     * Create associations between a groupe validateur and multiple users
     *
     * @deprecated Use create() method instead. This method is just an alias for standard CRUD operations.
     * @param groupeValidateurs The groupe validateur object
     * @param validateurs Array of user objects to associate with the groupe validateur
     * @returns Promise<GroupeValidateursUser[]>
     */
    async createAssociations(groupeValidateurs, validateurs) {
        const groupeValidateursUsers = validateurs.map((validateur) => ({
            validateur_id: validateur.id,
            groupeValidateur_id: groupeValidateurs.id
        }));
        // This is just an alias for the parent's create method
        return this.create({ datas: groupeValidateursUsers });
    }
    /**
     * Delete a specific groupe validateur user association
     *
     * @deprecated Use delete() method instead. This method is just an alias for standard CRUD operations.
     * @param groupeValidateurUser The association to delete
     * @returns Promise<any>
     */
    async deleteAssociation(groupeValidateurUser) {
        // This is just an alias for the parent's delete method
        return this.delete(`${this.endpointSingleton}/${groupeValidateurUser.id}`);
    }
}
exports.GroupeValidateursUsers = GroupeValidateursUsers;
//# sourceMappingURL=GroupeValidateursUsers.js.map