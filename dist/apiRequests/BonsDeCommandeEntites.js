"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BonsDeCommandeEntites = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
/**
 * BonsDeCommandeEntites API request class
 * Service for managing purchase order entities (bons de commande entites)
 */
class BonsDeCommandeEntites extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/bons-de-commande-entites';
        this.endpointSingleton = '/api/bons-de-commande-entite';
    }
    /**
     * Get all bons de commande entites (override base method to match mixin behavior)
     * @param metadatas - The metadatas object
     * @returns Promise<any>
     */
    async getEntites(metadatas) {
        return this.get(this.endpoint, metadatas, {});
    }
    /**
     * Override the default getAll to use getEntites method
     * @param metadatas - The metadatas object
     * @returns Promise<any>
     */
    async getAll(metadatas) {
        return this.getEntites(metadatas);
    }
    /**
     * Override the default create to match the mixin behavior
     * @param bonsDeCommandeEntites - Array of bons de commande entites
     * @returns Promise<any>
     */
    async create(bonsDeCommandeEntites) {
        return this.post(this.endpoint, { datas: bonsDeCommandeEntites });
    }
    /**
     * Override the default update to match the mixin behavior
     * @param bonsDeCommandeEntite - The bon de commande entite to update
     * @returns Promise<any>
     */
    async update(bonsDeCommandeEntite) {
        return this.put(`${this.endpointSingleton}/${bonsDeCommandeEntite.id}`, { datas: bonsDeCommandeEntite });
    }
    /**
     * Override the default remove to match the mixin behavior
     * @param bonsDeCommandeEntite - The bon de commande entite to delete
     * @returns Promise<any>
     */
    async remove(bonsDeCommandeEntite) {
        return this.delete(`${this.endpointSingleton}/${bonsDeCommandeEntite.id}`);
    }
}
exports.BonsDeCommandeEntites = BonsDeCommandeEntites;
//# sourceMappingURL=BonsDeCommandeEntites.js.map