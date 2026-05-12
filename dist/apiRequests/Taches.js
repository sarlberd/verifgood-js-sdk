"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Taches = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
const Metadatas_1 = require("../core/Metadatas");
class Taches extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/taches';
        this.endpointSingleton = '/api/tache';
    }
    /**
     * Get all taches with optional site restrictions.
     * GET /taches
     * @param metadatas Metadatas object for query options
     * @param options Options for query modification
     * @returns Promise with list of taches
     */
    getTaches(metadatas, options = {}) {
        const query = {};
        if (options.restrictionSites) {
            query.sites = options.restrictionSites;
        }
        return this.get(this.endpoint, metadatas, query);
    }
    /**
     * Get taches overview statistics.
     * GET /taches/overview
     * @param metadatas Metadatas object for filters
     * @param options Options for query modification
     * @returns Promise with overview statistics
     */
    getTachesOverview(metadatas, options = {}) {
        const query = {};
        if (options.restrictionSites) {
            query.sites = options.restrictionSites;
        }
        return this.get(`${this.endpoint}/overview`, metadatas, query);
    }
    /**
     * Get a single tache by ID with checkpoints, affectations, sites and linked equipements.
     * GET /tache/{id}
     * @param id The tache ID
     * @returns Promise with tache details
     */
    getTache(id) {
        return this.get(`${this.endpointSingleton}/${id}`, new Metadatas_1.Metadatas(), {});
    }
    /**
     * Create multiple taches with checkpoints.
     * POST /taches
     * @param taches Array of tache objects to create
     * @param restrictionSites Optional site restrictions
     * @returns Promise with created taches
     */
    createTaches(taches, restrictionSites = null) {
        const data = { datas: taches };
        if (restrictionSites) {
            data.restrictionSites = restrictionSites;
        }
        return this.post(this.endpoint, data);
    }
    /**
     * Update a tache with its related entities.
     * PUT /tache/{id}
     * @param tache The tache object to update
     * @param updatedTacheSites Optional updated tache sites
     * @returns Promise with updated tache
     */
    updateTache(tache, updatedTacheSites = null) {
        const datasTache = { ...tache };
        if (updatedTacheSites) {
            datasTache.tacheSites = updatedTacheSites;
        }
        return this.put(`${this.endpointSingleton}/${tache.id}`, { datas: datasTache });
    }
    /**
     * Delete a tache and all its associations.
     * DELETE /tache/{id}
     * @param tache The tache object to delete
     * @returns Promise with deletion confirmation
     */
    deleteTache(tache) {
        return this.delete(`${this.endpointSingleton}/${tache.id}`);
    }
    /**
     * Export taches to Excel/CSV file.
     * GET /taches/export/{format}
     * @param metadatas Metadatas for the export
     * @param filename Optional filename prefix
     * @param fileExtension File extension: 'xlsx' or 'csv'
     * @returns Promise with export data
     */
    getExcelFile(metadatas, filename = null, fileExtension = 'xlsx') {
        const fileType = fileExtension !== 'csv' ? 'excel' : 'csv';
        return this.get(`${this.endpoint}/export/${fileType}`, metadatas, {});
    }
}
exports.Taches = Taches;
//# sourceMappingURL=Taches.js.map