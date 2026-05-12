"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibellesCategorie = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
/**
 * LibellesCategorie API request class
 * Service for managing libelles categories
 */
class LibellesCategorie extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/libelles-categorie';
        this.endpointSingleton = '/api/libelle-categorie';
    }
    /**
     * Override getAll method to get libelles categories with userId
     * @param metadatas Metadatas object
     * @returns Promise with libelles categories data
     */
    async getAll(metadatas) {
        const query = {
            userId: null, // this.$app.appID equivalent
            metadatas: metadatas.get()
        };
        return this.get(this.endpoint, metadatas, query);
    }
    /**
     * Override create method for libelles categories
     * @param libellesCategories Array of libelles categories to create
     * @param options Optional parameters
     * @returns Promise with created libelles categories
     */
    async create(libellesCategories, options = { _stored: true }) {
        //@TODO: need review - takes array and has custom options parameter
        const result = await this.post('/api/libelles-categories', { datas: libellesCategories });
        // Note: Original method had store dispatch logic for _stored option
        // This would need to be handled by the calling code
        return result.datas;
    }
    /**
     * Override remove method for libelles categories
     * @param id Libelle categorie ID
     * @returns Promise with deletion result
     */
    async remove(id) {
        const result = await this.delete(`${this.endpointSingleton}/${id}`);
        return { libelleCategorie: result };
    }
}
exports.LibellesCategorie = LibellesCategorie;
//# sourceMappingURL=LibellesCategorie.js.map