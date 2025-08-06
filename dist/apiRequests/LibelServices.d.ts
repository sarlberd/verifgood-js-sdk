import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { LibelService, LibelServiceCreateRequest } from "../types/LibelServices";
/**
 * LibelServices API request class
 *
 */
export declare class LibelServices extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Get all libel services with custom options
     * Overrides the base getAll method to handle metadatas and site restriction
     *
     * @param metadatas - Metadatas object
     * @param options - Options for the request
     * @returns Promise with libel services data
     */
    getAll(metadatas: Metadatas, options?: {
        _stored?: boolean;
        _restrictionSite?: boolean;
        _all?: boolean;
    }): Promise<any>;
    /**
     * Create libel services
     * Overrides the base create method to handle the "datas" wrapper
     *
     * @param libelServices - Array of libel services to create
     * @returns Promise with created libel services
     */
    create(libelServices: LibelServiceCreateRequest[]): Promise<any>;
    /**
     * Delete a libel service
     * Custom method to handle libel service deletion with object parameter
     *
     * @param libelService - The libel service to delete
     * @returns Promise with deletion result
     */
    deleteLibelService(libelService: LibelService): Promise<any>;
}
