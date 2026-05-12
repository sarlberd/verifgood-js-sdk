import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { Document, DocumentCreateRequest, DocumentUpdateRequest } from "../types/Documents";

/**
 * Documents API request class
 * Service for managing documents and plans
 */
export class Documents extends ApiRequest {
  endpoint: string = '/api/documents';
  endpointSingleton: string = '/api/document';

  /**
   * Get documents with metadata filters
   * @param metadatas Metadatas directives and filters to apply
   * @returns Promise<any>
   */
  async getAll(metadatas: Metadatas): Promise<any> {
    return this.get(this.endpoint, metadatas, {});
  }

  /**
   * Get document plans with site restrictions
   * @param metadatas Metadatas directives and filters to apply
   * @param sites Site restrictions
   * @returns Promise<any>
   */
  async getPlans(metadatas: Metadatas, sites?: string): Promise<any> {
    const query = {
      sites
    };
    return this.get(`${this.endpointSingleton}/plans`, metadatas, query);
  }

  /**
   * Create documents
   * @param documents Array of documents to create
   * @returns Promise<any>
   */
  async create(documents: any[]): Promise<any> {
    return this.post(this.endpoint, { datas: documents });
  }

  /**
   * Update document with custom data structure
   * @param document Document to update
   * @returns Promise<any>
   */
  async update(document: any): Promise<any> {
    return this.put(`${this.endpointSingleton}/${document.id}`, { datas: [document] });
  }

  /**
   * Delete document
   * @param document Document to delete
   * @returns Promise<any>
   */
  async remove(document: any): Promise<any> {
    return this.delete(`${this.endpointSingleton}/${document.id}`);
  }
}
