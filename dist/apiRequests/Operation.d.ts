import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { Operation as OperationType } from "../types/Operation";
/**
 * Operation API request class
 * Service for managing operations and interventions
 */
export declare class Operation extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    /**
     * Creates a new Operation object with default values
     * Replaces the Vue.js mixin data functionality
     */
    createNew(idUser?: string, userId?: string): OperationType;
    /**
     * Create BI Operation
     * @param data Operation data including ficheSav, tiers, uploadedFile, action
     * @param idUser Current user ID
     * @param userId App/User ID
     * @returns Promise with response
     */
    createBIOperation(data: any, idUser?: string, userId?: string): Promise<any>;
    /**
     * Create Photo Operation
     * @param idFM Fiche maintenance ID
     * @param file Uploaded file object
     * @param idUser Current user ID
     * @param userId App/User ID
     * @returns Promise with response
     */
    createPhotoOperation(idFM: string, file: any, idUser?: string, userId?: string): Promise<any>;
    /**
     * Update Operation using V2.0 endpoint
     * @param data Operation data to update
     * @returns Promise with response
     */
    updateOperation(data: any): Promise<any>;
    /**
     * Export operations to file (CSV or Excel)
     * @param metadatas Metadatas for filtering
     * @param fileExtension File extension (csv or excel)
     * @param userId App/User ID
     * @param sites Site restriction
     * @returns Promise that resolves when download starts
     */
    getFile(metadatas: Metadatas, fileExtension?: string, userId?: string, sites?: string): Promise<any>;
}
