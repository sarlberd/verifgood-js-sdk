import { ApiRequest } from "../core/ApiRequest";
/**
 * Tags API request class
 * Service for managing tags
 */
export declare class Tags extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * List composant type
     * @returns Promise
     */
    listComposantType(): Promise<any>;
}
