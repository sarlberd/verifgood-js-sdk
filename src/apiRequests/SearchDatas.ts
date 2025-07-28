import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import Logger from '../utils/Logger';
import { 
    SearchData, 
    SearchDataCreateRequest, 
    SearchDataUpdateRequest,
    SearchDataRequest,
    SearchDataResponse,
    SearchEntities,
    SearchDataItem
} from "../types/SearchDatas";

/**
 * SearchDatas API request class
 * global search
 */
export class SearchDatas extends ApiRequest {
    endpoint: string = '/api/search-datas';
    endpointSingleton: string = '/api/search-datas';

    /**
     * Perform a global search across multiple entities
     * 
     * @param searchValue The search term
     * @param entities Optional entities configuration (defaults to all enabled)
     * @param userId Optional user ID for filtering (uses app context if not provided)
     * @param sites Optional sites restriction (uses app context if not provided)
     * @returns Promise<SearchDataItem[]>
     */
    async search(
        searchValue: string, 
        entities?: SearchEntities,
        userId?: string | null,
        sites?: string | null
    ): Promise<SearchDataItem[]> {
        const query = {
            userId: userId ?? this.getAppUserId(),
            searchValue: searchValue,
            entities: entities ?? {
                equipements: true,
                lieux: true,
                maintenances: true,
                contrats: true,
                tiers: true,
                categories: true,
                interventions: true,
                contacts: true
            },
            sites: sites ?? this.getAppSites()
        };

        try {
            // Use inherited get method with empty metadatas and query params
            const emptyMetadatas = new Metadatas();
            const response = await this.get(this.endpoint, emptyMetadatas, query);
            
            // Store results in global context if available
            this.storeSearchResults(response);
            
            return response.data || response || [];
        } catch (error) {
            Logger.logError(error);
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
    async searchEquipements(
        searchValue: string,
        metadatas: Metadatas,
        userId?: string | null,
        sites?: string | null
    ): Promise<SearchDataItem[]> {
        const query = {
            userId: userId ?? this.getAppUserId(),
            searchValue: searchValue,
            sites: sites ?? this.getAppSites()
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
        } catch (error) {
            Logger.logError(error);
            throw error;
        }
    }

    /**
     * Store search results in global context (Store/Vuex equivalent)
     * This mimics the original mixin's store dispatch functionality
     */
    private storeSearchResults(response: any): void {
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
    private getAppUserId(): string | null {
        // @TODO: Implement app context integration
        // Original mixin uses: this.$app.appID
        // Need to review how to access user ID in framework-agnostic way
        return null;
    }

    /**
     * Get sites restriction from app context
     */
    private getAppSites(): string | null {
        // @TODO: Implement app context integration  
        // Original mixin uses: this.$app.restrictionsite
        // Need to review how to access sites restriction in framework-agnostic way
        return null;
    }
}
