import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
/**
 * SortieEquipement API request class
 * Service for managing equipment output/exit operations
 */
export declare class SortieEquipement extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Get equipment output/exit types
     *
     * @param metadatas Metadatas for filtering and pagination
     * @returns Promise with types data and metadata
     */
    getTypes(metadatas: Metadatas): Promise<{
        datas: any[];
        metadatas: any;
    }>;
    /**
     * Get user ID from app context
     * @TODO: Implement app context integration
     * Original mixin uses: this.$app.appID
     */
    private getAppUserId;
}
