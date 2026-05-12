"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupeValidateurs = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
/**
 * GroupeValidateurs API request class
 * Service for managing groupe validateurs
 */
class GroupeValidateurs extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/groupe-validateurs';
        this.endpointSingleton = '/api/groupe-validateur';
    }
    /**
     * Get all groupe validateurs
     * @param metadatas Metadatas for filtering
     * @returns Promise<any>
     * @deprecated Use getAll() instead - this method is provided by the parent ApiRequest class
     */
    async getGroupeValidateurs(metadatas) {
        const query = {
            metadatas: metadatas.get()
        };
        const response = await this.get(this.endpoint, metadatas, query);
        return { groupeValidateurs: response.datas, metadatas: response.metadatas };
    }
}
exports.GroupeValidateurs = GroupeValidateurs;
//# sourceMappingURL=GroupeValidateurs.js.map