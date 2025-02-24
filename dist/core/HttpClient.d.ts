import { Auth } from './Auth';
import { Metadatas } from './Metadatas';
export declare class HttpClient {
    auth: Auth;
    apiBaseUrl: string;
    constructor(auth: Auth, apiBaseUrl: string);
    get(endpoint: string, metadatas: Metadatas, query: null | {
        [key: string]: any;
    }): Promise<any>;
    post(endpoint: string, data: any): Promise<any>;
    put(endpoint: string, data: any): Promise<any>;
    delete(endpoint: string): Promise<any>;
    /**
     *
     * @param Metadatas metadatas
     * @returns string query
     */
    parseMetadata(metadatas: Metadatas): string;
    apiRequest(endpoint: string, method: string, data: any): Promise<any>;
}
