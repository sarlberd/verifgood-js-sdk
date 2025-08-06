"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibelProblem = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
const Metadatas_1 = require("../core/Metadatas");
/**
 * LibelProblem API request class
 * Service for managing libel problems
 */
class LibelProblem extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/libelles-probleme';
        this.endpointSingleton = '/api/libelle-probleme';
    }
    /**
     * Override getAll method for libelles probleme
     * @param metadatas Metadatas object
     * @returns Promise with libelles probleme data
     */
    async getAll(metadatas) {
        const query = {
            userId: null, // this.$app.appID equivalent
            metadatas: metadatas.get()
        };
        return this.get(this.endpoint, metadatas, query);
    }
    /**
     * Override create method for libelles probleme
     * @param libellesProblem Array of libelles problem to create
     * @returns Promise with created libelles problem
     */
    async create(libellesProblem) {
        //@TODO: need review - takes array instead of single object
        return this.post(this.endpoint, { datas: libellesProblem });
    }
    /**
     * Override remove method for libelles probleme
     * @param id Libelle problem ID
     * @returns Promise with deletion result
     */
    async remove(id) {
        return this.delete(`${this.endpointSingleton}/${id}`);
    }
    /**
     * Create problems for a specific component
     * @param idComposant Component ID
     * @param problems Array of problems to create
     * @returns Promise with created problems
     */
    async createComposantProblems(idComposant, problems) {
        //@TODO: need review - component-specific problem creation
        return this.post(`/api/composant/${idComposant}/libels-problems`, { datas: problems });
    }
    /**
     * Delete a specific component problem
     * @param problem Problem object with id and composant properties
     * @returns Promise with deletion result
     */
    async deleteComposantProblem(problem) {
        //@TODO: need review - requires problem object with specific structure
        return this.delete(`${this.endpointSingleton}/${problem.id}`);
    }
    /**
     * Get problems for a specific component
     * @param composantId Component ID
     * @returns Promise with component problems
     */
    async getComposantProblems(composantId) {
        const query = {
            userId: null // this.$app.appID equivalent
        };
        return this.get(`/api/composant/${composantId}/libelles-probleme`, new Metadatas_1.Metadatas(), query);
    }
    /**
     * Get libelles problem by category (generic and category-specific)
     * @param metadatas Metadatas object
     * @param idCategorie Category ID
     * @returns Promise with category-specific libelles problem
     */
    async getLibellesProblemByCategorie(metadatas, idCategorie) {
        const query = {
            userId: null, // this.$app.appID equivalent
            metadatas: metadatas.get()
        };
        return this.get(`/api/libelles-probleme/categorie/${idCategorie}/all`, metadatas, query);
    }
    /**
     * Get libels for equipment (placeholder method)
     * @returns Promise with equipment libels
     */
    async getLibelsEquipement() {
        //@TODO: need review - method was empty in original mixin, needs implementation
        return Promise.resolve([]);
    }
}
exports.LibelProblem = LibelProblem;
//# sourceMappingURL=LibelProblem.js.map