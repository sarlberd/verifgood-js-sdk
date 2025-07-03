"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContratEcheancier = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
const Metadatas_1 = require("../core/Metadatas");
/**
 * ContratEcheancier API request class
 * Service for managing contract payment schedules (echeances)
 */
class ContratEcheancier extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/contrats/echeances';
        this.endpointSingleton = '/api/contrat/echeance';
    }
    /**
     * Get echeances for a specific contract
     * @param contratId - The contract ID
     * @returns Promise<any>
     */
    async getContratEcheances(contratId) {
        const metadatas = new Metadatas_1.Metadatas();
        metadatas.setDirectives([]);
        return this.get(`/api/contrat/${contratId}/echeances`, metadatas, {});
    }
    /**
     * Create contract echeances with userId
     * @param data - The contract echeances data
     * @returns Promise<any>
     */
    async create(data) {
        return this.post(`${this.endpoint}`, data);
    }
    /**
     * Update contract echeance with userId
     * @param id - The echeance ID
     * @param data - The update data
     * @returns Promise<any>
     */
    async updateContratEcheance(id, data) {
        return this.put(`${this.endpointSingleton}/${id}`, data);
    }
    /**
     * Delete contract echeance with userId
     * @param id - The echeance ID
     * @returns Promise<any>
     */
    async deleteContratEcheance(id) {
        return super.delete(`${this.endpointSingleton}/${id}`);
    }
}
exports.ContratEcheancier = ContratEcheancier;
//# sourceMappingURL=ContratEcheancier.js.map