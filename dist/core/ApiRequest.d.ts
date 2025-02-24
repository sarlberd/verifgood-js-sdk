import { Auth } from "./Auth";
import { HttpClient } from "./HttpClient";
import { Metadatas } from "./Metadatas";
interface IApiRequest {
    getAll(metadatas: Metadatas): Promise<any>;
    getById(id: number): Promise<any>;
    create(data: any): Promise<any>;
    update(id: number, data: any): Promise<any>;
    remove(id: number): Promise<any>;
}
export declare abstract class ApiRequest extends HttpClient implements IApiRequest {
    abstract endpoint: string;
    abstract endpointSingleton: string;
    constructor(auth: Auth, apiBaseUrl: string);
    getAll(metadatas: Metadatas): Promise<any>;
    getById(id: number): Promise<any>;
    create(data: any): Promise<any>;
    update(id: number, data: any): Promise<any>;
    remove(id: number): Promise<any>;
}
export {};
