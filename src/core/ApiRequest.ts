import {Auth} from "./Auth";
import {HttpClient} from "./HttpClient";
import {Metadatas} from "./Metadatas";

interface IApiRequest {
    getAll(metadatas: Metadatas): Promise<any>;
    getById(id: number): Promise<any>;
    create(data: any): Promise<any>;
    update(id: number, data: any): Promise<any>;
    remove(id: number): Promise<any>;
  }

export abstract class ApiRequest extends HttpClient implements IApiRequest {
    abstract endpoint: string;
    abstract endpointSingleton: string;
    constructor(auth: Auth, apiBaseUrl: string) {
        super(auth, apiBaseUrl);
    }
    async getAll(metadatas: Metadatas): Promise<any> {
        return this.get(this.endpoint, metadatas, {});
    }

    async getById(id: number): Promise<any> {
        return this.apiRequest(`${this.endpointSingleton}/${id}`, 'GET', null);
    }

    async create(datas: any): Promise<any> {
        return this.post(this.endpoint, {datas});
    }

    async update(id: number, data: any): Promise<any> {
        return this.put(`${this.endpointSingleton}/${id}`, data);
    }

    async remove(id: number): Promise<any> {
        return this.delete(`${this.endpointSingleton}/${id}`);
    }
}