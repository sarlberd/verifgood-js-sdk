import {Metadatas} from "../core/Metadatas";
import {ApiRequest} from "../core/ApiRequest";

export class Lieux extends ApiRequest {
  endpoint: string = '/api/lieux';
  endpointSingleton: string = '/api/lieu';
  async getSites(metadatas: Metadatas, restrictionSite: string): Promise<any> {
    // à gérer plus haut if (restrictionSite) metadatas.setFilter("path", restrictionSite.split("|"), "start_with");
    return this.get(this.endpoint, metadatas, null);
  }
}