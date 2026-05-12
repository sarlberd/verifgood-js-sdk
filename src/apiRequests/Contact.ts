import { ApiRequest } from "../core/ApiRequest";
import { Metadatas } from "../core/Metadatas";
import { Contac, ContacCreateRequest, ContacUpdateRequest } from "../types/Contact";

/**
 * Contact API request class
 * Service for managing contacts
 */
export class Contact extends ApiRequest {
  endpoint: string = '/api/contacts';
  endpointSingleton: string = '/api/contact';
}
