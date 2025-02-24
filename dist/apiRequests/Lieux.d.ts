import { Metadatas } from "../core/Metadatas";
import { ApiRequest } from "../core/ApiRequest";
export declare class Lieux extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    getSites(metadatas: Metadatas, restrictionSite: string): Promise<any>;
}
