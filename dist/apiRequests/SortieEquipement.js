"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortieEquipement = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
/**
 * SortieEquipement API request class
 * Service for managing equipment output/exit operations
 */
class SortieEquipement extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/sortieequipement';
        this.endpointSingleton = '/api/sortieequipement';
    }
    /**
     * Get equipment output/exit types
     *
     * @param metadatas Metadatas for filtering and pagination
     * @returns Promise with types data and metadata
     */
    async getTypes(metadatas) {
        const query = {
            userId: this.getAppUserId(), // @TODO: Implement app context integration - Original: this.$app.appID
        };
        try {
            // Use inherited get method to call /api/sortieequipement/types
            const typesEndpoint = `${this.endpoint}/types`;
            // Override the endpoint temporarily to use the types endpoint
            const originalEndpoint = this.endpoint;
            this.endpoint = typesEndpoint;
            const response = await this.get(this.endpoint, metadatas, query);
            // Restore original endpoint
            this.endpoint = originalEndpoint;
            // Return in the same format as original mixin
            return {
                datas: response.data || response,
                metadatas: response.meta || response.metadatas || {}
            };
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Get user ID from app context
     * @TODO: Implement app context integration
     * Original mixin uses: this.$app.appID
     */
    getAppUserId() {
        // @TODO: Need to implement app context access in framework-agnostic way
        return null;
    }
}
exports.SortieEquipement = SortieEquipement;
//# sourceMappingURL=SortieEquipement.js.map