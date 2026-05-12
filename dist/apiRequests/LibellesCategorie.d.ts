import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
/**
 * LibellesCategorie API request class
 * Service for managing libelles categories
 */
export declare class LibellesCategorie extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Override getAll method to get libelles categories with userId
     * @param metadatas Metadatas object
     * @returns Promise with libelles categories data
     */
    getAll(metadatas: Metadatas): Promise<any>;
    /**
     * Override create method for libelles categories
     * @param libellesCategories Array of libelles categories to create
     * @param options Optional parameters
     * @returns Promise with created libelles categories
     */
    create(libellesCategories: any[], options?: any): Promise<any>;
    /**
     * Override remove method for libelles categories
     * @param id Libelle categorie ID
     * @returns Promise with deletion result
     */
    remove(id: number): Promise<any>;
}
