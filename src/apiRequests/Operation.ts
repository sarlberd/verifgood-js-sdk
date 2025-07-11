import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { Operation as OperationType, OperationCreateRequest, OperationUpdateRequest, createDefaultOperation } from "../types/Operation";

/**
 * Operation API request class
 * Service for managing operations and interventions
 */
export class Operation extends ApiRequest {
  endpoint: string = '/api/operations';
  endpointSingleton: string = '/api/operation';

  /**
   * Creates a new Operation object with default values
   * Replaces the Vue.js mixin data functionality
   */
  createNew(idUser?: string, userId?: string): OperationType {
    return createDefaultOperation(idUser, userId);
  }

  /**
   * Create BI Operation
   * @param data Operation data including ficheSav, tiers, uploadedFile, action
   * @param idUser Current user ID
   * @param userId App/User ID
   * @returns Promise with response
   */
  createBIOperation(data: any, idUser?: string, userId?: string): Promise<any> {
    //@TODO: complex logic - need manual review
    const payload = {
      operation: "Bon Intervention",
      ficheSav: data.ficheSav,
      tiers: data.tiers,
      __uploadedFile: data.__uploadedFile?.id,
      __action: data.__action,
      dateOperation: new Date().toISOString().slice(0, 19).replace('T', ' '),
      idUser: idUser,
      userId: userId
    };
    return this.post('/api/V2.0/Operation', payload);
  }

  /**
   * Create Photo Operation
   * @param idFM Fiche maintenance ID
   * @param file Uploaded file object
   * @param idUser Current user ID
   * @param userId App/User ID
   * @returns Promise with response
   */
  createPhotoOperation(idFM: string, file: any, idUser?: string, userId?: string): Promise<any> {
    const payload = {
      __action: "photo",
      __uploadedFile: file.id,
      ficheSav: idFM,
      dateOperation: new Date().toISOString().slice(0, 19).replace('T', ' '),
      idUser: idUser,
      userId: userId
    };
    return this.post('/api/V2.0/Operation', payload);
  }

  /**
   * Update Operation using V2.0 endpoint
   * @param data Operation data to update
   * @returns Promise with response
   */
  updateOperation(data: any): Promise<any> {
    //@TODO: uses different endpoint than standard update - need manual review
    return this.put('/api/V2.0/Put/Operation', data);
  }

  /**
   * Export operations to file (CSV or Excel)
   * @param metadatas Metadatas for filtering
   * @param fileExtension File extension (csv or excel)
   * @param userId App/User ID
   * @param sites Site restriction
   * @returns Promise that resolves when download starts
   */
  async getFile(metadatas: Metadatas, fileExtension: string = "csv", userId?: string, sites?: string): Promise<any> {
    //@TODO: complex file download logic - need manual review
    const query = {
      userId: userId,
      sites: sites || '',
    };
    
    metadatas.setDirectives([]);
    const fileType = fileExtension !== "csv" ? "excel" : "csv";

    // Note: File download implementation needs to be adapted for the SDK context
    return this.get(`/api/operations/export/${fileType}`, metadatas, query);
  }
}
