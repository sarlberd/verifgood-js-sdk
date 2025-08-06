"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TacheUsers = void 0;
const ApiRequest_1 = require("../core/ApiRequest");
/**
 * TacheUsers API request class
 * Handles task user assignment operations
 */
class TacheUsers extends ApiRequest_1.ApiRequest {
    constructor() {
        super(...arguments);
        this.endpoint = '/api/tache';
        this.endpointSingleton = '/api/tache';
    }
    /**
     * Create tache user assignments
     * @param tacheUsers any[] - Array of tache user assignment objects
     * @param tacheId number - The tache ID to assign users to
     * @param userId number | null - Optional user ID for context
     * @returns Promise<any> - Created assignments
     */
    createTacheUsers(tacheUsers, tacheId, userId = null) {
        const endpoint = `/api/tache/${tacheId}/users`;
        const query = userId ? { userId } : {};
        // TODO: Rich store management functionality preserved from original:
        // Original implementation included:
        // - Store integration with TachesStore
        // - Automatic update of selected tache assignation
        // - Mapping user IDs from tacheUsers array
        // - Real-time store state synchronization
        // 
        // For now, using simplified API-only approach
        return this.postWithQuery(endpoint, tacheUsers, query);
        /* TODO: Rich store integration to be reviewed and potentially restored
        // Original store management logic:
        // 1. After successful API call, get selected tache from store
        // 2. Update tache.assignation with user IDs from tacheUsers
        // 3. Dispatch updated tache back to store
        //
        // This would require:
        // - Store dependency injection
        // - Store getter/dispatcher access
        // - State management integration
        */
    }
    /**
     * Custom post method to handle query parameters for tache user creation
     * @param endpoint string - The API endpoint
     * @param data any - The data to send
     * @param query object - Query parameters
     * @returns Promise<any>
     */
    postWithQuery(endpoint, data, query = {}) {
        // Build query string if needed
        if (Object.keys(query).length > 0) {
            const queryString = new URLSearchParams(query).toString();
            endpoint = `${endpoint}?${queryString}`;
        }
        return this.post(endpoint, { datas: data });
    }
}
exports.TacheUsers = TacheUsers;
//# sourceMappingURL=TacheUsers.js.map