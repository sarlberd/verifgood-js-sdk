"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorpsDetat = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
/**
 * CorpsDetat API request class
 * Service for managing corps d&#39;etat (trades/professions)
 */
class CorpsDetat extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/corps-detats';
        this.endpointSingleton = '/api/corps-detat';
    }
    /**
     * Get corps d'etat list
     * @param metadatas - The metadatas object
     * @returns Promise<any>
     */
    async getCorpsDetats(metadatas) {
        return this.get(this.endpoint, metadatas, {});
    }
    /**
     * Create corps d'etat
     * @param data - The corps d'etat data array
     * @returns Promise<any>
     */
    async create(data) {
        const payload = {
            datas: data
        };
        return this.post(this.endpoint, payload);
    }
    /**
     * Update corps d'etat
     * @param corpsdetat - The corps d'etat object
     * @returns Promise<any>
     */
    async updateCorpsDetat(corpsdetat) {
        const payload = {
            datas: corpsdetat
        };
        return this.put(`${this.endpointSingleton}/${corpsdetat.id}`, payload);
    }
    /**
     * Delete corps d'etat
     * @param corpsdetat - The corps d'etat object
     * @returns Promise<any>
     */
    async deleteCorpsDetat(corpsdetat) {
        return super.delete(`${this.endpointSingleton}/${corpsdetat.id}`);
    }
}
exports.CorpsDetat = CorpsDetat;
//# sourceMappingURL=CorpsDetat.js.map