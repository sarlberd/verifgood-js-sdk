import { ApiRequest } from "../core/ApiRequest";
export declare class Categories extends ApiRequest {
    endpoint: string;
    endpointSingleton: string;
    associateComposant(categorie_id: number, composant: any): Promise<any>;
    desassociateComposant(composant_categorie_id: number): Promise<any>;
}
