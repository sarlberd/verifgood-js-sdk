"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parametres = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
const Metadatas_1 = require("../core/Metadatas");
/**
 * Parametres API Service
 * Handles application parameters operations including get, update, and demo account management.
 */
class Parametres extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/parameters';
        this.endpointSingleton = '/api/parameter';
    }
    /**
     * Get all application parameters
     * @returns Promise with parameters data
     */
    async getParameters() {
        // TODO: Original implementation uses empty query
        // Returns: datas (parameters object)
        const metadatas = new Metadatas_1.Metadatas();
        return this.get('/api/parameters', metadatas, {});
    }
    /**
     * Update application parameter
     * @param datas - The parameter data to update
     * @returns Promise with updated parameter data
     */
    async updateParameter(datas) {
        // TODO: Implement app context access and session storage - needs manual review
        // Original implementation:
        // - Adds userId from this.$app.appID to parameter object
        // - Updates session storage with returned parameter data
        // - Uses window.sessionStorage.getItem('user') and setItem('user', JSON.stringify(sessionUser))
        const parameter = {
            ...datas,
            // userId: this.$app.appID  // TODO: Implement app context access
        };
        const result = await this.apiRequest('PUT', '/api/parameter', { datas: parameter });
        // TODO: Implement session storage update - needs manual review
        // Original implementation:
        // let sessionUser = JSON.parse(window.sessionStorage.getItem('user'));
        // sessionUser = Object.assign({}, sessionUser, p);
        // window.sessionStorage.setItem('user', JSON.stringify(sessionUser));
        return result;
    }
    /**
     * Delete demo account data with specified entities
     * @param entitiesToRemove - Object specifying which entities to remove (optional)
     * @returns Promise with deletion result
     */
    async deleteDemoAccount(entitiesToRemove) {
        // TODO: Implement app context access - needs manual review
        // Original implementation requires: this.$app.appID
        // Default entities to remove if not specified
        const defaultEntitiesToRemove = {
            "maintenances": true,
            "equipements": true,
            "lieux": true,
            "contrats": true,
            "tiers": true,
            "contacts": true,
            "taches": false,
            "consommables": false,
            "categories": true
        };
        const entitiesToDelete = entitiesToRemove || defaultEntitiesToRemove;
        const datas = { id: null };
        const parameter = {
            ...datas,
            // userId: this.$app.appID  // TODO: Implement app context access
        };
        const queryString = `entitiesToRemove=${JSON.stringify(entitiesToDelete)}`;
        const endpoint = `/api/account/demo/datas?${queryString}`;
        return this.apiRequest('DELETE', endpoint, { datas: parameter });
    }
}
exports.Parametres = Parametres;
//# sourceMappingURL=Parametres.js.map