"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Documents = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
/**
 * Documents API request class
 * Service for managing documents and plans
 */
class Documents extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/documents';
        this.endpointSingleton = '/api/document';
    }
    /**
     * Get documents with metadata filters
     * @param metadatas Metadatas directives and filters to apply
     * @returns Promise<any>
     */
    async getAll(metadatas) {
        return this.get(this.endpoint, metadatas, {});
    }
    /**
     * Get document plans with site restrictions
     * @param metadatas Metadatas directives and filters to apply
     * @param sites Site restrictions
     * @returns Promise<any>
     */
    async getPlans(metadatas, sites) {
        const query = {
            sites
        };
        return this.get(`${this.endpointSingleton}/plans`, metadatas, query);
    }
    /**
     * Create documents
     * @param documents Array of documents to create
     * @returns Promise<any>
     */
    async create(documents) {
        return this.post(this.endpoint, { datas: documents });
    }
    /**
     * Update document with custom data structure
     * @param document Document to update
     * @returns Promise<any>
     */
    async update(document) {
        return this.put(`${this.endpointSingleton}/${document.id}`, { datas: [document] });
    }
    /**
     * Delete document
     * @param document Document to delete
     * @returns Promise<any>
     */
    async remove(document) {
        return this.delete(`${this.endpointSingleton}/${document.id}`);
    }
}
exports.Documents = Documents;
//# sourceMappingURL=Documents.js.map