"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contrat = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
const Metadatas_1 = require("../core/Metadatas");
/**
 * Contrat API request class
 * Service for managing contracts
 */
class Contrat extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/contrats';
        this.endpointSingleton = '/api/contrat';
    }
    /**
     * Get contracts with site restrictions
     * @param metadatas - The metadatas object
     * @returns Promise<any>
     */
    async getContrats(metadatas) {
        const query = {
            sites: null //@TODO: Extract site restrictions from app context - this will be handled manually by devs
        };
        return this.get(this.endpoint, metadatas, query);
    }
    /**
     * Fetch contracts (deprecated - use getContrats instead)
     * @param metadatas - The metadatas object
     * @returns Promise<any>
     * @deprecated
     */
    async fetchContrats(metadatas = { "directives": [], "filters": [] }) {
        const query = {
            sites: null, //@TODO: Extract site restrictions from app context - this will be handled manually by devs
            metadatas: metadatas
        };
        return this.get(this.endpoint, new Metadatas_1.Metadatas(), query);
    }
    /**
     * Fetch single contract by ID (deprecated - use get instead)
     * @param idContrat - The contract ID
     * @param options - Options object
     * @returns Promise<any>
     * @deprecated
     */
    async fetchContrat(idContrat, options = { skipVueXStorage: false }) {
        return this.get(`${this.endpointSingleton}/${idContrat}`, new Metadatas_1.Metadatas(), {});
    }
    /**
     * Create a contract
     * @param data - The contract data
     * @returns Promise<any>
     */
    async create(data) {
        const payload = {
            datas: [data]
        };
        return this.post(this.endpoint, payload);
    }
    /**
     * Update a contract
     * @param contrat - The contract object
     * @param options - Options object
     * @returns Promise<any>
     */
    async updateContrat(contrat, options = { skipVueXStorage: false }) {
        // Remove fields that shouldn't be updated
        const contractToUpdate = { ...contrat };
        delete contractToUpdate.tiers_name;
        delete contractToUpdate.tiers_uid;
        return this.put(`${this.endpointSingleton}/${contrat.id}`, contractToUpdate);
    }
    /**
     * Archive a contract
     * @param contrat - The contract object
     * @param options - Options object
     * @returns Promise<any>
     */
    async archive(contrat, options = { skipVueXStorage: false }) {
        const contractArchived = {
            id: contrat.id,
            isArchived: "1"
        };
        return this.put(`${this.endpointSingleton}/${contractArchived.id}`, contractArchived);
    }
    /**
     * Delete a contract (deprecated)
     * @param contrat - The contract object
     * @returns Promise<any>
     * @deprecated
     */
    async deleteContrat(contrat) {
        return super.delete(`${this.endpointSingleton}/${contrat.id}`);
    }
    /**
     * Attach categories to a contract (deprecated)
     * @param categoriesContrat - Array of categories
     * @returns Promise<any>
     * @deprecated
     */
    async attachCategoriesToContrat(categoriesContrat) {
        //@TODO: This method uses a different host (v2) - needs manual review
        return this.post('/api/tier/contrat/categories', categoriesContrat);
    }
    /**
     * Format contract status (deprecated - should be moved to client-side utility)
     * @param contrat - The contract object
     * @returns string
     * @deprecated
     */
    formatStatus(contrat) {
        //@TODO: This utility method should be moved to client-side utilities - this will be handled manually by devs
        // For now, return a placeholder
        return "Status formatting not implemented - move to client utilities";
    }
}
exports.Contrat = Contrat;
//# sourceMappingURL=Contrat.js.map