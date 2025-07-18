import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
/**
 * Documents API request class
 * Service for managing documents and plans
 */
export declare class Documents extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Get documents with metadata filters
     * @param metadatas Metadatas directives and filters to apply
     * @returns Promise<any>
     */
    getAll(metadatas: Metadatas): Promise<any>;
    /**
     * Get document plans with site restrictions
     * @param metadatas Metadatas directives and filters to apply
     * @param sites Site restrictions
     * @returns Promise<any>
     */
    getPlans(metadatas: Metadatas, sites?: string): Promise<any>;
    /**
     * Create documents
     * @param documents Array of documents to create
     * @returns Promise<any>
     */
    create(documents: any[]): Promise<any>;
    /**
     * Update document with custom data structure
     * @param document Document to update
     * @returns Promise<any>
     */
    update(document: any): Promise<any>;
    /**
     * Delete document
     * @param document Document to delete
     * @returns Promise<any>
     */
    remove(document: any): Promise<any>;
}
