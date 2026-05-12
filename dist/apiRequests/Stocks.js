"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stocks = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
const Metadatas_1 = require("../core/Metadatas");
/**
 * Stocks API request class
 * Service for managing stocks, depots and fiche demande consommables
 */
class Stocks extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/stocks';
        this.endpointSingleton = '/api/fiche-demande-consommables';
    }
    /**
     * Get Depots.
     *
     * @param metadatas Metadatas for filtering
     * @returns Promise with depots data
     */
    getDepots(metadatas = new Metadatas_1.Metadatas()) {
        const query = {
            userId: null
        };
        return this.get('/api/depots', metadatas, query);
    }
    /**
     * Get Stocks (overrides parent getAll method)
     *
     * @param metadatas Metadatas for filtering
     * @returns Promise with stocks data
     */
    async getAll(metadatas) {
        const query = {
            userId: null
        };
        return this.get('/api/stocks', metadatas, query);
    }
    /**
     * Get Bon de sortie by id
     * @deprecated Use getById instead - this method does the same as parent getById
     *
     * @param idFiche ID of the fiche
     * @returns Promise with fiche data
     */
    getFiche(idFiche) {
        return this.apiRequest(`/api/fiche-demande-consommables/${idFiche}`, 'GET', null);
    }
    /**
     * Create fiche-demande-consommables (overrides parent create method)
     *
     * @param stocks Stocks data to create
     * @returns Promise with created data
     */
    async create(stocks) {
        return this.post('/api/fiche-demande-consommables', { datas: stocks });
    }
    /**
     * Update fiche-demande-consommables (overrides parent update method)
     *
     * @param id ID of the item to update
     * @param bonDeCommande Data to update
     * @returns Promise with updated data
     */
    async update(id, bonDeCommande) {
        return this.put(`/api/fiche-demande-consommables/${id}`, { datas: bonDeCommande });
    }
    /**
     * Delete fiche-demande-consommables (overrides parent remove method)
     *
     * @param id ID of the item to delete
     * @returns Promise with deletion result
     */
    async remove(id) {
        return this.delete(`/api/fiche-demande-consommables/${id}`);
    }
}
exports.Stocks = Stocks;
//# sourceMappingURL=Stocks.js.map