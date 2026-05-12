"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tiers = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
const Metadatas_1 = require("../core/Metadatas");
/**
 * Tiers API request class
 * Service for managing tiers
 */
class Tiers extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/tiers';
        this.endpointSingleton = '/api/tiers';
    }
    /**
     * Get tiers with optional filtering
     * @param metadatas - The metadatas object for filtering
     * @param options - Options object with sites and userId
     * @returns Promise<any>
     */
    async getTiers(metadatas, options = {}) {
        const query = {
            sites: options.sites || null,
            userId: options.userId || null
        };
        return this.get(this.endpoint, metadatas, query);
    }
    /**
     * Get a single tier by ID
     * @param id - The tier ID
     * @returns Promise<any>
     */
    async getTiersById(id) {
        return this.get(`${this.endpoint}/${id}`, new Metadatas_1.Metadatas(), {});
    }
    /**
     * Update a tier
     * @param tier - The tier object with id and data to update
     * @returns Promise<any>
     */
    async updateTier(tier) {
        return this.put(`${this.endpoint}/${tier.id}`, { datas: tier });
    }
    /**
     * Create a new tier
     * @param tier - The tier data to create
     * @returns Promise<any>
     */
    async createTier(tier) {
        return this.post(this.endpoint, { datas: [tier] });
    }
    /**
     * Delete a tier
     * @param tier - The tier object with id
     * @param userId - Optional user ID
     * @returns Promise<any>
     */
    async deleteTier(tier, userId) {
        const url = userId
            ? `${this.endpoint}/${tier.id}?userId=${userId}`
            : `${this.endpoint}/${tier.id}`;
        return this.delete(url);
    }
    /**
     * Archive a tier (set isArchived to "1")
     * @param tier - The tier object with id
     * @returns Promise<any>
     */
    async archive(tier) {
        const tierArchived = {
            id: tier.id,
            isArchived: "1"
        };
        return this.put(`${this.endpoint}/${tier.id}`, { datas: tierArchived });
    }
    /**
     * Unarchive a tier (set isArchived to "0")
     * @param tier - The tier object with id
     * @returns Promise<any>
     */
    async unarchive(tier) {
        const tierUnarchived = {
            id: tier.id,
            isArchived: "0"
        };
        return this.put(`${this.endpoint}/${tier.id}`, { datas: tierUnarchived });
    }
}
exports.Tiers = Tiers;
//# sourceMappingURL=Tiers.js.map