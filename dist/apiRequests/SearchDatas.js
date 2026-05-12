"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchDatas = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
const Metadatas_1 = require("../core/Metadatas");
const Logger_1 = __importDefault(require("../utils/Logger"));
/**
 * SearchDatas API request class
 * global search
 */
class SearchDatas extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/search-datas';
        this.endpointSingleton = '/api/search-datas';
    }
    /**
     * Perform a global search across multiple entities
     *
     * @param searchValue The search term
     * @param entities Optional entities configuration (defaults to all enabled)
     * @param userId Optional user ID for filtering (uses app context if not provided)
     * @param sites Optional sites restriction (uses app context if not provided)
     * @returns Promise<SearchDataItem[]>
     */
    async search(searchValue, entities, userId, sites) {
        const query = {
            userId: userId !== null && userId !== void 0 ? userId : this.getAppUserId(),
            searchValue: searchValue,
            entities: entities !== null && entities !== void 0 ? entities : {
                equipements: true,
                lieux: true,
                maintenances: true,
                contrats: true,
                tiers: true,
                categories: true,
                interventions: true,
                contacts: true
            },
            sites: sites !== null && sites !== void 0 ? sites : this.getAppSites()
        };
        try {
            // Use inherited get method with empty metadatas and query params
            const emptyMetadatas = new Metadatas_1.Metadatas();
            const response = await this.get(this.endpoint, emptyMetadatas, query);
            // Store results in global context if available
            this.storeSearchResults(response);
            return response.data || response || [];
        }
        catch (error) {
            Logger_1.default.logError(error);
            throw error;
        }
    }
    /**
     * Search specifically for equipements and lieux
     *
     * @param searchValue The search term
     * @param metadatas Metadatas for filtering and pagination
     * @param userId Optional user ID for filtering
     * @param sites Optional sites restriction
     * @returns Promise<SearchDataItem[]>
     */
    async searchEquipements(searchValue, metadatas, userId, sites) {
        const query = {
            userId: userId !== null && userId !== void 0 ? userId : this.getAppUserId(),
            searchValue: searchValue,
            sites: sites !== null && sites !== void 0 ? sites : this.getAppSites()
        };
        try {
            // Use inherited get method with metadatas and query params
            const equipementsEndpoint = `${this.endpoint}/equipements`;
            // Override the endpoint temporarily to use the equipements endpoint
            const originalEndpoint = this.endpoint;
            this.endpoint = equipementsEndpoint;
            const response = await this.get(this.endpoint, metadatas, query);
            // Restore original endpoint
            this.endpoint = originalEndpoint;
            // Store results in global context if available
            this.storeSearchResults(response);
            return response.data || response || [];
        }
        catch (error) {
            Logger_1.default.logError(error);
            throw error;
        }
    }
    /**
     * Store search results in global context (Store/Vuex equivalent)
     * This mimics the original mixin's store dispatch functionality
     */
    storeSearchResults(response) {
        // @TODO: Implement store dispatch functionality
        // Original mixin calls:
        // this.$store.dispatch("SearchDatasStore/setDatas", datas);
        // this.$store.dispatch("SearchDatasStore/setCounters", metas.counters);
        // this.$store.dispatch("SearchDatasStore/setEntities", metas.entities);
        // this.$store.dispatch("SearchDatasStore/setFilters", metas.filters);
        // Need to review how to integrate with Vue store in framework-agnostic way
    }
    /**
     * Get user ID from app context
     */
    getAppUserId() {
        // @TODO: Implement app context integration
        // Original mixin uses: this.$app.appID
        // Need to review how to access user ID in framework-agnostic way
        return null;
    }
    /**
     * Get sites restriction from app context
     */
    getAppSites() {
        // @TODO: Implement app context integration  
        // Original mixin uses: this.$app.restrictionsite
        // Need to review how to access sites restriction in framework-agnostic way
        return null;
    }
}
exports.SearchDatas = SearchDatas;
//# sourceMappingURL=SearchDatas.js.map