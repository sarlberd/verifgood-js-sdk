"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tags = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
const Metadatas_1 = require("../core/Metadatas");
/**
 * Tags API request class
 * Service for managing tags
 */
class Tags extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/tags';
        this.endpointSingleton = '/api/tags';
    }
    /**
     * List composant type
     * @returns Promise
     */
    listComposantType() {
        // @TODO : custom logic may be needed
        // Using an empty Metadatas instance; adjust as needed
        const emptyMetadatas = new Metadatas_1.Metadatas();
        return this.get(`${this.endpoint}/composant-type`, emptyMetadatas, null);
    }
}
exports.Tags = Tags;
//# sourceMappingURL=Tags.js.map