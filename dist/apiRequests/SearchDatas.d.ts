import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { SearchEntities, SearchDataItem } from "../types/SearchDatas";
/**
 * SearchDatas API request class
 * global search
 */
export declare class SearchDatas extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Perform a global search across multiple entities
     *
     * @param searchValue The search term
     * @param entities Optional entities configuration (defaults to all enabled)
     * @param userId Optional user ID for filtering (uses app context if not provided)
     * @param sites Optional sites restriction (uses app context if not provided)
     * @returns Promise<SearchDataItem[]>
     */
    search(searchValue: string, entities?: SearchEntities, userId?: string | null, sites?: string | null): Promise<SearchDataItem[]>;
    /**
     * Search specifically for equipements and lieux
     *
     * @param searchValue The search term
     * @param metadatas Metadatas for filtering and pagination
     * @param userId Optional user ID for filtering
     * @param sites Optional sites restriction
     * @returns Promise<SearchDataItem[]>
     */
    searchEquipements(searchValue: string, metadatas: Metadatas, userId?: string | null, sites?: string | null): Promise<SearchDataItem[]>;
    /**
     * Store search results in global context (Store/Vuex equivalent)
     * This mimics the original mixin's store dispatch functionality
     */
    private storeSearchResults;
    /**
     * Get user ID from app context
     */
    private getAppUserId;
    /**
     * Get sites restriction from app context
     */
    private getAppSites;
}
