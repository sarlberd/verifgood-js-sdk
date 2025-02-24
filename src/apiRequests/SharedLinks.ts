import {ApiRequest} from "../core/ApiRequest";


interface SharedLink {
  origin: string;
  internalId: number;
  scopes: string;
  expires_at?: string;
  name?: string;
  description?: string;
}
const origins = ["maintenance-curative"]
export class SharedLinks extends ApiRequest {
  endpoint: string = '/api/shared-links';
  endpointSingleton: string = '/api/shared-links';
}
