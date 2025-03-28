import { ApiRequest } from "../core/ApiRequest";
import { Checkpoints } from "./Checkpoints";
export declare class Taches extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    checkpointsApi: Checkpoints;
    constructor(auth: any, apiBaseUrl: string);
}
