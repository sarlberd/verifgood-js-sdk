"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibelServices = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
/**
 * LibelServices API request class
 *
 */
class LibelServices extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/libel-services';
        this.endpointSingleton = '/api/libel-service';
    }
    /**
     * Get all libel services with custom options
     * Overrides the base getAll method to handle metadatas and site restriction
     *
     * @param metadatas - Metadatas object
     * @param options - Options for the request
     * @returns Promise with libel services data
     */
    async getAll(metadatas, options = {}) {
        const { _stored = true, _restrictionSite = false, _all = false } = options;
        const query = {
            userId: null, // this.$app.appID equivalent
            metadatas: metadatas.get()
        };
        if (_restrictionSite && !_all) {
            query.site = null; // this.$app.restrictionsite equivalent
        }
        return this.get(this.endpoint, metadatas, query);
    }
    /**
     * Create libel services
     * Overrides the base create method to handle the "datas" wrapper
     *
     * @param libelServices - Array of libel services to create
     * @returns Promise with created libel services
     */
    async create(libelServices) {
        const payload = { datas: libelServices };
        return this.post(this.endpoint, payload);
    }
    /**
     * Delete a libel service
     * Custom method to handle libel service deletion with object parameter
     *
     * @param libelService - The libel service to delete
     * @returns Promise with deletion result
     */
    async deleteLibelService(libelService) {
        if (!libelService.id) {
            throw new Error('LibelService ID is required for deletion');
        }
        return this.delete(`${this.endpointSingleton}/${libelService.id}`);
    }
}
exports.LibelServices = LibelServices;
//# sourceMappingURL=LibelServices.js.map