import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { Tag, TagCreateRequest, TagUpdateRequest } from "../types/Tags";

/**
 * Tags API request class
 * Service for managing tags
 */
export class Tags extends ApiRequest {
  endpoint: string = '/api/tags';
  endpointSingleton: string = '/api/tags';
  /**
   * List composant type
   * @returns Promise
   */
  listComposantType(): Promise<any> {
    // @TODO : custom logic may be needed
    // Using an empty Metadatas instance; adjust as needed
    const emptyMetadatas = new Metadatas();
    return this.get(`${this.endpoint}/composant-type`, emptyMetadatas, null);
  }
}
