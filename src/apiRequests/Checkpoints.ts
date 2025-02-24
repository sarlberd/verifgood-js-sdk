import {ApiRequest} from "../core/ApiRequest";

export class Checkpoints extends ApiRequest {
    endpoint: string = '/api/checkpoints';
    endpointSingleton: string = '/api/checkpoints';
}