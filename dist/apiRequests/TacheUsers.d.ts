import { ApiRequest } from "../core/ApiRequest";
/**
 * TacheUsers API request class
 * Handles task user assignment operations
 */
export declare class TacheUsers extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Create tache user assignments
     * @param tacheUsers any[] - Array of tache user assignment objects
     * @param tacheId number - The tache ID to assign users to
     * @param userId number | null - Optional user ID for context
     * @returns Promise<any> - Created assignments
     */
    createTacheUsers(tacheUsers: any[], tacheId: number, userId?: number | null): Promise<any>;
    /**
     * Delete all user assignments from a tache
     * @param tacheId number - The tache ID
     * @returns Promise<any>
     */
    deleteTacheUsers(tacheId: number): Promise<any>;
    /**
     * Delete a specific user assignment from a tache
     * @param tacheId number - The tache ID
     * @param userId number - The user ID to remove
     * @returns Promise<any>
     */
    deleteTacheUser(tacheId: number, userId: number): Promise<any>;
    /**
     * Custom post method to handle query parameters for tache user creation
     * @param endpoint string - The API endpoint
     * @param data any - The data to send
     * @param query object - Query parameters
     * @returns Promise<any>
     */
    private postWithQuery;
}
