"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BonsDentree = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
const Metadatas_1 = require("../core/Metadatas");
/**
 * BonsDentree API request class
 * Service for managing goods receipt/inbound orders (bons d&#39;entrée)
 */
class BonsDentree extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/bons-dentree';
        this.endpointSingleton = '/api/bons-dentree';
    }
    /**
     * Get all bons d'entrée (override base method to match mixin behavior)
     * @param metadatas - The metadatas object
     * @returns Promise<any>
     */
    async getBonsDentree(metadatas) {
        return this.get(this.endpoint, metadatas, {});
    }
    /**
     * Override the default getAll to use getBonsDentree method
     * @param metadatas - The metadatas object
     * @returns Promise<any>
     */
    async getAll(metadatas) {
        return this.getBonsDentree(metadatas);
    }
    /**
     * Get bon d'entrée by ID (override base method to match mixin behavior)
     * @param idBonDentree - The bon d'entrée ID
     * @returns Promise<any>
     */
    async getBonDentree(idBonDentree) {
        return this.get(`${this.endpointSingleton}/${idBonDentree}`, new Metadatas_1.Metadatas(), {});
    }
    /**
     * Override the default getById to use getBonDentree method
     * @param id - The bon d'entrée ID
     * @returns Promise<any>
     */
    async getById(id) {
        return this.getBonDentree(id.toString());
    }
    /**
     * Override the default create to match the mixin behavior
     * @param bonsDentree - Array of bons d'entrée or single bon d'entrée
     * @returns Promise<any>
     */
    async create(bonsDentree) {
        return this.post(this.endpoint, { datas: bonsDentree });
    }
    /**
     * Override the default update to match the mixin behavior
     * @param bonDentree - The bon d'entrée to update
     * @returns Promise<any>
     */
    async update(bonDentree) {
        return this.put(`${this.endpointSingleton}/${bonDentree.id}`, { datas: bonDentree });
    }
    /**
     * Override the default remove to match the mixin behavior
     * @param bonDentree - The bon d'entrée to delete
     * @returns Promise<any>
     */
    async remove(bonDentree) {
        return this.delete(`${this.endpointSingleton}/${bonDentree.id}`);
    }
}
exports.BonsDentree = BonsDentree;
//# sourceMappingURL=BonsDentree.js.map